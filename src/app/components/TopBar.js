"use client";

import { useState } from "react";
import { Home, Users, PlusCircle, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const router = useRouter();
  const [openUsers, setOpenUsers] = useState(false);

  const toggleUsers = () => {
    setOpenUsers(!openUsers);
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-purple-600 text-white shadow-md border-b border-purple-700 transition-all">
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between p-4">

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

          {/* MENU USUÁRIOS */}
          <div className="relative">
            <button
              onClick={toggleUsers}
              className="flex items-center gap-1 hover:opacity-80 transition"
            >
              <Users size={20} />
              Usuários
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

          {/* CRIAR EVENTO */}
          <button
            onClick={() => router.push("/evento/create")}
            className="flex items-center gap-2 bg-purple-700 hover:bg-purple-800 p-2 rounded-lg transition"
          >
            <PlusCircle size={18} /> Criar Evento
          </button>

        </div>

        {/* LOGIN */}
        <button
          onClick={() => router.push("/login")}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 transition rounded-lg shadow-md flex items-center gap-2"
        >
          <LogIn size={20} /> Entrar
        </button>

      </div>
    </div>
  );
}
