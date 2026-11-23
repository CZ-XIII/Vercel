"use client";

import { useEffect, useState } from "react";

type Name = {
  id: number;
  name: string;
};

export default function Home() {
  const [names, setNames] = useState<Name[]>([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  const getNames = async () => {
    const response = await fetch("/api/names");
    const data = await response.json();
    setNames(data);
  };

  useEffect(() => {
    getNames();
  }, []);

  const handleSubmit = async () => {
    if (name.trim() === "") return;

    if (editId !== null) {
      await fetch(`/api/names/${editId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
    } else {
      await fetch("/api/names", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });
    }

    setName("");
    setEditId(null);
    getNames();
  };

  const handleEdit = (item: Name) => {
    setName(item.name);
    setEditId(item.id);
  };

  const handleDelete = async (id: number) => {
    await fetch(`/api/names/${id}`, {
      method: "DELETE",
    });

    getNames();
  };

  return (
    <main>
      <h1>Daftar Nama</h1>

      <input
        type="text"
        placeholder="Masukkan nama"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <button onClick={handleSubmit}>
        {editId !== null ? "Update" : "Tambah"}
      </button>

      <h2>Data Nama</h2>

      {names.map((item) => (
        <div key={item.id}>
          {item.id}. {item.name}{" "}
          <button onClick={() => handleEdit(item)}>Edit</button>
          <button onClick={() => handleDelete(item.id)}>Hapus</button>
        </div>
      ))}
    </main>
  );
}
