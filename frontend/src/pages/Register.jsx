import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      alert("Password tidak sama");
      return;
    }

    try {
      await api.post("/auth/register", {
        username: form.username,
        email: form.email,
        password: form.password,
      });

      alert("Register berhasil, silakan login");
      navigate("/login");
    } catch (err) {
      alert("Register gagal");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-800 p-6 rounded-lg w-96 border border-zinc-700"
      >
        <h1 className="text-xl font-bold text-zinc-200 mb-4">
          Register
        </h1>

        <input
          type="text"
          name="username"
          placeholder="Username"
          className="w-full mb-3 p-2 rounded bg-zinc-900 text-zinc-200 outline-none focus:ring-2 focus:ring-orange-500"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full mb-3 p-2 rounded bg-zinc-900 text-zinc-200 outline-none focus:ring-2 focus:ring-orange-500"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full mb-3 p-2 rounded bg-zinc-900 text-zinc-200 outline-none focus:ring-2 focus:ring-orange-500"
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          className="w-full mb-4 p-2 rounded bg-zinc-900 text-zinc-200 outline-none focus:ring-2 focus:ring-orange-500"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 transition p-2 rounded font-semibold text-zinc-900"
        >
          Register
        </button>

        <p className="text-sm text-zinc-400 mt-4 text-center">
          Sudah punya akun?{" "}
          <Link
            to="/login"
            className="text-orange-500 hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
