"use client";

import { useState } from "react";
import axios from "axios";
import { Calendar, Image, Link, MapPin, PlusCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateEventoPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    tipo: "",
    local: "",
    dataInicio: "",
    dataFinal: "",
    linkEvento: "",
    linkImagem: ""
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const formatDateTime = (value) => {
    const date = new Date(value);
    if (isNaN(date)) return "";

    const pad = (n) => String(n).padStart(2, "0");

    return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()} ${pad(date.getHours())}:${pad(
      date.getMinutes()
    )}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      const payload = {
        ...form,
        dataInicio: formatDateTime(form.dataInicio),
        dataFinal: formatDateTime(form.dataFinal)
      };

      await axios.post("http://localhost:8080/api/v1/evento", payload);
      router.push("/");
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 p-6 flex justify-center bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300">
      <div className="bg-white/40 backdrop-blur-xl p-8 rounded-2xl shadow-xl border border-white/50 w-full max-w-3xl">
        <h1 className="text-3xl font-bold text-purple-900 mb-6 flex items-center gap-2 drop-shadow">
          <PlusCircle size={28} /> Criar Evento
        </h1>

        <form className="grid grid-cols-1 gap-4" onSubmit={handleSubmit}>
          {/* Nome */}
          <div>
            <label className="font-semibold text-purple-900">Nome</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/60 focus:outline-none"
              placeholder="Nome do evento"
            />
            {errors.nome && <p className="text-red-700 text-sm">{errors.nome}</p>}
          </div>

          {/* Descrição */}
          <div>
            <label className="font-semibold text-purple-900">Descrição</label>
            <textarea
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/60 focus:outline-none"
              rows={4}
              placeholder="Descrição detalhada do evento"
            />
            {errors.descricao && <p className="text-red-700 text-sm">{errors.descricao}</p>}
          </div>

          {/* Tipo */}
          <div>
            <label className="font-semibold text-purple-900">Tipo do evento</label>
            <select
              name="tipo"
              value={form.tipo}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/60 focus:outline-none"
            >
              <option value="">Selecione...</option>
              <option value="CONGRESSO">Congresso</option>
              <option value="TREINAMENTO">Treinamento</option>
              <option value="WORKSHOP">Workshop</option>
              <option value="IMERSÃO">Imersão</option>
              <option value="REUNIÃO">Reunião</option>
              <option value="HACKATON">Hackaton</option>
              <option value="STARTUP">Startup</option>
            </select>
            {errors.tipo && <p className="text-red-700 text-sm">{errors.tipo}</p>}
          </div>

          {/* Local */}
          <div>
            <label className="font-semibold text-purple-900 flex items-center gap-2">
              <MapPin size={18} /> Local
            </label>
            <input
              type="text"
              name="local"
              value={form.local}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/60 focus:outline-none"
              placeholder="Endereço do evento"
            />
            {errors.local && <p className="text-red-700 text-sm">{errors.local}</p>}
          </div>

          {/* Datas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="font-semibold text-purple-900 flex items-center gap-2">
                <Calendar size={18} /> Data Início
              </label>
              <input
                type="datetime-local"
                name="dataInicio"
                value={form.dataInicio}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/60 focus:outline-none"
              />
              {errors.dataInicio && <p className="text-red-700 text-sm">{errors.dataInicio}</p>}
            </div>

            <div>
              <label className="font-semibold text-purple-900 flex items-center gap-2">
                <Calendar size={18} /> Data Final
              </label>
              <input
                type="datetime-local"
                name="dataFinal"
                value={form.dataFinal}
                onChange={handleChange}
                className="w-full p-3 rounded-xl bg-white/60 focus:outline-none"
              />
              {errors.dataFinal && <p className="text-red-700 text-sm">{errors.dataFinal}</p>}
            </div>
          </div>

          {/* Link Evento */}
          <div>
            <label className="font-semibold text-purple-900 flex items-center gap-2">
              <Link size={18} /> Link do Evento (opcional)
            </label>
            <input
              type="text"
              name="linkEvento"
              value={form.linkEvento}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/60 focus:outline-none"
              placeholder="URL do evento"
            />
          </div>

          {/* Imagem */}
          <div>
            <label className="font-semibold text-purple-900 flex items-center gap-2">
              <Image size={18} /> Link da Imagem
            </label>
            <input
              type="text"
              name="linkImagem"
              value={form.linkImagem}
              onChange={handleChange}
              className="w-full p-3 rounded-xl bg-white/60 focus:outline-none"
              placeholder="URL da imagem do evento"
            />
          </div>

          {/* BOTÃO CORRIGIDO */}
          <button
            type="submit"
            disabled={loading}
            className="mt-4 p-3 bg-[#8A00FF] hover:bg-[#7000CC] transition rounded-xl text-white font-semibold shadow-lg"
          >
            {loading ? "Criando..." : "Criar Evento"}
          </button>
        </form>
      </div>
    </div>
  );
}
