import { BrowserRouter, Routes, Route } from "react-router-dom";
// import {useEffect, useState} from "react"
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
import Project from "./pages/Project";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute"
// import SplashScreen from "./pages/SplashScreen"
import Task from "./pages/Task"
import Snip from "./pages/Snip"
import Search from "./pages/Search"
import Profile from "./pages/Profile"
import SeriesList from "./pages/SeriesList"
import EditProject from "./pages/EditProject"
import NewSeries from "./pages/NewSeries"
import Series from "./pages/Series"
import EditSeries from "./pages/EditSeries"
import EditSnip from "./pages/EditSnip"
function App() {

  // const [showSplash, setShowSplash] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowSplash(false);
  //   }, 2000);

  //   return () => clearTimeout(timer);
  // }, [])

  // if (showSplash) {
  //   return <SplashScreen />
  // }
  return (
    <BrowserRouter>
    <Header></Header>
      <Routes>
        <Route path="/" element ={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/new-project" element={<NewProject />} />
          <Route path="/new-snip" element={<NewSnip />} />
          <Route path="/new-task" element={<NewTask />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/snips" element={<Snips />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path ="/settings" element={<Settings />} />
          <Route path="/project/:id" element={<Project />} />
          <Route path="/task/:id" element ={<Task />} />
          <Route path="/snip/:id" element={<Snip />} />
          <Route path="/search" element ={<Search />} />
          <Route path="/profile" element ={<Profile />} />
          <Route path="/series" element ={<SeriesList />} />
          <Route path="/project/:id/edit" element ={<EditProject />} />
          <Route path="/new-series" element = {<NewSeries />} />
          <Route path="/series/:id" element ={<Series />} />
          <Route path="/series/:id/edit" element = {<EditSeries />} />
          <Route path="/snip/:id/edit" element ={<EditSnip />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;