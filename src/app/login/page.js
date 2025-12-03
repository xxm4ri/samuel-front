"use client";

import { useState } from "react";
import axios from "axios";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showSenha, setShowSenha] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    if (!email || !senha) {
      setMessage("Preencha todos os campos");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/v1/login", {
        email,
        senha,
      });
      setMessage("Login realizado com sucesso!");
      console.log("Login bem-sucedido:", response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrors(error.response.data.errors || {});
        setMessage(error.response.data.message || "Erro de validação");
      } else {
        setMessage("Erro ao conectar com o servidor");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-200 to-purple-400">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold mb-6 text-purple-700 text-center">
          Login
        </h1>

        {message && (
          <p
            className={`mb-4 text-center ${
              message.includes("sucesso") ? "text-green-500" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        {/* Email */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Email</label>
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
            <Mail className="text-purple-500 mr-2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              className="outline-none w-full"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Senha */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Senha</label>
          <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400 relative">
            <Lock className="text-purple-500 mr-2" />
            <input
              type={showSenha ? "text" : "password"}
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              className="outline-none w-full"
            />
            <button
              type="button"
              onClick={() => setShowSenha(!showSenha)}
              className="absolute right-3 text-purple-500 hover:text-purple-700"
            >
              {showSenha ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.senha && (
            <p className="text-red-500 text-sm mt-1">{errors.senha}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>

        {/* Link para cadastro */}
        <p className="text-center mt-4 text-gray-600">
          Não tem uma conta?{" "}
          <a
            href="/usuario"
            className="text-purple-700 font-semibold hover:underline"
          >
            Cadastre-se aqui
          </a>
        </p>
      </form>
    </div>
  );
}
