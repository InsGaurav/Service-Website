import React, { useState, useEffect } from "react";
import "../../styles/dashboard/ServicesManager.css";

const API_URL = import.meta.env.VITE_API_URL; // e.g. http://localhost:5000/api
const token = localStorage.getItem("token");

const ServicesManager = () => {
  const [activeTab, setActiveTab] = useState("serviceCards"); // stats, serviceCards, projects, stack
  const [loading, setLoading] = useState(false);

  // State containers for each resource
  const [stats, setStats] = useState([]);
  const [serviceCards, setServiceCards] = useState([]);
  const [projects, setProjects] = useState([]);
  const [stack, setStack] = useState([]);

  // Form state
  const [formData, setFormData] = useState({});
  const [editIndex, setEditIndex] = useState(null);

  // Map tabs to API endpoints and schemas
  const resourceConfig = {
    stats: {
      state: stats,
      setState: setStats,
      endpoint: "services/stats",
      fields: ["value", "label"],
      placeholders: { value: "Value", label: "Label" }
    },
    serviceCards: {
      state: serviceCards,
      setState: setServiceCards,
      endpoint: "services/services",
      fields: ["iconChar", "title", "text"],
      placeholders: { iconChar: "Icon (emoji or text)", title: "Title", text: "Description" }
    },
    projects: {
      state: projects,
      setState: setProjects,
      endpoint: "services/projects",
      fields: ["title", "category", "img", "desc"],
      placeholders: { title: "Title", category: "Category", img: "Image URL", desc: "Description" }
    },
    stack: {
      state: stack,
      setState: setStack,
      endpoint: "services/stack",
      fields: ["name", "emoji"],
      placeholders: { name: "Name", emoji: "Emoji" }
    }
  };

  // Fetch resource data
  const fetchData = async (resKey) => {
    const config = resourceConfig[resKey];
    if (!config) return;
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/${config.endpoint}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(`Failed to fetch ${resKey}`);
      const data = await res.json();
      config.setState(data);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  // On component mount or active tab change, fetch relevant data
  useEffect(() => {
    fetchData(activeTab);
    setFormData({});
    setEditIndex(null);
  }, [activeTab]);

  // Handle input field changes dynamically
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Reset form
  const resetForm = () => {
    setFormData({});
    setEditIndex(null);
  };

  // Add new item
  const handleAdd = async () => {
    const config = resourceConfig[activeTab];
    if (!config) return;
    // Validation: all fields required
    for (const field of config.fields) {
      if (!formData[field] || !formData[field].toString().trim()) {
        alert(`Please fill the ${field} field.`);
        return;
      }
    }
    try {
      const res = await fetch(`${API_URL}/${config.endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error(`Failed to add ${activeTab}`);
      const newItem = await res.json();
      config.setState([...config.state, newItem]);
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete item
  const handleDelete = async (id) => {
    const config = resourceConfig[activeTab];
    if (!config) return;
    if (!window.confirm(`Are you sure you want to delete this ${activeTab.slice(0, -1)}?`))
      return;
    try {
      const res = await fetch(`${API_URL}/${config.endpoint}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error(`Failed to delete ${activeTab}`);
      config.setState(config.state.filter(item => item._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Prefill form for edit
  const handleEdit = (index) => {
    const config = resourceConfig[activeTab];
    if (!config) return;
    const item = config.state[index];
    setFormData(item);
    setEditIndex(index);
  };

  // Save updates
  const handleSave = async () => {
    const config = resourceConfig[activeTab];
    if (!config) return;
    if (editIndex === null) return;
    // Validate all fields
    for (const field of config.fields) {
      if (!formData[field] || !formData[field].toString().trim()) {
        alert(`Please fill the ${field} field.`);
        return;
      }
    }
    try {
      const itemToEdit = config.state[editIndex];
      const res = await fetch(`${API_URL}/${config.endpoint}/${itemToEdit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      if (!res.ok) throw new Error(`Failed to update ${activeTab}`);
      const updated = await res.json();
      config.setState(config.state.map((item, i) => (i === editIndex ? updated : item)));
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  // Render input fields for active tab
  const renderFormFields = () => {
    const config = resourceConfig[activeTab];
    if (!config) return null;
    return config.fields.map((field) => (
      <input
        key={field}
        type="text"
        placeholder={config.placeholders[field]}
        value={formData[field] || ""}
        onChange={(e) => handleInputChange(field, e.target.value)}
      />
    ));
  };

  // Render list for active tab
  const renderList = () => {
    const config = resourceConfig[activeTab];
    if (!config || !config.state.length) return <p>No {activeTab} added yet.</p>;

    return config.state.map((item, index) => (
      <div key={item._id || index} className={`${activeTab}-card`}>
        {activeTab === "serviceCards" && item.iconChar && (
          <span className="service-icon">{item.iconChar}</span>
        )}
        {activeTab === "stack" && item.emoji && (
          <span className="stack-icon">{item.emoji}</span>
        )}
        {Object.keys(item).map((key) =>
          key !== "_id" && !key.startsWith("__") ? (
            <p key={key}>
              <strong>{key}: </strong>
              {item[key]}
            </p>
          ) : null
        )}
        <div className={`${activeTab}-actions`}>
          <button className="btn btn-edit" onClick={() => handleEdit(index)}>
            Edit
          </button>
          <button
            className="btn btn-delete"
            onClick={() => handleDelete(item._id)}
          >
            Delete
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="dashboard-section">
      <h2 className="section-title">Manage Services</h2>
      <div className="tabs">
        {Object.keys(resourceConfig).map((tabKey) => (
          <button
            key={tabKey}
            className={activeTab === tabKey ? "active" : ""}
            onClick={() => {
              setActiveTab(tabKey);
              resetForm();
            }}
          >
            {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
          </button>
        ))}
      </div>
      <div className="service-form">
        {renderFormFields()}
        {editIndex !== null ? (
          <button className="btn btn-edit" onClick={handleSave}>
            Save Changes
          </button>
        ) : (
          <button className="btn btn-add" onClick={handleAdd}>
            Add
          </button>
        )}
        <button className="btn btn-reset" onClick={resetForm}>
          Reset
        </button>
      </div>

      {loading ? <p>Loading {activeTab}...</p> : renderList()}
    </div>
  );
};

export default ServicesManager;
