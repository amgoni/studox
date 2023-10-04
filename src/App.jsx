import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./App.scss";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Upload from "./pages/Upload";
import Index from "./pages/Index";

library.add(faSearch);

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Navigate to="/index" />} />
        <Route path="/index" element={<Index />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
