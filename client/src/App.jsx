import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header/Header";
import NewProject from "./pages/NewProject";
import NewSnip from "./pages/NewSnip";

function App() {
  return (
    <BrowserRouter>
    <Header></Header>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/new-project" element={<NewProject />} />
        <Route path="/new-snip" element={<NewSnip />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;