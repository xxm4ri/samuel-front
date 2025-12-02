"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Calendar, MapPin, ExternalLink } from "lucide-react";

export default function EventosPage() {
  const [eventos, setEventos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/v1/evento")
      .then((res) => setEventos(res.data))
      .catch((err) => console.error(err));
  }, []);

  if (eventos.length === 0) return <div className="text-center p-10 text-white">Carregando eventos...</div>;

  const destaque = eventos[0];
  const miniaturas = eventos.slice(1);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-200 via-purple-300 to-purple-400 p-6 flex flex-col items-center">
      {/* Evento em destaque */}
      <div className="w-full max-w-4xl bg-white/20 backdrop-blur-md shadow-2xl rounded-2xl p-6 mb-10 text-white border border-white/30">
        <img
          src={destaque.linkImagem}
          alt={destaque.nome}
          className="w-full h-64 object-cover rounded-xl mb-4 shadow-lg"
        />
        <h1 className="text-3xl font-bold mb-2 drop-shadow-lg">{destaque.nome}</h1>
        <p className="mb-3 opacity-90">{destaque.descricao}</p>

        <div className="flex flex-col gap-1 text-sm opacity-90">
          <div className="flex items-center gap-2"><Calendar size={18} /> Início: {destaque.dataInicio}</div>
          <div className="flex items-center gap-2"><Calendar size={18} /> Final: {destaque.dataFinal}</div>
          <div className="flex items-center gap-2"><MapPin size={18} /> {destaque.local}</div>
        </div>

        {destaque.linkEvento && (
          <a
            href={destaque.linkEvento}
            target="_blank"
            className="inline-flex items-center gap-2 mt-4 px-4 py-2 bg-purple-700 hover:bg-purple-800 transition rounded-xl shadow-lg"
          >
            Acessar evento <ExternalLink size={18} />
          </a>
        )}
      </div>

      {/* Miniaturas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {miniaturas.map((ev) => (
          <div key={ev.id} className="bg-white/20 backdrop-blur-md rounded-2xl shadow-xl p-4 border border-white/30 text-white hover:scale-[1.03] transition cursor-pointer">
            <img
              src={ev.linkImagem}
              alt={ev.nome}
              className="w-full h-32 object-cover rounded-xl mb-3 shadow-lg"
            />
            <h2 className="font-bold text-lg mb-1 drop-shadow">{ev.nome}</h2>
            <p className="text-sm opacity-80 line-clamp-2">{ev.descricao}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
