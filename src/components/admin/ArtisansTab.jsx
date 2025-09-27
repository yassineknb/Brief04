// src/components/admin/ArtisansTab.jsx

import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../context/GlobalContext';

const API_URL = "http://localhost:3001";
const CLOUDINARY_CLOUD_NAME = "dpfoy4wb4";
const CLOUDINARY_UPLOAD_PRESET = "artconnect_preset";

const ArtisansTab = () => {
  const { artisans, addArtisan, deleteArtisan, updateArtisan, setFeaturedArtisan } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  
  const [newArtisan, setNewArtisan] = useState({ nom: "", specialite: "", region: "", description: "" });
  const [newArtisanImage, setNewArtisanImage] = useState(null);
  
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});
  const [editImageFile, setEditImageFile] = useState(null);

  const newArtisanFileRef = useRef(null);

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

  const handleAdd = async () => {
    if (!newArtisan.nom || !newArtisanImage) return alert("Le nom et l'image sont requis.");
    setLoading(true);
    const imageUrl = await uploadToCloudinary(newArtisanImage);
    if (imageUrl) {
      try {
        const res = await axios.post(`${API_URL}/artisans`, { ...newArtisan, image: imageUrl, featured: false });
        addArtisan(res.data);
        setNewArtisan({ nom: "", specialite: "", region: "", description: "" });
        setNewArtisanImage(null);
        if (newArtisanFileRef.current) newArtisanFileRef.current.value = null;
      } catch (err) { console.error("Error adding artisan:", err); }
    }
    setLoading(false);
  };
  
  const handleEditClick = (item) => { setEditingId(item.id); setEditFormData(item); };
  const handleCancelEdit = () => { setEditingId(null); setEditImageFile(null); };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    let updatedData = { ...editFormData };
    if (editImageFile) {
      const imageUrl = await uploadToCloudinary(editImageFile);
      if (imageUrl) updatedData.image = imageUrl;
    }
    try {
      const res = await axios.put(`${API_URL}/artisans/${editingId}`, updatedData);
      updateArtisan(res.data);
      handleCancelEdit();
    } catch (err) { console.error("Error updating artisan:", err); }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Êtes-vous sûr ?`)) return;
    try {
      await axios.delete(`${API_URL}/artisans/${id}`);
      deleteArtisan(id);
    } catch (err) { console.error(`Error deleting artisan:`, err); }
  };

  const handleSetFeatured = async (artisanToFeature) => {
    setLoading(true);
    const currentFeatured = artisans.find(a => a.featured);
    try {
      // Mettre l'ancien artisan "featured" à false
      if (currentFeatured && currentFeatured.id !== artisanToFeature.id) {
        await axios.patch(`${API_URL}/artisans/${currentFeatured.id}`, { featured: false });
      }
      // Mettre le nouvel artisan "featured" à true
      await axios.patch(`${API_URL}/artisans/${artisanToFeature.id}`, { featured: true });
      // Mettre à jour l'état global
      setFeaturedArtisan(artisanToFeature.id);
      alert(`${artisanToFeature.nom} est maintenant l'artisan du mois !`);
    } catch (err) {
      console.error("Error setting featured artisan:", err);
    }
    setLoading(false);
  };

  return (
    <>
      <h3>Gestion des Artisans</h3>
      {/* Formulaire d'ajout */}
      <div className="filters">
        <input type="text" name="nom" placeholder="Nom" value={newArtisan.nom} onChange={(e) => handleInputChange(e, setNewArtisan)} />
        <input type="text" name="specialite" placeholder="Spécialité" value={newArtisan.specialite} onChange={(e) => handleInputChange(e, setNewArtisan)} />
        <input type="text" name="region" placeholder="Région" value={newArtisan.region} onChange={(e) => handleInputChange(e, setNewArtisan)} />
        <textarea name="description" placeholder="Description" value={newArtisan.description} onChange={(e) => handleInputChange(e, setNewArtisan)} />
        <div className="file-input-wrapper">
          <label htmlFor="new-artisan-image">{newArtisanImage ? newArtisanImage.name : "Choisir une image..."}</label>
          <input type="file" id="new-artisan-image" ref={newArtisanFileRef} onChange={(e) => setNewArtisanImage(e.target.files[0])} />
        </div>
        <button className="add-btn" onClick={handleAdd} disabled={loading}>{loading ? 'Ajout...' : 'Ajouter'}</button>
      </div>

      {/* Liste des artisans */}
      <div className="cards">
        {artisans.map(item => ( editingId === item.id ? (
          <form key={item.id} onSubmit={handleUpdate} className="card card-form">
            {/* ... Formulaire d'édition ... */}
          </form>
        ) : (
          <div key={item.id} className="card">
            {item.featured && <div className="featured-badge">Artisan du mois</div>}
            <img src={item.image} alt={item.nom} />
            <div className="card-body">
              <h4>{item.nom}</h4>
              <p>{item.specialite} - {item.region}</p>
              <p className="description">{item.description}</p>
              <div className="admin-actions">
                <button className="edit" onClick={() => handleEditClick(item)}>Modifier</button>
                <button className="delete" onClick={() => handleDelete(item.id)}>Supprimer</button>
                {!item.featured && <button className="feature-btn" onClick={() => handleSetFeatured(item)} disabled={loading}>Mettre en avant</button>}
              </div>
            </div>
          </div>
        )))}
      </div>
    </>
  );
};

export default ArtisansTab;