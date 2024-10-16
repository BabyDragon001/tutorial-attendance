import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import AdminProtectedRoute from "./AdminProtectedRoute";
import ScrollToTop from "./hooks/scrollTop";
import NotFound from "./pages/NotFound";
import AdminPanel from "./pages/AdminPanel";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import HomeLayout from "./components/HomeLayout";
import { useSelector } from "react-redux";
import { RootState } from "./stateManager";
import { useState, useEffect } from "react";

const App = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const [admin, setAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (user && user.role === "admin") {
      setAdmin(true);
    } else {
      setAdmin(false);
    }
  }, [user]);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<HomeLayout admin={admin} />}>
          <Route
            index
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/leaderboard"
            element={
              <ProtectedRoute>
                <Leaderboard />
              </ProtectedRoute>
            }
          />
          {/* Admin-specific route */}
          {admin && (
            <Route
              path="/admin"
              element={
                <AdminProtectedRoute>
                  <AdminPanel />
                </AdminProtectedRoute>
              }
            />
          )}
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
};

export default App;
