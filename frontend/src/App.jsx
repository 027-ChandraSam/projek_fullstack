import { Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetail from "./pages/PostDetail";
import Admin from "./pages/Dashboard";
import CreatePost from "./components/CreatePost";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import "./App.css";
import UsersPage from "./pages/Users";

function App() {
  return (
    <Routes>
      {/* HOME */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      {/* CREATE POST (LOGIN REQUIRED) */}
      <Route
        path="/create"
        element={
          <ProtectedRoute>
            <MainLayout>
              <CreatePost />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Admin />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      {/* SINGLE POST */}
      <Route
        path="/posts/:id"
        element={
          <MainLayout>
            <PostDetail />
          </MainLayout>
        }
      />
      {/* AUTH */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/profile" element={
        <MainLayout>
          <Profile/>
        </MainLayout>
      } />
    <Route path="/users" element={
      <MainLayout>
        <UsersPage/>
      </MainLayout>
    }/>
    </Routes>
    
  );
}

export default App;
