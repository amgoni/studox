import { Route, Navigate, Routes } from "react-router-dom";
import "./App.scss";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Upload from "./pages/Upload";
import Index from "./pages/Index";

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
