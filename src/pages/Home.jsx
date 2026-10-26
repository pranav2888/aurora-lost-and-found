import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ItemCard from "../components/ItemCard";
import { useUser } from "../context/UserContext";
import "./Home.css";

function Home() {
  const navigate = useNavigate();
  const items = useSelector((state) => state.items.items);
  const { user } = useUser();
  const [heroSearch, setHeroSearch] = useState("");

  const featuredItems = items.slice(0, 4);
  const categories = [
    { name: "Electronics", icon: "💻" },
    { name: "Bags", icon: "🎒" },
    { name: "Stationery", icon: "📐" },
    { name: "ID Cards", icon: "🪪" },
    { name: "Accessories", icon: "⌚" },
    { name: "Books", icon: "📚" },
    { name: "Personal Items", icon: "🔑" }
  ];

  function handleHeroSearch(e) {
    e.preventDefault();
    if (heroSearch.trim()) {
      navigate(`/browse?search=${encodeURIComponent(heroSearch.trim())}`);
    } else {
      navigate("/browse");
    }
  }

  return (
    <div>
      <section className="hero">
        <div className="container hero-inner">
          <h1>Lost something on campus?</h1>
          <p>
            Aurora helps campus students and staff reconnect lost belongings with
            their rightful owners — securely, quickly, and transparently.
          </p>

          <form className="hero-search-box" onSubmit={handleHeroSearch}>
            <input
              type="text"
              placeholder="Search by item name (e.g., Casio, Wallet, Earbuds)..."
              value={heroSearch}
              onChange={(e) => setHeroSearch(e.target.value)}
            />
            <button type="submit" className="btn btn-primary hero-search-btn">
              Search Items
            </button>
          </form>

          <div className="hero-buttons">
            <Link to="/browse" className="btn btn-primary">
              Browse All Items ({items.length})
            </Link>
            <Link to={user ? "/report" : "/login"} className="btn btn-outline">
              Report Found Item
            </Link>
          </div>
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <h2 className="section-title">Browse by Category</h2>
          <p className="section-subtitle">Jump straight to items in your category</p>
          <div className="category-grid">
            {categories.map((cat) => (
              <Link
                to={`/browse?category=${encodeURIComponent(cat.name)}`}
                key={cat.name}
                className="category-chip"
              >
                <span className="category-icon">{cat.icon}</span>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mint-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <h2 className="section-title">Recently Found Items</h2>
              <p className="section-subtitle">Latest items registered on campus</p>
            </div>
            <Link to="/browse" className="section-link-more">
              View All Items →
            </Link>
          </div>
          <div className="items-grid">
            {featuredItems.map((item) => (
              <ItemCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="how-it-works-section">
        <div className="container">
          <h2 className="section-title">How Aurora Works</h2>
          <p className="section-subtitle">Three simple steps to recover what's yours</p>
          <div className="steps-grid">
            <div className="step-box">
              <div className="step-num">1</div>
              <h3>Browse & Search</h3>
              <p>
                Filter through catalogued items found in libraries, classrooms,
                canteens, and labs.
              </p>
            </div>
            <div className="step-box">
              <div className="step-num">2</div>
              <h3>Claim with Proof</h3>
              <p>
                Provide unique private details (scratch, internal contents, sticker)
                that only the real owner knows.
              </p>
            </div>
            <div className="step-box">
              <div className="step-num">3</div>
              <h3>Verify & Collect</h3>
              <p>
                Security verifies details and approves the handoff at the Admin Block
                Help Desk.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;