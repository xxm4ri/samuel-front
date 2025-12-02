"use client";

import { Home, PlusCircle, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";

export default function TopBar() {
  const router = useRouter();

  return (
    <div className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/10 shadow-lg border-b border-white/20 transition-all flex items-center justify-center">
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between p-4 text-white">

        {/* Left */}
        <button
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
          onClick={() => router.push("/")}
        >
          <Home size={22} />
          <span className="font-bold text-lg">Evento</span>
        </button>

        {/* Middle */}
        <button
          onClick={() => router.push("/evento/create")}
          className="px-4 py-2 bg-purple-700 hover:bg-purple-800 transition rounded-xl shadow-lg flex items-center gap-2"
        >
          <PlusCircle size={20} /> Cadastrar Evento
        </button>

        {/* Right */}
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
