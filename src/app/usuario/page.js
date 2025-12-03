"use client";

import { useState } from "react";
import axios from "axios";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Cadastro() {
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    cpf: "",
    telefone: "",
    tipo: "",
    dataNascimento: "",
  });

  const [showSenha, setShowSenha] = useState(false);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cpf") {
      let v = value.replace(/\D/g, "");
      if (v.length > 11) v = v.slice(0, 11);
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d)/, "$1.$2");
      v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
      setForm({ ...form, cpf: v });
      return;
    }

    if (name === "telefone") {
      let v = value.replace(/\D/g, "");
      if (v.length > 11) v = v.slice(0, 11);
      v = v.replace(/^(\d{2})(\d)/, "($1) $2");
      v = v.replace(/(\d{5})(\d)/, "$1-$2");
      setForm({ ...form, telefone: v });
      return;
    }

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setMessage("");

    const newErrors = {};
    if (!form.nome) newErrors.nome = "O nome deve ser preenchido";
    if (!form.email) newErrors.email = "O email deve ser preenchido";
    else if (!form.email.includes("@gmail.com")) newErrors.email = "Email inválido, deve ser @gmail.com";
    if (!form.senha) newErrors.senha = "A senha deve ser preenchida";
    else if (form.senha.length < 6) newErrors.senha = "A senha deve ter pelo menos 6 caracteres";
    if (!form.cpf || form.cpf.replace(/\D/g, "").length !== 11) newErrors.cpf = "CPF inválido";
    if (!form.telefone || form.telefone.replace(/\D/g, "").length < 10) newErrors.telefone = "Telefone inválido";
    if (!form.tipo) newErrors.tipo = "Selecione o tipo de usuário";
    if (!form.dataNascimento) newErrors.dataNascimento = "Preencha a data de nascimento";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setMessage("Existem erros no formulário");
      return;
    }

    const dataParts = form.dataNascimento.split("-");
    const dataFormatada = dataParts.length === 3 ? `${dataParts[2]}/${dataParts[1]}/${dataParts[0]}` : "";

    const payload = {
      ...form,
      cpf: form.cpf.replace(/\D/g, ""),
      telefone: form.telefone.replace(/\D/g, ""),
      dataNascimento: dataFormatada,
    };

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8080/api/v1/usuario", payload);
      setMessage("Cadastro realizado com sucesso!");
      setForm({
        nome: "",
        email: "",
        senha: "",
        cpf: "",
        telefone: "",
        tipo: "",
        dataNascimento: "",
      });
      console.log("Usuário cadastrado:", response.data);
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
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-purple-700 text-center">Cadastro</h1>

        {message && <p className={`mb-4 text-center ${message.includes("sucesso") ? "text-green-500" : "text-red-500"}`}>{message}</p>}

        {[
          { label: "Nome", name: "nome", type: "text" },
          { label: "Email", name: "email", type: "email", icon: Mail },
          { label: "Senha", name: "senha", type: "password", icon: Lock },
          { label: "CPF", name: "cpf", type: "text" },
          { label: "Telefone", name: "telefone", type: "text" },
        ].map(({ label, name, type, icon: Icon }) => (
          <div key={name} className="mb-4">
            <label className="block text-gray-700 mb-1">{label}</label>
            {name === "senha" ? (
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400 relative">
                <Lock className="text-purple-500 mr-2" />
                <input
                  type={showSenha ? "text" : "password"}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={`Digite seu ${label.toLowerCase()}`}
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
            ) : Icon ? (
              <div className="flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-purple-400">
                <Icon className="text-purple-500 mr-2" />
                <input
                  type={type}
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  placeholder={`Digite seu ${label.toLowerCase()}`}
                  className="outline-none w-full"
                />
              </div>
            ) : (
              <input
                type={type}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={`Digite seu ${label.toLowerCase()}`}
                className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
              />
            )}
            {errors[name] && <p className="text-red-500 text-sm mt-1">{errors[name]}</p>}
          </div>
        ))}

        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Tipo</label>
          <select
            name="tipo"
            value={form.tipo}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Selecione</option>
            <option value="ORGANIZADOR">Organizador</option>
            <option value="CLIENTE">Cliente</option>
            <option value="ADMINISTRADOR">Administrador</option>
          </select>
          {errors.tipo && <p className="text-red-500 text-sm mt-1">{errors.tipo}</p>}
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Data de Nascimento</label>
          <input
            type="date"
            name="dataNascimento"
            value={form.dataNascimento}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
          />
          {errors.dataNascimento && <p className="text-red-500 text-sm mt-1">{errors.dataNascimento}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>

        <p className="text-center mt-4 text-gray-600">
          Já tem uma conta? <a href="/login" className="text-purple-700 font-semibold hover:underline">Faça login</a>
        </p>
      </form>
    </div>
  );
}