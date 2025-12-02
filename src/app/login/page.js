"use client";

import { useState } from "react";
import axios from "axios";
import { Mail, Lock, LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    email: "",
    senha: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await axios.post("http://localhost:8080/api/v1/login", form);
      router.push("/"); // redireciona após login
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        alert("Erro inesperado no servidor.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/30 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/40"
      >
        <h1 className="text-3xl font-bold text-white text-center mb-6 drop-shadow-lg">
          Entrar
        </h1>

        {/* Email */}
        <div className="mb-5">
          <label className="font-semibold text-white">Email</label>
          <div className="flex items-center gap-2 bg-white/60 p-3 rounded-xl">
            <Mail className="text-gray-700" size={20} />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent w-full focus:outline-none text-gray-900"
              placeholder="Digite seu email"
            />
          </div>
          {errors.email && (
            <p className="text-red-700 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Senha */}
        <div className="mb-5">
          <label className="font-semibold text-white">Senha</label>
          <div className="flex items-center gap-2 bg-white/60 p-3 rounded-xl">
            <Lock className="text-gray-700" size={20} />
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              className="bg-transparent w-full focus:outline-none text-gray-900"
              placeholder="Digite sua senha"
            />
          </div>
          {errors.senha && (
            <p className="text-red-700 text-sm mt-1">{errors.senha}</p>
          )}
        </div>

        {/* Botão Login */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-purple-700 hover:bg-purple-800 transition text-white p-3 rounded-xl shadow-lg"
        >
          <LogIn size={20} />
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {/* 🔗 Link para Cadastro */}
        <div className="text-center mt-6">
          <button
            type="button"
            onClick={() => router.push("/cadastro")}
            className="text-white font-semibold hover:underline flex items-center justify-center gap-2"
          >
            <UserPlus size={18} />
            Criar nova conta
          </button>
        </div>
      </form>
    </div>
  );
}
