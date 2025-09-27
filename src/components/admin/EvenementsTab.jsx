// src/components/admin/EvenementsTab.jsx

import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useGlobalContext } from '../../context/GlobalContext';

const API_URL = "http://localhost:3001";
const CLOUDINARY_CLOUD_NAME = "dpfoy4wb4";
const CLOUDINARY_UPLOAD_PRESET = "artconnect_preset";

const EvenementsTab = () => {
  const { evenements, addEvenement, deleteEvenement } = useGlobalContext();
  const [loading, setLoading] = useState(false);
  const [newEvenement, setNewEvenement] = useState({ titre: "", date: "", lieu: "" });
  const [newEvenementImage, setNewEvenementImage] = useState(null);
  const newEventFileRef = useRef(null);
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvenement(prev => ({ ...prev, [name]: value }));
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
    if (!newEvenement.titre || !newEvenementImage) return alert("Le titre et l'image sont requis.");
    setLoading(true);
    const imageUrl = await uploadToCloudinary(newEvenementImage);
    if (imageUrl) {
      try {
        const res = await axios.post(`${API_URL}/evenements`, { ...newEvenement, image: imageUrl });
        addEvenement(res.data);
        setNewEvenement({ titre: "", date: "", lieu: "" });
        setNewEvenementImage(null);
        if (newEventFileRef.current) newEventFileRef.current.value = null;
      } catch (err) { console.error("Error adding event:", err); }
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Êtes-vous sûr ?`)) return;
    try {
      await axios.delete(`${API_URL}/evenements/${id}`);
      deleteEvenement(id);
    } catch (err) { console.error(`Error deleting event:`, err); }
  };

  return (
    <>
      <h3>Gestion des Événements</h3>
      <div className="simple-add-form">
        <input type="text" name="titre" placeholder="Titre" value={newEvenement.titre} onChange={handleInputChange} />
        <input type="date" name="date" value={newEvenement.date} onChange={handleInputChange} />
        <input type="text" name="lieu" placeholder="Lieu" value={newEvenement.lieu} onChange={handleInputChange} />
        <div className="file-input-wrapper">
          <label htmlFor="new-event-image">{newEvenementImage ? newEvenementImage.name : "Choisir une image..."}</label>
          <input type="file" id="new-event-image" ref={newEventFileRef} onChange={(e) => setNewEvenementImage(e.target.files[0])} />
        </div>
        <button className="add-btn" onClick={handleAdd} disabled={loading}>{loading ? 'Ajout...' : 'Ajouter'}</button>
      </div>
      <div className="cards">{evenements.map(evt => (<div key={evt.id} className="card"><img src={evt.image} alt={evt.titre} /><div className="card-body"><h4>{evt.titre}</h4><p>{evt.lieu} - {new Date(evt.date).toLocaleDateString('fr-FR')}</p><div className="admin-actions"><button className="delete" onClick={() => handleDelete(evt.id)}>Supprimer</button></div></div></div>))}</div>
    </>
  );
};

export default EvenementsTab;