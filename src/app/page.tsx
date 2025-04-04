"use client";

import Image from 'next/image';
import { useState } from 'react';

interface Student {
  name: string;
  email: string;
  class: number;
  period: string;
}

export default function StudentList() {
  const [students, setStudents] = useState<Student[]>(
    Array(10).fill({
      name: 'Full Name',
      email: 'email@edge.ufal.br',
      class: 2,
      period: '5°',
    })
  );
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Controle do modal de filtros
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);

  // Controle do modal de adicionar alunos
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // Estados para o formulário do modal "Adicionar alunos"
  const [newClassName, setNewClassName] = useState('');
  const [startMonth, setStartMonth] = useState('Janeiro');
  const [startYear, setStartYear] = useState('2024');
  const [emails, setEmails] = useState('');

  const handleSort = (key: keyof Student) => {
    const sortedStudents = [...students].sort((a, b) => {
      if (sortOrder === 'asc') {
        return a[key] > b[key] ? 1 : -1;
      } else {
        return a[key] < b[key] ? 1 : -1;
      }
    });
    setStudents(sortedStudents);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Função para lidar com o envio do modal "Adicionar alunos"
  const handleAddStudents = () => {
    // Exemplo de como você poderia lidar com os dados:
    // 1. Fazer parse dos e-mails (separar por vírgula)
    // 2. Criar os novos objetos Student
    // 3. Atualizar o estado 'students'
    //
    // Aqui é só um exemplo simplificado; ajuste conforme a lógica real do seu app:
    const emailList = emails.split(',').map((email) => email.trim());

    // Se quiser criar Students fictícios a partir dos e-mails
    const newStudents = emailList.map((email) => ({
      name: 'Novo Aluno',
      email,
      class: Number(newClassName) || 0,
      period: '1°',
    }));

    // Atualiza a lista de estudantes
    setStudents((prev) => [...prev, ...newStudents]);

    // Fecha o modal e limpa os campos
    setIsAddModalOpen(false);
    setNewClassName('');
    setStartMonth('Janeiro');
    setStartYear('2024');
    setEmails('');
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Navbar */}
      <div className="flex items-center bg-white p-4 rounded shadow gap-4">
        <Image src="/logo.svg" alt="Logo" width={120} height={40} />
        <Image src="/users.svg" alt="Users" width={24} height={24} />
        <h1 className="text-xl font-semibold">Alunos</h1>
        <div className="flex-1"></div>
        <Image
          src="/avatar.svg"
          alt="Avatar"
          width={40}
          height={40}
          className="rounded-full"
        />
      </div>

      {/* Search and actions */}
      <div className="mt-6 flex justify-between items-center">
        <div className="relative w-[79%] h-[40px] border border-[#CBD5E1] p-2 rounded flex items-center">
          <Image
            src="/search.svg"
            alt="Search"
            width={20}
            height={20}
            className="ml-3"
          />
          <input
            type="text"
            placeholder="Busque por um aluno"
            className="w-full h-full p-2 pl-4 border-none outline-none bg-transparent"
          />
        </div>
        <div className="flex gap-4">
          <button
            className="flex items-center gap-2 p-2 bg-white border border-[#E2E8F0] rounded"
            onClick={() => setIsFilterModalOpen(true)}
          >
            <Image src="/filter.svg" alt="Filter" width={20} height={20} />
            Filtros
          </button>
          <button
            className="flex items-center gap-2 p-2 bg-white border border-[#E2E8F0] rounded"
            onClick={() => setIsAddModalOpen(true)}
          >
            <Image src="/user-plus.svg" alt="Add User" width={20} height={20} />
            Adicionar alunos
          </button>
        </div>
      </div>

      {/* Student table */}
      <div className="mt-6 bg-white p-4 rounded shadow">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              {['name', 'class', 'period'].map((key, index) => (
                <th
                  key={index}
                  className="p-2 cursor-pointer"
                  onClick={() => handleSort(key as keyof Student)}
                >
                  {key === 'name'
                    ? 'Nome'
                    : key === 'class'
                    ? 'Turma'
                    : 'Período'}
                  <Image
                    src="/sort.svg"
                    alt="Sort"
                    width={12}
                    height={12}
                    className="inline ml-2"
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {students.map((student, index) => (
              <tr key={index} className="border-b">
                <td className="p-2 flex items-center gap-2">
                  <Image
                    src="/avatar.svg"
                    alt="Avatar"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.email}</p>
                  </div>
                </td>
                <td className="p-2">{student.class}</td>
                <td className="p-2">{student.period}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Filter Modal */}
      {isFilterModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay para fechar o modal clicando fora, se desejar */}
          <div
            className="absolute inset-0"
            onClick={() => setIsFilterModalOpen(false)}
          ></div>

          <div className="relative bg-white w-[500px] rounded-lg shadow-lg p-6">
            {/* Título e subtítulo */}
            <h2 className="text-xl font-semibold">Filtros</h2>
            <p className="text-sm text-gray-500 mt-1">
              Adicione filtros para visualizar apenas os dados relevantes na
              lista de alunos.
            </p>

            {/* Curso */}
            <div className="mt-4">
              <span className="block text-sm font-medium text-gray-700">
                Curso
              </span>
              <div className="flex items-center gap-4 mt-2">
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Ciência da Computação</span>
                </label>
                <label className="flex items-center text-sm">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600"
                  />
                  <span className="ml-2">Engenharia de Computação</span>
                </label>
              </div>
            </div>

            {/* Período de ingresso na UFAL */}
            <div className="mt-4">
              <span className="block text-sm font-medium text-gray-700">
                Período de ingresso na UFAL
              </span>
              <div className="flex items-center gap-2 mt-2">
                <select className="border w-[200px] border-gray-300 rounded p-2 text-sm">
                  <option>Menor que</option>
                  <option>Igual a</option>
                  <option>Maior que</option>
                </select>
                <input
                  type="text"
                  placeholder="2022.2"
                  className="border border-gray-300 rounded p-2 text-sm w-full"
                />
              </div>
            </div>

            {/* Período atual */}
            <div className="mt-4">
              <span className="block text-sm font-medium text-gray-700">
                Período atual
              </span>
              <div className="flex items-center gap-2 mt-2">
                <select className="border w-[200px] border-gray-300 rounded p-2 text-sm">
                  <option>Igual a</option>
                  <option>Menor que</option>
                  <option>Maior que</option>
                </select>
                <input
                  type="text"
                  placeholder="5"
                  className="border border-gray-300 rounded p-2 text-sm w-full"
                />
              </div>
            </div>

            {/* Turma */}
            <div className="mt-4">
              <span className="block text-sm font-medium text-gray-700">Turma</span>
              <div className="mt-2 border border-[#CBD5E1] rounded p-2 flex items-center flex-wrap gap-2">
                <span className="border border-black text-sm px-2 py-1 rounded-full bg-black text-white">
                  Turma 1
                </span>
                <span className="border border-black text-sm px-2 py-1 rounded-full bg-black text-white">
                  Turma 2
                </span>
                <input
                  type="text"
                  placeholder="Procure por uma turma"
                  className="flex-1 outline-none text-sm"
                />
              </div>
              <p className="text-gray-400 text-xs mt-1">Selecione uma ou mais turmas</p>
            </div>

            {/* Footer com botões */}
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setIsFilterModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded text-sm"
              >
                Cancelar
              </button>
              <button className="px-4 py-2 bg-[#0F172A] text-white rounded text-sm">
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Student Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Overlay para fechar o modal clicando fora, se desejar */}
          <div
            className="absolute inset-0 "
            onClick={() => setIsAddModalOpen(false)}
          ></div>

          <div className="relative bg-white w-[500px] rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold">Adicionar alunos</h2>
            <p className="text-sm text-gray-500 mt-1">
              Adicione novos alunos ao programa Edge Academy. Insira abaixo os e-mails do Edge separados por vírgula.
              Insira também o nome da nova turma.
            </p>

            {/* Nome da turma */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome da turma
              </label>
              <input
                type="text"
                value={newClassName}
                onChange={(e) => setNewClassName(e.target.value)}
                className="border border-gray-300 rounded p-2 text-sm w-full"
                placeholder="Ex: Turma 3"
              />
            </div>

            {/* Data de ingresso */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de ingresso
              </label>
              <div className="flex items-center gap-2">
                <select
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                  className="border border-gray-300 rounded p-2 w-[50%] text-sm"
                >
                  <option value="Janeiro">Janeiro</option>
                  <option value="Fevereiro">Fevereiro</option>
                  <option value="Março">Março</option>
                  <option value="Abril">Abril</option>
                  <option value="Maio">Maio</option>
                  <option value="Junho">Junho</option>
                  <option value="Julho">Julho</option>
                  <option value="Agosto">Agosto</option>
                  <option value="Setembro">Setembro</option>
                  <option value="Outubro">Outubro</option>
                  <option value="Novembro">Novembro</option>
                  <option value="Dezembro">Dezembro</option>
                </select>
                <select
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  className="border border-gray-300 rounded p-2 text-sm w-[50%]"
                >
                  <option value="2023">2023</option>
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>
              </div>
            </div>

            {/* E-mails */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mails
              </label>
              <textarea
                value={emails}
                onChange={(e) => setEmails(e.target.value)}
                className="border border-gray-300 rounded p-2 text-sm w-full"
                placeholder="email1@edge.ufal.br, email2@edge.ufal.br"
                rows={4}
              />
            </div>

            {/* Footer com botões */}
            <div className="mt-6 flex justify-end space-x-2">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded text-sm"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddStudents}
                className="px-4 py-2 bg-[#0F172A] text-white rounded text-sm"
              >
                Adicionar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
