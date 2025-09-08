import React, { useState, useEffect } from "react";
import "../../styles/dashboard/TeamManager.css";

const API_URL = import.meta.env.VITE_API_URL;

const TeamManager = () => {
  const [members, setMembers] = useState([]);
  const [newName, setNewName] = useState("");
  const [newRole, setNewRole] = useState("");
  const [newImage, setNewImage] = useState("");
  const [editIndex, setEditIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  // Fetch team members from backend API on mount
  useEffect(() => {
    const fetchTeam = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/team`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch team");
        const data = await res.json();
        setMembers(data);
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTeam();
  }, [token]);

  // Reset form fields
  const resetForm = () => {
    setNewName("");
    setNewRole("");
    setNewImage("");
    setEditIndex(null);
  };

  // Add member (API & state)
  const handleAdd = async () => {
    if (!newName || !newRole || !newImage) {
      alert("Please fill all fields!");
      return;
    }
    try {
      const res = await fetch(`${API_URL}/team`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: newName, role: newRole, photo: newImage })
      });
      if (!res.ok) throw new Error("Failed to add member");
      const newMember = await res.json();
      setMembers([...members, newMember]);
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete member (API & state)
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      const res = await fetch(`${API_URL}/team/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete member");
      setMembers(members.filter((member) => member._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  // Edit member (prefill form)
  const handleEdit = (index) => {
    const member = members[index];
    setEditIndex(index);
    setNewName(member.name);
    setNewRole(member.role);
    setNewImage(member.photo || member.image);
  };

  // Save edited member (API & state)
  const handleSave = async () => {
    if (!newName || !newRole || !newImage) {
      alert("Please fill all fields!");
      return;
    }
    try {
      const memberToEdit = members[editIndex];
      const res = await fetch(`${API_URL}/team/${memberToEdit._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ name: newName, role: newRole, photo: newImage })
      });
      if (!res.ok) throw new Error("Failed to update member");
      const updated = await res.json();
      setMembers(members.map((m, i) => (i === editIndex ? updated : m)));
      resetForm();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="dashboard-section">
      <h2 className="section-title">Manage Team Members</h2>
      <div className="team-form">
        <input
          type="text"
          placeholder="Member name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Member role"
          value={newRole}
          onChange={(e) => setNewRole(e.target.value)}
        />
        <input
          type="text"
          placeholder="Image path / URL"
          value={newImage}
          onChange={(e) => setNewImage(e.target.value)}
        />
        {editIndex !== null ? (
          <button className="btn btn-edit" onClick={handleSave}>
            Save Changes
          </button>
        ) : (
          <button className="btn btn-add" onClick={handleAdd}>
            Add Member
          </button>
        )}
      </div>
      {loading ? (
        <p>Loading team members...</p>
      ) : (
        <div className="team-grid">
          {members.length === 0 ? (
            <p>No team members added yet.</p>
          ) : (
            members.map((member, index) => (
              <div key={member._id || index} className="team-card">
                <img
                  src={member.photo || member.image}
                  alt={member.name}
                  className="team-image"
                />
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <div className="team-actions">
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-delete"
                    onClick={() => handleDelete(member._id)}
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

export default TeamManager;
