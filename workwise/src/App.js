import Homepage from "./pages/homepage.js";
import Kanban from "./pages/kanban.js";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import axios from "axios";
import Cards from "./components/Cards.js";
import KanbanSection from "./components/KanbanSection.js";
function App() {
  return (
    <>
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const [rendered, setRendered] = useState(false);

  const [url, setUrl] = useState(
    "https://wallpapertag.com/wallpaper/full/c/1/4/145606-best-desktop-wallpaper-1920x1200-smartphone.jpg"
  );

  const fetchBg = async () => {
    // document.readyState !== "complete"
    if (!rendered) {
      const response = await axios.get(
        "https://api.unsplash.com/photos/random/?client_id=NyUvXIq3Ek5F89nIPbNAGA84yhFxG3mOiSpvOb2ZklE&query=nature&orientation=landscape"
      );
      const data = await response.data;
      setUrl(data.urls.full);
      setRendered(true);
    }
  };

  useEffect(() => {
    fetchBg();
  }, []);
  return (
    <>
      <AnimatePresence>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Homepage url={url} />}></Route>
          <Route path="/kanban" element={<Kanban />}>
            <Route path=":section" element={<KanbanSection />} />
          </Route>
          <Route path="/Cards" element={<Cards />}></Route>
        </Routes>
      </AnimatePresence>
    </>
  );
}

export default App;
