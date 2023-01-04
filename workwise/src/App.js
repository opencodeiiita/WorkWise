import { Router, Switch, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage.js";
import Kanban from "./pages/kanban.js";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/kanban" element={<Kanban/>}/>
      </Routes>
    </>
  );}

export default App;
