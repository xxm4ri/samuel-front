"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Inscricao() {
  const [form, setForm] = useState({
    usuarioId: "",
    eventoId: "",
  });
  const [usuarios, setUsuarios] = useState([]);
  const [eventos, setEventos] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Carregar usuários e eventos do backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usuariosRes = await axios.get("http://localhost:8080/api/v1/usuario");
        setUsuarios(usuariosRes.data);

        const eventosRes = await axios.get("http://localhost:8080/api/v1/evento");
        setEventos(eventosRes.data);
      } catch (error) {
        console.log("Erro ao carregar usuários ou eventos", error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!form.usuario || !form.evento) {
      setMessage("Selecione um usuário e um evento");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/inscricao",
        form
      );
      setMessage("Inscrição realizada com sucesso!");
      setForm({ usuario: "", evento: "" });
      console.log("Inscrição:", response.data);
    } catch (error) {
      setMessage("Erro ao realizar inscrição");
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
          Inscrever Usuário
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

        {/* Usuário */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-1">Usuário</label>
          <select
            name="usuario"
            value={form.usuario}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Selecione um usuário</option>
            {usuarios.map((u) => (
              <option key={u.id} value={u.id}>
                {u.nome} ({u.email})
              </option>
            ))}
          </select>
        </div>

        {/* Evento */}
        <div className="mb-6">
          <label className="block text-gray-700 mb-1">Evento</label>
          <select
            name="evento"
            value={form.evento}
            onChange={handleChange}
            className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="">Selecione um evento</option>
            {eventos.map((e) => (
              <option key={e.id} value={e.id}>
                {e.nome} ({e.data})
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded-lg transition-colors disabled:opacity-50"
        >
          {loading ? "Inscrevendo..." : "Inscrever"}
        </button>
      </form>
    </div>
  );
}
