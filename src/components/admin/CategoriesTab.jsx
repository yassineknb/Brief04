// src/components/admin/CategoriesTab.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../context/GlobalContext';

const API_URL = "http://localhost:3001";

const CategoriesTab = () => {
  const { categories, addCategory, deleteCategory } = useGlobalContext();
  const [newCategory, setNewCategory] = useState({ nom: "" });

  const handleAdd = async () => {
    if (!newCategory.nom.trim()) return alert("Le nom de la catégorie est requis.");
    try {
      const res = await axios.post(`${API_URL}/categories`, newCategory);
      addCategory(res.data);
      setNewCategory({ nom: "" });
    } catch (err) { console.error("Error adding category:", err); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Êtes-vous sûr ?`)) return;
    try {
      await axios.delete(`${API_URL}/categories/${id}`);
      deleteCategory(id);
    } catch (err) { console.error(`Error deleting category:`, err); }
  };

  return (
    <>
      <h3>Gestion des Catégories</h3>
      <div className="simple-manager">
        <div className="simple-add-form">
          <input type="text" name="nom" placeholder="Nom de la nouvelle catégorie" value={newCategory.nom} onChange={(e) => setNewCategory({ nom: e.target.value })} />
          <button className="add-btn" onClick={handleAdd}>Ajouter</button>
        </div>
        <ul className="simple-list">{categories.map(cat => (<li key={cat.id}><span>{cat.nom}</span><button className="delete" onClick={() => handleDelete(cat.id)}>Supprimer</button></li>))}</ul>
      </div>
    </>
  );
};

export default CategoriesTab;