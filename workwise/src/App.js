import { Router, Switch, Route, Routes } from "react-router-dom";
import Homepage from "./pages/homepage.js";
import CalendarPage from "./pages/calendarpage.js";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/calendar" element={<CalendarPage/>} />
      </Routes>
    </>
  );
}

export default App;
