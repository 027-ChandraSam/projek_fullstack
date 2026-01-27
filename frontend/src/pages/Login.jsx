import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    }catch (err) {
      console.log("LOGIN ERROR 👉", err.response?.data || err.message);
      alert(err.response?.data?.message || "Login gagal");
    }
    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <form
        onSubmit={handleLogin}
        className="bg-zinc-800 p-6 rounded-lg w-96 border border-zinc-700"
      >
        <h1 className="text-xl font-bold text-zinc-200 mb-4">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-3 p-2 rounded bg-zinc-900 text-zinc-200"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded bg-zinc-900 text-zinc-200"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-orange-500 p-2 rounded font-semibold">
          Login
        </button>

        <p className="text-sm text-zinc-400 mt-4 text-center">
          Belum punya akun?{" "}
          <Link to="/register" className="text-orange-500 hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
