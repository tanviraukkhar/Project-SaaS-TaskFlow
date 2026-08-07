import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import ProjectDetails from "./pages/ProjectDetails";
import Tasks from "./pages/Tasks";
import Calendar from "./pages/Calendar";
import Reports from "./pages/Reports";
import Users from "./pages/Users";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";


function App() {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />


      {/* Dashboard */}
      <Route 
        path="/dashboard" 
        element={<Dashboard />} 
      />


      {/* Projects */}
      <Route 
        path="/projects" 
        element={<Projects />} 
      />


      <Route 
        path="/projects/:id" 
        element={<ProjectDetails />} 
      />



      {/* Tasks */}
      <Route 
        path="/tasks" 
        element={<Tasks />} 
      />



      {/* Others */}

      <Route 
        path="/calendar" 
        element={<Calendar />} 
      />


      <Route 
        path="/reports" 
        element={<Reports />} 
      />


      <Route 
        path="/users" 
        element={<Users />} 
      />


      <Route 
        path="/profile" 
        element={<Profile />} 
      />


      <Route 
        path="/settings" 
        element={<Settings />} 
      />


    </Routes>
  );
}

export default App;