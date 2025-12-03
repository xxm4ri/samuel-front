"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, MapPin, ExternalLink, Trash2, Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ManageEventosPage() {
  const router = useRouter();
  const [eventos, setEventos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchEventos() {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/evento");
        setEventos(res.data);
      } catch (err) {
        setError("Erro ao carregar eventos");
      } finally {
        setLoading(false);
      }
    }
    fetchEventos();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Deseja realmente excluir este evento?")) return;
    try {
      await axios.delete(`http://localhost:8080/api/v1/evento/${id}`);
      setEventos(eventos.filter((e) => e.id !== id));
    } catch (err) {
      alert("Erro ao excluir evento");
    }
  };

  const handleEdit = (id) => {
    router.push(`/evento/edit/${id}`);
  };

  if (loading) return <p className="text-purple-900 text-center p-10">Carregando eventos...</p>;
  if (error) return <p className="text-red-500 text-center p-10">{error}</p>;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 via-purple-200 to-purple-300 p-6 pt-24 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-purple-900 mb-6 flex items-center gap-2">
        <Calendar size={28} /> Eventos
      </h1>

      <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-6">
        {/* Lista de eventos */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {eventos.map((ev) => (
            <div
              key={ev.id}
              className="bg-white/40 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-white/50 text-purple-900 flex flex-col justify-between hover:scale-[1.02] transition"
            >
              <img
                src={ev.linkImagem}
                alt={ev.nome}
                className="w-full h-32 object-cover rounded-xl mb-3 shadow-lg"
              />
              <h2 className="font-bold text-lg">{ev.nome}</h2>
              <p className="text-sm opacity-80 line-clamp-2">{ev.descricao}</p>
              <div className="flex flex-col text-purple-700 text-sm mt-2">
                <div className="flex items-center gap-1"><Calendar size={16} /> {ev.dataInicio} - {ev.dataFinal}</div>
                <div className="flex items-center gap-1"><MapPin size={16} /> {ev.local}</div>
              </div>
              <div className="flex gap-2 mt-3">
                <button
                  onClick={() => handleEdit(ev.id)}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white rounded-xl p-2 flex items-center justify-center gap-2 text-sm"
                >
                  <Edit2 size={16} /> Editar
                </button>
                <button
                  onClick={() => handleDelete(ev.id)}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white rounded-xl p-2 flex items-center justify-center gap-2 text-sm"
                >
                  <Trash2 size={16} /> Excluir
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Calendário simples */}
        <div className="flex-1 bg-white/40 backdrop-blur-xl rounded-2xl shadow-xl p-4 border border-white/50 text-purple-900">
          <h2 className="font-bold text-xl mb-4">Calendário</h2>
          {eventos.length === 0 ? (
            <p>Nenhum evento cadastrado</p>
          ) : (
            <ul className="space-y-2">
              {eventos.map((ev) => (
                <li key={ev.id} className="border-b border-white/30 pb-2">
                  <span className="font-semibold">{ev.nome}</span> - {ev.dataInicio}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
