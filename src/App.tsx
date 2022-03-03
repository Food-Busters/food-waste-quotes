import "./App.scss";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Home from "./views/Home";
import Admin from "./views/Admin";

import { Version, BuildTime } from "./config";

export default function App() {
  return (
    <Router>
      <div className="App">
        <div className="navbar bg-primary px-4">
          <div className="brand">
            <Link to="/" className="navbar-brand fs-2">
              Food Waste Quotes
            </Link>
            <span className="text-white fs-5" title={`Built at ${BuildTime}`}>
              {Version}
            </span>
            <span className="preview fs-5">PREVIEW</span>
            <a
              className="gh text-white fs-4 text-decoration-none"
              href="https://github.com/Food-Busters/food-waste-quotes"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </div>

          <Link to="/admin" className="navbar-option fs-3">
            Admin
          </Link>
        </div>

        <div className="router-view col-12 col-lg-9 col-xl-6 mx-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
