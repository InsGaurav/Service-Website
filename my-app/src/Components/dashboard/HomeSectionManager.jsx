import React, { useState, useEffect } from "react";
import "../../styles/dashboard/homeSectionManager.css";

const API_URL = import.meta.env.VITE_API_URL;

const defaultData = {
  hero: {
    title: "",
    description: "",
    bgShape: "",
    bgAbstract: "",
    heroImage: "",
    partners: []
  },
  features: {
    heading: "",
    description: "",
    vectorIcon: "",
    image: "",
    star: "",
    ergonomic: "",
    award: "",
    bgImage: "",
    testimonial: { name: "", quote: "" }
  },
  services: [],
  tools: [],
  industries: [],
  additionalIndustryImages: [],
  cta: {
    bg: "",
    label: "",
    title: "",
    buttonLabel: "",
    mask: ""
  }
};

const HomeManager = () => {
  const [home, setHome] = useState(defaultData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHome = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${API_URL}/home`);
        if (!res.ok) throw new Error("Failed to fetch home page data");
        const data = await res.json();
        setHome({ ...defaultData, ...data });
      } catch (err) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHome();
  }, []);

  // Update helper for nested objects
  const update = (section, key, value) => {
    setHome((prev) => ({
      ...prev,
      [section]: { ...prev[section], [key]: value }
    }));
  };

  // Array items update
  const handleArrayChange = (section, idx, field, value) => {
    setHome((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === idx ? { ...item, [field]: value } : item
      )
    }));
  };

  // Add array item
  const addToArray = (section, obj) => {
    setHome((prev) => ({
      ...prev,
      [section]: [...prev[section], obj]
    }));
  };

  // Remove array item
  const removeFromArray = (section, idx) => {
    setHome((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== idx)
    }));
  };

  // Save all data
  const handleSave = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/home`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(home)
      });
      if (!res.ok) throw new Error("Failed to update home page content");
      alert("Home content updated!");
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="dashboard-section home-manager">
      {/* Hero Section */}
      <div className="home-block">
        <h2>Hero Section</h2>
        <input
          value={home.hero.title}
          onChange={(e) => update("hero", "title", e.target.value)}
          placeholder="Hero Title"
        />
        <textarea
          value={home.hero.description}
          onChange={(e) => update("hero", "description", e.target.value)}
          placeholder="Hero Description"
        />
        <input
          value={home.hero.bgShape}
          onChange={(e) => update("hero", "bgShape", e.target.value)}
          placeholder="BG Shape Image URL"
        />
        <input
          value={home.hero.bgAbstract}
          onChange={(e) => update("hero", "bgAbstract", e.target.value)}
          placeholder="BG Abstract Image URL"
        />
        <input
          value={home.hero.heroImage}
          onChange={(e) => update("hero", "heroImage", e.target.value)}
          placeholder="Hero Main Image URL"
        />
        <h4>Partner Logos</h4>
        {home.hero.partners.map((p, i) => (
          <div className="feature-row" key={i}>
            <input
              value={p}
              onChange={(e) =>
                setHome((prev) => ({
                  ...prev,
                  hero: {
                    ...prev.hero,
                    partners: prev.hero.partners.map((img, idx) =>
                      idx === i ? e.target.value : img
                    )
                  }
                }))
              }
              placeholder="Logo Image URL"
            />
            <button
              onClick={() =>
                setHome((prev) => ({
                  ...prev,
                  hero: {
                    ...prev.hero,
                    partners: prev.hero.partners.filter((_, idx) => idx !== i)
                  }
                }))
              }
            >
              Delete
            </button>
          </div>
        ))}
        <button
          className="add-btn"
          onClick={() =>
            setHome((prev) => ({
              ...prev,
              hero: { ...prev.hero, partners: [...prev.hero.partners, ""] }
            }))
          }
        >
          Add Partner Logo
        </button>
      </div>

      {/* Features Section */}
      <div className="home-block">
        <h2>Features Section</h2>
        <input
          value={home.features.heading}
          onChange={(e) => update("features", "heading", e.target.value)}
          placeholder="Heading"
        />
        <textarea
          value={home.features.description}
          onChange={(e) => update("features", "description", e.target.value)}
          placeholder="Description"
        />
        <input
          value={home.features.vectorIcon}
          onChange={(e) => update("features", "vectorIcon", e.target.value)}
          placeholder="Vector Icon URL"
        />
        <input
          value={home.features.image}
          onChange={(e) => update("features", "image", e.target.value)}
          placeholder="Main Feature Image URL"
        />
        <input
          value={home.features.star}
          onChange={(e) => update("features", "star", e.target.value)}
          placeholder="Star Image URL"
        />
        <input
          value={home.features.ergonomic}
          onChange={(e) => update("features", "ergonomic", e.target.value)}
          placeholder="Ergonomic Text"
        />
        <input
          value={home.features.award}
          onChange={(e) => update("features", "award", e.target.value)}
          placeholder="Award Text"
        />
        <input
          value={home.features.bgImage}
          onChange={(e) => update("features", "bgImage", e.target.value)}
          placeholder="Testimonial BG Image URL"
        />
        <h4>Testimonial</h4>
        <input
          value={home.features.testimonial.name}
          onChange={(e) =>
            setHome((prev) => ({
              ...prev,
              features: {
                ...prev.features,
                testimonial: {
                  ...prev.features.testimonial,
                  name: e.target.value
                }
              }
            }))
          }
          placeholder="Testimonial Name"
        />
        <textarea
          value={home.features.testimonial.quote}
          onChange={(e) =>
            setHome((prev) => ({
              ...prev,
              features: {
                ...prev.features,
                testimonial: {
                  ...prev.features.testimonial,
                  quote: e.target.value
                }
              }
            }))
          }
          placeholder="Testimonial Quote"
        />
      </div>

      {/* Services Section */}
      <div className="home-block">
        <h2>Services Section</h2>
        {home.services.map((serv, i) => (
          <div key={i} className="feature-row">
            <input
              value={serv.id || ""}
              onChange={(e) =>
                handleArrayChange("services", i, "id", e.target.value)
              }
              placeholder="Service ID"
            />
            <input
              value={serv.title || ""}
              onChange={(e) =>
                handleArrayChange("services", i, "title", e.target.value)
              }
              placeholder="Service Title"
            />
            <textarea
              value={serv.description || ""}
              onChange={(e) =>
                handleArrayChange("services", i, "description", e.target.value)
              }
              placeholder="Service Description"
            />
            <input
              value={serv.image || ""}
              onChange={(e) =>
                handleArrayChange("services", i, "image", e.target.value)
              }
              placeholder="Service Image URL"
            />
            <button onClick={() => removeFromArray("services", i)}>
              Delete
            </button>
          </div>
        ))}
        <button
          className="add-btn"
          onClick={() =>
            addToArray("services", {
              id: "",
              title: "",
              description: "",
              image: ""
            })
          }
        >
          Add Service
        </button>
      </div>

      {/* Tools */}
      <div className="home-block">
        <h2>Tools Section</h2>
        {home.tools.map((t, idx) => (
          <div key={idx} className="feature-row">
            <input
              value={t}
              onChange={(e) =>
                setHome((prev) => ({
                  ...prev,
                  tools: prev.tools.map((img, i) =>
                    i === idx ? e.target.value : img
                  )
                }))
              }
              placeholder="Tool Image URL"
            />
            <button
              onClick={() =>
                setHome((prev) => ({
                  ...prev,
                  tools: prev.tools.filter((_, i) => i !== idx)
                }))
              }
            >
              Delete
            </button>
          </div>
        ))}
        <button
          className="add-btn"
          onClick={() =>
            setHome((prev) => ({ ...prev, tools: [...prev.tools, ""] }))
          }
        >
          Add Tool
        </button>
      </div>

      {/* Industries */}
      <div className="home-block">
        <h2>Industries Section</h2>
        {home.industries.map((ind, i) => (
          <div key={i} className="feature-row">
            <input
              value={ind.name || ""}
              onChange={(e) =>
                handleArrayChange("industries", i, "name", e.target.value)
              }
              placeholder="Industry Name"
            />
            <button onClick={() => removeFromArray("industries", i)}>
              Delete
            </button>
          </div>
        ))}
        <button
          className="add-btn"
          onClick={() => addToArray("industries", { name: "" })}
        >
          Add Industry
        </button>
      </div>

      {/* Additional Industry Images */}
      <div className="home-block">
        <h2>Additional Industry Images</h2>
        {home.additionalIndustryImages.map((img, i) => (
          <div key={i} className="feature-row">
            <input
              value={img.src || ""}
              onChange={(e) =>
                setHome((prev) => ({
                  ...prev,
                  additionalIndustryImages: prev.additionalIndustryImages.map(
                    (obj, idx) =>
                      idx === i ? { ...obj, src: e.target.value } : obj
                  )
                }))
              }
              placeholder="Image URL"
            />
            <input
              value={img.belowText || ""}
              onChange={(e) =>
                setHome((prev) => ({
                  ...prev,
                  additionalIndustryImages: prev.additionalIndustryImages.map(
                    (obj, idx) =>
                      idx === i ? { ...obj, belowText: e.target.value } : obj
                  )
                }))
              }
              placeholder="Below Text (optional)"
            />
            <button
              onClick={() =>
                setHome((prev) => ({
                  ...prev,
                  additionalIndustryImages:
                    prev.additionalIndustryImages.filter((_, idx) => idx !== i)
                }))
              }
            >
              Delete
            </button>
          </div>
        ))}
        <button
          className="add-btn"
          onClick={() =>
            setHome((prev) => ({
              ...prev,
              additionalIndustryImages: [
                ...prev.additionalIndustryImages,
                { src: "", belowText: "" }
              ]
            }))
          }
        >
          Add More Image
        </button>
      </div>

      {/* CTA Section */}
      <div className="home-block">
        <h2>Call To Action (CTA) Section</h2>
        <input
          value={home.cta.bg}
          onChange={(e) => update("cta", "bg", e.target.value)}
          placeholder="CTA BG Image URL"
        />
        <input
          value={home.cta.label}
          onChange={(e) => update("cta", "label", e.target.value)}
          placeholder="CTA Label"
        />
        <input
          value={home.cta.title}
          onChange={(e) => update("cta", "title", e.target.value)}
          placeholder="CTA Title"
        />
        <input
          value={home.cta.buttonLabel}
          onChange={(e) => update("cta", "buttonLabel", e.target.value)}
          placeholder="CTA Button Label"
        />
        <input
          value={home.cta.mask}
          onChange={(e) => update("cta", "mask", e.target.value)}
          placeholder="CTA Mask Image URL"
        />
      </div>

      <button className="save-btn" onClick={handleSave}>
        Save All Sections
      </button>
    </div>
  );
};

export default HomeManager;
