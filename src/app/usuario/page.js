"use client";

import { useState } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  IdCard,
  ChevronLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function CadastroPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    telefone: "",
    tipo: "",
    dataNascimento: "",
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

    // Converte yyyy-MM-dd -> dd/MM/yyyy
    const dataFormatada = form.dataNascimento.split("-").reverse().join("/");

    try {
      await axios.post("http://localhost:8080/api/v1/usuario", {
        ...form,
        dataNascimento: dataFormatada,
      });

      alert("Conta criada com sucesso!");
      router.push("/login");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white/50 backdrop-blur-xl p-8 rounded-2xl shadow-2xl w-full max-w-lg border border-white/60"
      >
        <h1 className="text-3xl font-bold text-purple-900 text-center mb-6">
          Criar Conta
        </h1>

        {/* Nome */}
        <div className="mb-4">
          <label className="font-semibold text-purple-900">Nome</label>
          <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-md">
            <User size={20} className="text-gray-600" />
            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="bg-transparent w-full focus:outline-none"
              placeholder="Seu nome completo"
            />
          </div>
          {errors.nome && <p className="text-red-700 text-sm">{errors.nome}</p>}
        </div>

        {/* Email */}
        <div className="mb-4">
          <label className="font-semibold text-purple-900">Email</label>
          <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-md">
            <Mail size={20} className="text-gray-600" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="bg-transparent w-full focus:outline-none"
              placeholder="email@exemplo.com"
            />
          </div>
          {errors.email && (
            <p className="text-red-700 text-sm">{errors.email}</p>
          )}
        </div>

        {/* Senha */}
        <div className="mb-4">
          <label className="font-semibold text-purple-900">Senha</label>
          <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-md">
            <Lock size={20} className="text-gray-600" />
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              className="bg-transparent w-full focus:outline-none"
              placeholder="Crie uma senha"
            />
          </div>
          {errors.senha && (
            <p className="text-red-700 text-sm">{errors.senha}</p>
          )}
        </div>

        {/* CPF */}
        <div className="mb-4">
          <label className="font-semibold text-purple-900">CPF</label>
          <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-md">
            <IdCard size={20} className="text-gray-600" />
            <input
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              className="bg-transparent w-full focus:outline-none"
              placeholder="000.000.000-00"
            />
          </div>
          {errors.cpf && <p className="text-red-700 text-sm">{errors.cpf}</p>}
        </div>

        {/* Telefone */}
        <div className="mb-4">
          <label className="font-semibold text-purple-900">Telefone</label>
          <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-md">
            <Phone size={20} className="text-gray-600" />
            <input
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              className="bg-transparent w-full focus:outline-none"
              placeholder="(00) 00000-0000"
            />
          </div>
          {errors.telefone && (
            <p className="text-red-700 text-sm">{errors.telefone}</p>
          )}
        </div>

        {/* Tipo */}
        <div className="mb-4">
          <label className="font-semibold text-purple-900">
            Tipo de Usuário
          </label>
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="w-full p-3 rounded-xl bg-white shadow-md focus:outline-none"
          >
            <option value="">Selecione...</option>
            <option value="ADMIN">Administrador</option>
            <option value="CLIENTE">Cliente</option>
            <option value="FUNCIONARIO">Funcionário</option>
          </select>
          {errors.tipo && <p className="text-red-700 text-sm">{errors.tipo}</p>}
        </div>

        {/* Data */}
        <div className="mb-4">
          <label className="font-semibold text-purple-900">
            Data de Nascimento
          </label>
          <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-md">
            <Calendar size={20} className="text-gray-600" />
            <input
              type="date"
              name="dataNascimento"
              value={form.dataNascimento}
              onChange={handleChange}
              className="bg-transparent w-full focus:outline-none"
            />
          </div>
          {errors.dataNascimento && (
            <p className="text-red-700 text-sm">{errors.dataNascimento}</p>
          )}
        </div>

        {/* Botão */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-700 hover:bg-purple-800 text-white p-3 rounded-xl shadow-lg transition"
        >
          {loading ? "Cadastrando..." : "Criar Conta"}
        </button>

        {/* Voltar */}
        <div className="text-center mt-4">
          <button
            type="button"
            onClick={() => router.push("/login")}
            className="text-purple-900 font-semibold hover:underline flex items-center justify-center gap-2"
          >
            <ChevronLeft size={18} />
            Voltar ao Login
          </button>
        </div>

        {/* 🔗 Link para /usuario */}
        <div className="text-center mt-4">
          <a
            href="/usuario"
            className="text-purple-900 font-semibold hover:underline"
          >
            Criar Conta (via /usuario)
          </a>
        </div>
      </form>
    </div>
  );
}
