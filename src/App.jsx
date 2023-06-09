import React from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./App.scss";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Result from "./components/Result";

library.add(faSearch);

const App = () => {
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <Result />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
