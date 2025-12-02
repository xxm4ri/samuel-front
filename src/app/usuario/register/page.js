import { useState } from "react";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

export default function RegisterPage() {
  const [form, setForm] = useState({
    email: "",
    senha: "",
    nome: "",
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

    try {
      await axios.post("http://localhost:8080/api/v1/auth", form);
      alert("Cadastro realizado com sucesso!");
      window.location.href = "/login";
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      } else {
        alert("Erro ao cadastrar.");
      }
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-700 to-purple-900 p-6 text-white">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-xl w-full max-w-lg border border-white/20">
        <button
          onClick={() => (window.location.href = "/login")}
          className="flex items-center gap-2 text-sm mb-4 hover:opacity-80"
        >
          <ArrowLeft size={18} /> Voltar
        </button>

        <h1 className="text-3xl font-bold mb-6 text-center">Criar Conta</h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <div>
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg text-black"
              required
            />
            {errors.email && <p className="text-red-300 text-sm">{errors.email}</p>}
          </div>

          {/* Senha */}
          <div>
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              value={form.senha}
              onChange={handleChange}
              className="w-full p-3 rounded-lg text-black"
              required
            />
            {errors.senha && <p className="text-red-300 text-sm">{errors.senha}</p>}
          </div>

          {/* Nome */}
          <div>
            <label>Nome</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full p-3 rounded-lg text-black"
              required
            />
            {errors.nome && <p className="text-red-300 text-sm">{errors.nome}</p>}
          </div>

          {/* CPF */}
          <div>
            <label>CPF</label>
            <input
              type="text"
              name="cpf"
              value={form.cpf}
              onChange={handleChange}
              className="w-full p-3 rounded-lg text-black"
              required
            />
            {errors.cpf && <p className="text-red-300 text-sm">{errors.cpf}</p>}
          </div>

          {/* Telefone */}
          <div>
            <label>Telefone</label>
            <input
              type="text"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
              className="w-full p-3 rounded-lg text-black"
              required
            />
            {errors.telefone && <p className="text-red-300 text-sm">{errors.telefone}</p>}
          </div>

          {/* Tipo */}
          <div>
            <label>Tipo de Usuário</label>
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="w-full p-3 rounded-lg text-black"
              required
            >
              <option value="">Selecione</option>
              <option value="ADMIN">ADMIN</option>
              <option value="CLIENTE">CLIENTE</option>
            </select>
            {errors.tipo && <p className="text-red-300 text-sm">{errors.tipo}</p>}
          </div>

          {/* Data de Nascimento */}
          <div>
            <label>Data de Nascimento</label>
            <input
              type="date"
              name="dataNascimento"
              value={form.dataNascimento}
              onChange={handleChange}
              className="w-full p-3 rounded-lg text-black"
              required
            />
            {errors.dataNascimento && (
              <p className="text-red-300 text-sm">{errors.dataNascimento}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-4 bg-purple-600 hover:bg-purple-700 transition p-3 rounded-xl shadow-lg"
          >
            {loading ? "Enviando..." : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
}