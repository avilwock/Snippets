import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Header from "./components/Header/Header";
import NewProject from "./pages/NewProject";
import NewSnip from "./pages/NewSnip";
import NewTask from "./pages/NewTask";
import Projects from "./pages/Projects";
import Snips from "./pages/Snips";
import Tasks from "./pages/Tasks";
import Settings from "./pages/Settings";

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
        <Route path="/new-task" element={<NewTask />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/snips" element={<Snips />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path ="/settings" element={<Settings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;