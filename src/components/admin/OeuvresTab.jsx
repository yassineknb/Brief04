// src/components/admin/OeuvresTab.jsx

import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../context/GlobalContext';

const API_URL = "http://localhost:3001";
const CLOUDINARY_CLOUD_NAME = "dpfoy4wb4";
const CLOUDINARY_UPLOAD_PRESET = "artconnect_preset";

const OeuvresTab = () => {
  const { oeuvres, categories, addOeuvre, deleteOeuvre, updateOeuvre } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [newOeuvre, setNewOeuvre] = useState({ titre: "", category: "", description: "", lieu: "" });
  const [newOeuvreImage, setNewOeuvreImage] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [editImageFile, setEditImageFile] = useState(null);
  const newOeuvreFileRef = useRef(null);

  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  const uploadToCloudinary = async (file) => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);
    try {
      const res = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, formData);
      return res.data.secure_url;
    } catch (err) { console.error("Cloudinary upload failed:", err); alert("L'upload a échoué."); return null; }
  };

  const handleAddOeuvre = async () => {
    if (!newOeuvre.titre || !newOeuvreImage) return alert("Le titre et l'image sont requis.");
    setLoading(true);
    const imageUrl = await uploadToCloudinary(newOeuvreImage);
    if (imageUrl) {
      try {
        const res = await axios.post(`${API_URL}/oeuvres`, { ...newOeuvre, image: imageUrl });
        addOeuvre(res.data);
        setNewOeuvre({ titre: "", category: "", description: "", lieu: "" });
        setNewOeuvreImage(null);
        if (newOeuvreFileRef.current) newOeuvreFileRef.current.value = null;
      } catch (err) { console.error("Error adding oeuvre:", err); }
    }
    setLoading(false);
  };
  
  const handleEditClick = (item) => { setEditingId(item.id); setEditFormData(item); };
  const handleCancelEdit = () => { setEditingId(null); setEditImageFile(null); };

  const handleUpdateOeuvre = async (e) => {
    e.preventDefault();
    setLoading(true);
    let updatedData = { ...editFormData };
    if (editImageFile) {
      const imageUrl = await uploadToCloudinary(editImageFile);
      if (imageUrl) updatedData.image = imageUrl;
    }
    try {
      const res = await axios.put(`${API_URL}/oeuvres/${editingId}`, updatedData);
      updateOeuvre(res.data);
      handleCancelEdit();
    } catch (err) { console.error("Error updating oeuvre:", err); }
    setLoading(false);
  };
  
  const handleDelete = async (id) => {
    if (!window.confirm(`Êtes-vous sûr ?`)) return;
    try {
      await axios.delete(`${API_URL}/oeuvres/${id}`);
      deleteOeuvre(id);
    } catch (err) { console.error(`Error deleting oeuvre:`, err); }
  };

  return (
    <>
      <h3>Gestion Des Œuvres</h3>
      <div className="filters">
        <input type="text" name="titre" placeholder="Titre" value={newOeuvre.titre} onChange={(e) => handleInputChange(e, setNewOeuvre)} />
        <select name="category" value={newOeuvre.category} onChange={(e) => handleInputChange(e, setNewOeuvre)}>
          <option value="">Choisir catégorie...</option>
          {categories.map(cat => <option key={cat.id} value={cat.nom}>{cat.nom}</option>)}
        </select>
        <input type="text" name="lieu" placeholder="Région" value={newOeuvre.lieu} onChange={(e) => handleInputChange(e, setNewOeuvre)} />
        <textarea name="description" placeholder="Description" value={newOeuvre.description} onChange={(e) => handleInputChange(e, setNewOeuvre)} style={{gridColumn: "span 2"}}/>
        <div className="file-input-wrapper">
          <label htmlFor="new-oeuvre-image">{newOeuvreImage ? newOeuvreImage.name : "Choisir une image..."}</label>
          <input type="file" id="new-oeuvre-image" ref={newOeuvreFileRef} onChange={(e) => setNewOeuvreImage(e.target.files[0])} />
        </div>
        <button className="add-btn" onClick={handleAddOeuvre} disabled={loading}>{loading ? 'Ajout...' : 'Ajouter'}</button>
      </div>
      <div className="cards">{oeuvres.map((item) => (<React.Fragment key={item.id}>{ editingId === item.id ? (
        <form onSubmit={handleUpdateOeuvre} className="card card-form">
          <div className="file-input-wrapper"><label htmlFor="edit-oeuvre-image">{editImageFile ? editImageFile.name : "Changer l'image (optionnel)"}</label><input type="file" id="edit-oeuvre-image" onChange={(e) => setEditImageFile(e.target.files[0])} /></div>
          <input type="text" name="titre" value={editFormData.titre} onChange={(e) => handleInputChange(e, setEditFormData)} />
          <select name="category" value={editFormData.category} onChange={(e) => handleInputChange(e, setEditFormData)}>{categories.map(cat => <option key={cat.id} value={cat.nom}>{cat.nom}</option>)}</select>
          <textarea name="description" value={editFormData.description} onChange={(e) => handleInputChange(e, setEditFormData)} />
          <input type="text" name="lieu" value={editFormData.lieu} onChange={(e) => handleInputChange(e, setEditFormData)} />
          <div className="form-actions"><button type="submit" className="save-btn" disabled={loading}>{loading ? 'Sauvegarde...' : 'Enregistrer'}</button><button type="button" onClick={handleCancelEdit} className="cancel-btn">Annuler</button></div>
        </form>
      ) : (
        <div className="card"><img src={item.image} alt={item.titre} /><div className="card-body"><h4>{item.titre}</h4><p>{item.category} - {item.lieu}</p><div className="admin-actions"><button className="edit" onClick={() => handleEditClick(item)}>Modifier</button><button className="delete" onClick={() => handleDelete(item.id)}>Supprimer</button></div></div></div>
      )}</React.Fragment>))}</div>
    </>
  );
};

export default OeuvresTab;