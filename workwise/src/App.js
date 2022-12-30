import { Router, Switch, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage.js";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
      </Routes>
    </>
  );
}

export default App;
