// src/components/publier/Form.jsx

import React, { useState } from "react";
import axios from "axios";
import "./Form.css";
import { useGlobalContext } from "../../context/GlobalContext";

const CLOUDINARY_CLOUD_NAME = "dpfoy4wb4";
const CLOUDINARY_UPLOAD_PRESET = "artconnect_preset";
const BACKEND_URL = "http://localhost:3001/oeuvres";

function PublishForm() {
  const { categories, addOeuvre } = useGlobalContext();
  const [formData, setFormData] = useState({ title: "", category: "", region: "", artist: "", description: "" });
  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!imageFile || !formData.title || !formData.category || !formData.region) {
      setMessage("Erreur : Veuillez remplir tous les champs obligatoires (*).");
      return;
    }

    setIsSubmitting(true);
    try {
      setMessage("Téléchargement de l'image...");
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", imageFile);
      cloudinaryFormData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const cloudinaryRes = await axios.post(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, cloudinaryFormData);
      const imageUrl = cloudinaryRes.data.secure_url;

      setMessage("Enregistrement de l'œuvre...");
      const artworkData = {
        titre: formData.title,
        category: formData.category,
        lieu: formData.region,
        artiste: formData.artist,
        description: formData.description,
        image: imageUrl
      };

      const backendRes = await axios.post(BACKEND_URL, artworkData);
      
      addOeuvre(backendRes.data); // <-- MISE À JOUR DE L'ÉTAT GLOBAL

      setMessage("Œuvre publiée avec succès ! ✨");
      setFormData({ title: "", category: "", region: "", artist: "", description: "" });
      setImageFile(null);
      e.target.reset();

    } catch (error) {
      console.error("Error submitting the form:", error);
      setMessage("Erreur durant la publication. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-background">
      <div className="form-container">
        <h2>Publier une œuvre</h2>
        <p className="subtitle">Partagez une tradition ou œuvre culturelle marocaine</p>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="artwork-image">Image de l'œuvre *</label>
              <div className="file-uploader">
                <input type="file" id="artwork-image" name="image" hidden onChange={handleFileChange} accept="image/png, image/jpeg"/>
                <label htmlFor="artwork-image" className="file-uploader-label">
                  {imageFile ? imageFile.name : 'Cliquez pour télécharger ou glissez-déposez'}
                  <span>PNG, JPG ou JPEG (MAX. 5MB)</span>
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="artwork-title">Titre de l'œuvre *</label>
              <input type="text" id="artwork-title" name="title" value={formData.title} onChange={handleInputChange} placeholder="Ex: Tagine en terre cuite de Fès"/>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="artwork-category">Catégorie *</label>
                <select id="artwork-category" name="category" value={formData.category} onChange={handleInputChange}>
                  <option value="" disabled>Choisir une catégorie</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.nom}>{cat.nom}</option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="artwork-region">Région *</label>
                <select id="artwork-region" name="region" value={formData.region} onChange={handleInputChange}>
                  <option value="" disabled>Choisir une région</option>
                  <option value="Marrakech-Safi">Marrakech-Safi</option>
                  <option value="Fès-Meknès">Fès-Meknès</option>
                  <option value="Rabat-Salé-Kénitra">Rabat-Salé-Kénitra</option>
                  <option value="Souss-Massa">Souss-Massa</option>
                  <option value="Tanger-Tétouan-Al Hoceïma">Tanger-Tétouan-Al Hoceïma</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="artwork-artist">Artiste / Créateur (optionnel)</label>
              <input type="text" id="artwork-artist" name="artist" value={formData.artist} onChange={handleInputChange} placeholder="Nom de l'artiste ou artisan"/>
            </div>
            <div className="form-group">
              <label htmlFor="artwork-description">Description</label>
              <textarea id="artwork-description" name="description" value={formData.description} onChange={handleInputChange} rows="5" placeholder="Décrivez l'œuvre, son histoire..."></textarea>
            </div>
            {message && (<p style={{ textAlign: 'center', color: message.includes('Erreur') ? '#D8000C' : '#4F8A10', backgroundColor: message.includes('Erreur') ? '#FFD2D2' : '#DFF2BF', padding: '10px', borderRadius: '4px', marginBottom: '15px' }}>{message}</p>)}
            <button type="submit" className="submit-btn" disabled={isSubmitting}>{isSubmitting ? 'Publication en cours...' : "Publier l'œuvre"}</button>
        </form>
      </div>
      <div className="tips-container">
        <h4>CONSEILS POUR UNE BONNE PUBLICATION :</h4>
        <ul>
            <li>Utilisez une image de haute qualité</li>
            <li>Rédigez une description claire et concise</li>
            <li>Ajoutez des détails sur l'origine et la signification</li>
            <li>Respectez les droits d'auteur des images</li>
        </ul>
      </div>
    </div>
  );
}

export default PublishForm;