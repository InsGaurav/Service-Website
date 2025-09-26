import React, { useState, useEffect } from "react";
import "../../styles/dashboard/ServicesManager.css";

const API_URL = import.meta.env.VITE_API_URL;

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconChar, setIconChar] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch services from backend API on mount
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/services`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch services");
        const data = await res.json();
        setServices(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, [token]);

  // Reset form fields
  const resetForm = () => {
    setName("");
    setDescription("");
    setIconChar("");
    setEditIndex(null);
  };

  // Add service (API & state)
  const handleAdd = async () => {
    if (!name.trim() || !description.trim() || !iconChar.trim()) {
      alert("Please fill all fields!");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/services`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, description, icon: iconChar })
      });
      if (!res.ok) throw new Error("Failed to add service");
      const newService = await res.json();
      console.log("Added service:", newService);
      setServices([...services, newService]);
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete service (API & state)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?"))
      return;
    try {
      const res = await fetch(`${API_URL}/services/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete service");
      console.log(`Deleted service id: ${id}`);
      setServices(services.filter((srv) => srv._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Edit service (prefill form)
  const handleEdit = (index) => {
    const service = services[index];
    setEditIndex(index);
    setName(service.name);
    setDescription(service.description);
    setIconChar(service.icon || "");
  };

  // Save edited service (API & state)
  const handleSave = async () => {
    if (!name.trim() || !description.trim() || !iconChar.trim()) {
      alert("Please fill all fields!");
      return;
    }
    try {
      const srvToEdit = services[editIndex];
      const res = await fetch(`${API_URL}/services/${srvToEdit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name, description, icon: iconChar })
      });
      if (!res.ok) throw new Error("Failed to update service");
      const updatedService = await res.json();
      console.log("Updated service:", updatedService);
      setServices(
        services.map((srv, i) => (i === editIndex ? updatedService : srv))
      );
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="dashboard-section">
      <h2 className="section-title">Manage Services</h2>

      <div className="service-form">
        <input
          type="text"
          placeholder="Service Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Icon (emoji or text)"
          value={iconChar}
          onChange={(e) => setIconChar(e.target.value)}
        />
        {editIndex !== null ? (
          <button className="btn btn-edit" onClick={handleSave}>
            Save Changes
          </button>
        ) : (
          <button className="btn btn-add" onClick={handleAdd}>
            Add Service
          </button>
        )}
        <button className="btn btn-reset" onClick={resetForm}>
          Reset
        </button>
      </div>

      {loading ? (
        <p>Loading services...</p>
      ) : (
        <div className="service-list">
          {services.length === 0 ? (
            <p>No services added yet.</p>
          ) : (
            services.map((srv, index) => (
              <div key={srv._id || index} className="service-card">
                {srv.icon && <span className="service-icon">{srv.icon}</span>}
                <h3>{srv.name}</h3>
                <p>{srv.description}</p>
                <div className="service-actions">
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(srv._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default ServicesManager;
