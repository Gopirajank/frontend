import React, { useContext } from "react";
import Topbar from "./components/Topbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home"
import Single from "./pages/Single"
import Settings from "./pages/Settings"
import Write from "./pages/Write";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Context } from "./context/Context";

function App() {
  const { user } = useContext(Context)

  return (
    <Router>
      <Topbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route path="/write" element={user ? <Write /> : <Navigate to="/login" />} />
        <Route
          path="/settings"
          element={user ? <Settings /> : <Navigate to="/login" />}
        />
        <Route path="/post/:postId" element={<Single />} />
      </Routes>
    </Router>
  );
}

export default App;
