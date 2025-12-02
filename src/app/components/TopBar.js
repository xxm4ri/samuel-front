"use client";

import { useState } from "react";
import {
  Home,
  Users,
  CalendarDays,
  ChevronDown,
  LogIn,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const router = useRouter();

  // estados para abrir e fechar os menus
  const [openUsers, setOpenUsers] = useState(false);
  const [openCalendar, setOpenCalendar] = useState(false);

  // Fecha um menu quando o outro abre
  const toggleUsers = () => {
    setOpenUsers(!openUsers);
    setOpenCalendar(false);
  };

  const toggleCalendar = () => {
    setOpenCalendar(!openCalendar);
    setOpenUsers(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/10 shadow-lg border-b border-white/20 transition-all flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between p-4 text-white">

        {/* HOME / LOGO */}
        <button
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          onClick={() => router.push("/")}
        >
          <Home size={22} />
          <span className="font-bold text-lg">Eventos</span>
        </button>

        {/* MENUS */}
        <div className="flex items-center gap-6">

          {/* -------- MENU USUÁRIOS -------- */}
          <div className="relative">
            <button
              onClick={toggleUsers}
              className="flex items-center gap-1 hover:opacity-80 transition"
            >
              <Users size={20} />
              Usuários
              <ChevronDown size={18} />
            </button>

            {openUsers && (
              <div className="absolute flex flex-col bg-white text-black rounded-lg shadow-lg p-2 mt-2 w-48 z-20">
                <button
                  onClick={() => router.push("/usuario/list")}
                  className="px-3 py-2 text-left hover:bg-purple-100 rounded"
                >
                  Listar Usuários
                </button>
                <button
                  onClick={() => router.push("/usuario/search")}
                  className="px-3 py-2 text-left hover:bg-purple-100 rounded"
                >
                  Pesquisar Usuário
                </button>
                <button
                  onClick={() => router.push("/usuario/edit")}
                  className="px-3 py-2 text-left hover:bg-purple-100 rounded"
                >
                  Editar Usuário
                </button>
                <button
                  onClick={() => router.push("/usuario/view")}
                  className="px-3 py-2 text-left hover:bg-purple-100 rounded"
                >
                  Visualizar Usuário
                </button>
                <button
                  onClick={() => router.push("/usuario/delete")}
                  className="px-3 py-2 text-left hover:bg-purple-100 rounded"
                >
                  Excluir Usuário
                </button>
              </div>
            )}
          </div>

          {/* -------- MENU CALENDÁRIO -------- */}
          <div className="relative">
            <button
              onClick={toggleCalendar}
              className="flex items-center gap-1 hover:opacity-80 transition"
            >
              <CalendarDays size={20} />
              Calendário
              <ChevronDown size={18} />
            </button>

            {openCalendar && (
              <div className="absolute flex flex-col bg-white text-black rounded-lg shadow-lg p-2 mt-2 w-48 z-20">
                <button
                  onClick={() => router.push("/calendario")}
                  className="px-3 py-2 text-left hover:bg-purple-100 rounded"
                >
                  Ver Calendário
                </button>
                <button
                  onClick={() => router.push("/evento/create")}
                  className="px-3 py-2 text-left hover:bg-purple-100 rounded"
                >
                  Criar Evento
                </button>
                <button
                  onClick={() => router.push("/evento/list")}
                  className="px-3 py-2 text-left hover:bg-purple-100 rounded"
                >
                  Gerenciar Eventos
                </button>
              </div>
            )}
          </div>

        </div>

        {/* LOGIN */}
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 bg-purple-600 hover:bg-purple-700 transition rounded-xl shadow-lg flex items-center gap-2"
        >
          <LogIn size={20} /> Entrar
        </button>

      </div>
    </div>
  );
}
