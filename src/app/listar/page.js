"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function ListaUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:3000/usuario/list");
        setUsuarios(response.data);
      } catch (err) {
        setError("Erro ao carregar usuários");
      } finally {
        setLoading(false);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-200 to-purple-400 p-8 pt-24">
      <h1 className="text-2xl font-bold mb-6 text-purple-700 text-center">Lista de Usuários</h1>

      {loading && <p className="text-center">Carregando...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg shadow-md">
            <thead>
              <tr className="bg-purple-600 text-white">
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">Nome</th>
                <th className="py-2 px-4 text-left">Email</th>
                <th className="py-2 px-4 text-left">CPF</th>
                <th className="py-2 px-4 text-left">Telefone</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((usuario) => (
                <tr key={usuario.id} className="border-b hover:bg-purple-100">
                  <td className="py-2 px-4">{usuario.id}</td>
                  <td className="py-2 px-4">{usuario.nome}</td>
                  <td className="py-2 px-4">{usuario.email}</td>
                  <td className="py-2 px-4">{usuario.cpf}</td>
                  <td className="py-2 px-4">{usuario.telefone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
