import React, { useState, useEffect } from "react";
import "../../styles/dashboard/homeSectionManager.css";

const API_URL = import.meta.env.VITE_API_URL; // e.g., http://localhost:5000/api
const token = localStorage.getItem("token");

const resourceConfig = {
  hero: {
    label: "Hero",
    endpoint: "homepage/hero",
    fields: ["title", "description", "bgShape", "bgAbstract", "heroImage", "partners"],
    placeholders: {
      title: "Hero Title",
      description: "Hero Description",
      bgShape: "BG Shape URL",
      bgAbstract: "BG Abstract URL",
      heroImage: "Hero Image URL",
      partners: "Partner Logos (Add each separately)"
    }
  },
  features: {
    label: "Features",
    endpoint: "homepage/features",
    fields: ["heading", "description", "vectorIcon", "image", "star", "ergonomic", "award", "bgImage", "testimonialName", "testimonialQuote"],
    placeholders: {
      heading: "Heading",
      description: "Description",
      vectorIcon: "Vector Icon URL",
      image: "Image URL",
      star: "Star Image URL",
      ergonomic: "Ergonomic Text",
      award: "Award Text",
      bgImage: "Background Image URL",
      testimonialName: "Testimonial Name",
      testimonialQuote: "Testimonial Quote"
    }
  },
  services: {
    label: "Services",
    endpoint: "homepage/services",
    fields: ["id", "title", "description", "image"],
    placeholders: {
      id: "Service ID",
      title: "Service Title",
      description: "Description",
      image: "Image URL"
    }
  },
  tools: {
    label: "Tools",
    endpoint: "homepage/tools",
    fields: ["src"],
    placeholders: { src: "Tool Image URL" }
  },
  industries: {
    label: "Industries",
    endpoint: "homepage/industries",
    fields: ["type"],
    placeholders: { type: "Column Type (e.g., left-col, middle-col, right-col)" }
  },
  additionalIndustryImages: {
    label: "Additional Industry Images",
    endpoint: "homepage/additional-industry-images",
    fields: ["src", "belowText"],
    placeholders: { src: "Image URL", belowText: "Below Text" }
  },
  cta: {
    label: "CTA",
    endpoint: "homepage/ctas",
    fields: ["bg", "label", "title", "buttonLabel", "mask"],
    placeholders: {
      bg: "CTA Background URL",
      label: "CTA Label",
      title: "CTA Title",
      buttonLabel: "CTA Button Label",
      mask: "CTA Mask URL"
    }
  }
};

function HomeSectionManager() {
  const [section, setSection] = useState("hero");
  const [dbEntries, setDbEntries] = useState([]);
  const [formData, setFormData] = useState({});
  const [partners, setPartners] = useState([""]);

  const config = resourceConfig[section];
  const isPartners = section === "hero";

  // Fetch data on section change
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${API_URL}/${config.endpoint}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Failed to fetch data");
        const result = await res.json();
        setDbEntries(result);
      } catch (err) {
        setDbEntries([]);
      } finally {
        setFormData({});
        setPartners([""]);
      }
    })();
  }, [section]);

  // Shared input change handler
  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Partners control for hero
  const handlePartnerChange = (i, value) => {
    setPartners(prev => prev.map((p, idx) => (idx === i ? value : p)));
  };
  const addPartner = () => setPartners(prev => [...prev, ""]);
  const removePartner = i => setPartners(prev => prev.filter((_, idx) => idx !== i));

  // Add entry
  const handleAdd = async () => {
    let payload = { ...formData };
    if (isPartners) payload.partners = partners.filter(p => p.trim());
    if (section === "features") {
      payload.testimonial = {
        name: payload.testimonialName,
        quote: payload.testimonialQuote
      };
      delete payload.testimonialName;
      delete payload.testimonialQuote;
    }
    // For industries, initialize images if needed
    if (section === "industries" && !payload.images) {
      payload.images = [];
    }
    try {
      const res = await fetch(`${API_URL}/${config.endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to add entry");
      const updated = await res.json();
      setDbEntries(prev => [...prev, updated]);
      setFormData({});
      setPartners([""]);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Delete entry
  const handleDelete = async id => {
    try {
      const res = await fetch(`${API_URL}/${config.endpoint}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to delete entry");
      setDbEntries(prev => prev.filter(e => e._id !== id));
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Edit entry
  const handleEdit = idx => {
    const entry = dbEntries[idx];
    const entryCopy = { ...entry };
    if (isPartners) setPartners(entryCopy.partners || [""]);
    if (section === "features" && entryCopy.testimonial) {
      entryCopy.testimonialName = entryCopy.testimonial.name;
      entryCopy.testimonialQuote = entryCopy.testimonial.quote;
    }
    setFormData(entryCopy);
  };

  // Update entry (save)
  const handleSaveUpdate = async () => {
    let payload = { ...formData };
    if (isPartners) payload.partners = partners.filter(p => p.trim());
    if (section === "features") {
      payload.testimonial = {
        name: payload.testimonialName,
        quote: payload.testimonialQuote
      };
      delete payload.testimonialName;
      delete payload.testimonialQuote;
    }
    try {
      const res = await fetch(`${API_URL}/${config.endpoint}/${payload._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Failed to update entry");
      await fetch(`${API_URL}/${config.endpoint}`, {
        headers: { Authorization: `Bearer ${token}` }
      }).then(r => r.json()).then(setDbEntries);
      setFormData({});
      setPartners([""]);
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Industries Section with nested images
  if (section === "industries") {
    const handleNestedImageChange = (idx, field, val) => {
      const newImages = [...(formData.images || [])];
      newImages[idx] = { ...newImages[idx], [field]: val };
      handleInputChange("images", newImages);
    };

    const addNestedImage = () => {
      const newImages = [...(formData.images || []), { src: "", overlay: "", cardTitle: "", bg: "" }];
      handleInputChange("images", newImages);
    };

    const removeNestedImage = (idx) => {
      const newImages = (formData.images || []).filter((_, i) => i !== idx);
      handleInputChange("images", newImages);
    };

    return (
      <div className="dashboard-section home-manager">
        <h2>Manage Homepage Sections</h2>
        {/* Persisted Tabs */}
        <div className="tabs">
          {Object.keys(resourceConfig).map((key) => (
            <button
              key={key}
              className={section === key ? "active" : ""}
              onClick={() => {
                setSection(key);
                setFormData({});
                setPartners([""]);
              }}
            >
              {resourceConfig[key].label}
            </button>
          ))}
        </div>

        {/* Industry Form */}
        <div className="industry-section">
          <h3>Industry Columns</h3>
          <input
            type="text"
            placeholder="Column Type (e.g., left-col, middle-col, right-col)"
            value={formData.type || ""}
            onChange={(e) => handleInputChange("type", e.target.value)}
            style={{ width: "60%", marginBottom: "8px" }}
          />

          <h4>Images for this Column</h4>
          {(formData.images || []).map((image, idx) => (
            <div key={idx} style={{ border: "1px solid #ddd", borderRadius: "6px", padding: "10px", marginBottom: "10px", background: "#f9f9f9" }}>
              <input placeholder="Image URL" value={image.src || ""} onChange={(e) => handleNestedImageChange(idx, "src", e.target.value)} style={{ width: "100%", marginBottom: "6px" }} />
              <input placeholder="Overlay" value={image.overlay || ""} onChange={(e) => handleNestedImageChange(idx, "overlay", e.target.value)} style={{ width: "100%", marginBottom: "6px" }} />
              <input placeholder="Card Title" value={image.cardTitle || ""} onChange={(e) => handleNestedImageChange(idx, "cardTitle", e.target.value)} style={{ width: "100%", marginBottom: "6px" }} />
              <input placeholder="Background" value={image.bg || ""} onChange={(e) => handleNestedImageChange(idx, "bg", e.target.value)} style={{ width: "100%", marginBottom: "6px" }} />
              <button onClick={() => removeNestedImage(idx)} style={{ background: "#e63946", color: "white", border: "none", padding: "6px 12px", borderRadius: "4px" }}>Remove Image</button>
            </div>
          ))}

          <button onClick={addNestedImage} style={{ marginBottom: "10px", padding: "8px 12px" }}>+ Add Image</button>

          <button onClick={formData._id ? handleSaveUpdate : handleAdd} style={{ marginRight: "8px" }}>
            {formData._id ? "Save Changes" : "Add Industry Column"}
          </button>
          {formData._id && (<button onClick={() => setFormData({})} style={{ padding: "8px 12px" }}>Cancel Edit</button>)}

          {/* List industries below */}
          <h3 style={{ marginTop: "2rem" }}>Existing Industry Columns</h3>
          {dbEntries.length === 0 ? <p>No industries found.</p> : (
            dbEntries.map((industry, idx) => (
              <div key={industry._id || idx} style={{ border: "1px solid #ccc", borderRadius: "6px", marginBottom: "1rem", padding: "10px" }}>
                <h4>Type: {industry.type}</h4>
                <ul>
                  {(industry.images || []).map((img, i) => (
                    <li key={i}>
                      <strong>{img.cardTitle || "Untitled"}</strong><br />
                      Src: {img.src}<br />
                      Overlay: {img.overlay}<br />
                      Background: {img.bg}
                    </li>
                  ))}
                </ul>
                <button onClick={() => handleEdit(idx)} style={{ marginRight: "8px" }}>Edit</button>
                <button onClick={() => handleDelete(industry._id)}>Delete</button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // Default rendering for all other sections - keep tabs visible always
  return (
    <div className="dashboard-section home-manager">
      <h2>Manage Homepage Sections</h2>
      <div className="tabs">
        {Object.keys(resourceConfig).map((key) => (
          <button
            key={key}
            className={section === key ? "active" : ""}
            onClick={() => {
              setSection(key);
              setFormData({});
              setPartners([""]);
            }}
          >
            {resourceConfig[key].label}
          </button>
        ))}
      </div>

      {/* Inputs for adding/editing */}
      <div className="add-form" style={{ marginBottom: "2rem" }}>
        {config.fields.map((field) => {
          if (isPartners && field === "partners") {
            return (
              <div key={field}>
                <label>Partner Logos:</label>
                {partners.map((p, idx) => (
                  <div key={idx} style={{ display: "flex", gap: "6px", marginBottom: "4px" }}>
                    <input
                      type="text"
                      value={p}
                      onChange={(e) => handlePartnerChange(idx, e.target.value)}
                      placeholder={config.placeholders.partners}
                      style={{ width: "68%" }}
                    />
                    {partners.length > 1 && (
                      <button type="button" onClick={() => removePartner(idx)}>
                        Delete
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addPartner} style={{ marginTop: "4px" }}>
                  Add Partner
                </button>
              </div>
            );
          }
          return (
            <input
              key={field}
              type="text"
              value={formData[field] || ""}
              onChange={(e) => handleInputChange(field, e.target.value)}
              placeholder={config.placeholders[field]}
              style={{ width: "80%", marginBottom: "8px" }}
            />
          );
        })}
        <button onClick={formData._id ? handleSaveUpdate : handleAdd} style={{ marginRight: "8px" }}>
          {formData._id ? "Save Changes" : `Add ${config.label}`}
        </button>
        {formData._id && (
          <button onClick={() => { setFormData({}); setPartners([""]); }}>
            Cancel
          </button>
        )}
      </div>

      {/* Show DB entries */}
      <div>
        {dbEntries.length === 0 ? (
          <p>No entries available.</p>
        ) : (
          dbEntries.map((entry, idx) => (
            <div key={entry._id || idx} className="db-card" style={{
              border: "1px solid #ddd",
              borderRadius: "7px",
              marginBottom: "20px",
              padding: "12px"
            }}>
              {config.fields.map(f => {
                if (isPartners && f === "partners") {
                  return (
                    <div key={f}>
                      <strong>Partners:</strong>
                      <ul>
                        {(entry.partners || []).map((p, i) => <li key={i}>{p}</li>)}
                      </ul>
                    </div>
                  );
                }
                if (section === "features" && (f === "testimonialName" || f === "testimonialQuote")) {
                  return null;
                }
                return entry[f]
                  ? (
                    <p key={f}>
                      <strong>{config.placeholders[f]}:</strong> {entry[f]}
                    </p>
                  )
                  : null;
              })}
              {section === "features" && entry.testimonial?.name && (
                <p>
                  <strong>Testimonial Name:</strong> {entry.testimonial.name}
                  <br />
                  <strong>Testimonial Quote:</strong> {entry.testimonial.quote}
                </p>
              )}
              <button onClick={() => handleEdit(idx)} style={{ marginRight: "8px" }}>Edit</button>
              <button onClick={() => handleDelete(entry._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default HomeSectionManager;
