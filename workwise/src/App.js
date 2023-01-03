import { Router, Switch, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage.js";
import Header from "./components/Header.js";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
      <Routes>
        <Route path="/dashboard" element={<Header/>} />
      </Routes>
      
    </>
  );
}

export default App;
