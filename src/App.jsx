import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

// Pages
import Characters from "./pages/characters/Characters";
import Character from "./pages/character/Character";
import Comics from "./pages/comics/Comics";
import Comic from "./pages/comic/Comic";
import Favorites from "./pages/favorites/Favorites";

// Components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
      <Header search={search} setSearch={setSearch}></Header>
      <Routes>
        <Route path="/comics/:id" element={<Comic />} />
        <Route path="/characters/:id" element={<Character />} />
        <Route path="/comics/" element={<Comics search={search} />} />
        <Route path="/favorites/" element={<Favorites search={search} />} />
        <Route path="*" element={<Characters search={search} />} />
      </Routes>
      <Footer></Footer>
    </Router>
  );
}

export default App;
