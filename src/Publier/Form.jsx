import React, { useState } from "react";
import axios from "axios";

const CLOUDINARY_CLOUD_NAME = "dlthagffk"; 
const CLOUDINARY_UPLOAD_PRESET = "artconnect_preset"; 
const BACKEND_URL = "http://localhost:3001/oeuvres";

function PublishForm() {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    region: "",
    artist: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [oeuvres, setOeuvres] = useState([]);

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
      setMessage("Error: Please fill in all required fields (*).");
      return;
    }

    setIsSubmitting(true);

    try {
      setMessage("Uploading image to Cloudinary...");
      const cloudinaryFormData = new FormData();
      cloudinaryFormData.append("file", imageFile);
      cloudinaryFormData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      const cloudinaryRes = await axios.post(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        cloudinaryFormData
      );
      
      const imageUrl = cloudinaryRes.data.secure_url;

      setMessage("Saving artwork...");
      const artworkData = {
        titre: formData.title,
        category: formData.category,
        lieu: formData.region,
        artiste: formData.artist,
        description: formData.description,
        image: imageUrl
      };

      
      const backendRes = await axios.post(BACKEND_URL, artworkData, {
        headers: { "Content-Type": "application/json" },
      });

      
      setOeuvres([backendRes.data, ...oeuvres]);

      setMessage("Artwork published successfully! ✨");

      
      setFormData({ title: "", category: "", region: "", artist: "", description: "" });
      setImageFile(null);
      e.target.reset();

    } catch (error) {
      console.error("Error submitting the form:", error);
      setMessage("Error during publication. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');
        
        .page-background {
          background-color: #D0AFA3; 
          padding: 40px 20px;
          font-family: 'itim', serif; 
          color: #55433b;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 30px;
        }

        .form-container {
          background-color: #fdfaf6;
          padding: 40px;
          border-radius: 8px;
          max-width: 700px;
          width: 100%;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .form-container h2 {
          text-align: center;
          font-weight: 500;
          font-size: 28px;
          color: #55433b;
          margin-top: 0;
          margin-bottom: 8px;
        }

        .form-container .subtitle {
          text-align: center;
          margin-bottom: 30px;
          color: #8a7a70;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: bold;
          font-size: 14px;
        }

        input[type="text"],
        select,
        textarea {
          width: 100%;
          padding: 12px;
          border: 1px solid #d1c7bc;
          border-radius: 4px;
          background-color: #fff;
          font-size: 16px;
          font-family: 'itim', serif; 
          color: #55433b;
          box-sizing: border-box; 
        }

        input[type="text"]::placeholder,
        textarea::placeholder {
          color: #aaa;
        }

        select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
          background-position: right 0.7rem center;
          background-repeat: no-repeat;
          background-size: 1.25em;
          padding-right: 2.5rem;
        }

        textarea {
          resize: vertical;
        }

        .form-row {
          display: flex;
          gap: 20px;
        }
        .form-row .form-group {
          flex: 1;
        }

        .file-uploader {
          border: 2px dashed #d1c7bc;
          border-radius: 8px;
          padding: 40px 20px;
          text-align: center;
          background-color: #fdfaf6;
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .file-uploader:hover {
          background-color: #f8f3ed;
          border-color: #c7a159;
        }

        .file-uploader-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: #8a7a70;
          font-weight: bold;
        }

        .file-uploader-label span {
          font-size: 12px;
          font-weight: normal;
          color: #aaa;
        }

        .submit-btn {
          width: 100%;
          padding: 15px;
          border: none;
          border-radius: 4px;
          background-color: #c7a159; 
          color: white;
          font-size: 16px;
          font-weight: bold;
          font-family: 'itim', serif; 
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .submit-btn:hover {
          background-color: #b38f4d;
        }

        .submit-btn:disabled {
          background-color: #aaa;
          cursor: not-allowed;
        }

        .tips-container {
          background-color: #fff9e9;
          border-radius: 8px;
          padding: 20px;
          max-width: 743px;
          width: 100%;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
        }

        .tips-container h4 {
          margin-top: 0;
          font-size: 14px;
          font-weight: bold;
        }

        .tips-container ul {
          padding-left: 20px;
          margin: 0;
          font-size: 14px;
          line-height: 1.6;
        }

        .tips-container li {
          margin-bottom: 5px;
        }
      `}</style>

      <div className="page-background">
        <div className="form-container">
          <h2>Publier une œuvre</h2>
          <p className="subtitle">Partagez une tradition ou œuvre culturelle marocaine</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="artwork-image">Image de l'œuvre *</label>
              <div className="file-uploader">
                <input
                  type="file"
                  id="artwork-image"
                  name="image"
                  hidden
                  onChange={handleFileChange}
                  accept="image/png, image/jpeg"
                />
                <label htmlFor="artwork-image" className="file-uploader-label">
                  {imageFile ? imageFile.name : 'Cliquez pour télécharger ou glissez-déposez'}
                  <span>PNG, JPG ou JPEG (MAX. 5MB)</span>
                </label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="artwork-title">Titre de l'œuvre *</label>
              <input
                type="text"
                id="artwork-title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Ex: Tagine en terre cuite de Fès"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="artwork-category">Catégorie *</label>
                <select id="artwork-category" name="category" value={formData.category} onChange={handleInputChange}>
                  <option value="" disabled>Choisir une catégorie</option>
                  <option value="Poterie">Artisanat</option>
                  <option value="Tapis">Gastronomie</option>
                  <option value="Caftan">Habits</option>
                  <option value="Musique">Musique</option>
                  <option value="Architecture">Architecture</option>
                  <option value="Danse">Danse</option>
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
              <input
                type="text"
                id="artwork-artist"
                name="artist"
                value={formData.artist}
                onChange={handleInputChange}
                placeholder="Nom de l'artiste ou artisan"
              />
            </div>

            <div className="form-group">
              <label htmlFor="artwork-description">Description (optionnel)</label>
              <textarea
                id="artwork-description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="5"
                placeholder="Décrivez l'œuvre, son histoire, sa signification culturelle..."
              ></textarea>
            </div>

            {message && (
              <p style={{
                textAlign: 'center',
                color: message.includes('Error') ? '#D8000C' : '#4F8A10',
                backgroundColor: message.includes('Error') ? '#FFD2D2' : '#DFF2BF',
                padding: '10px',
                borderRadius: '4px',
                marginBottom: '15px'
              }}>
                {message}
              </p>
            )}

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Publishing...' : "Publier l'œuvre"}
            </button>
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
    </>
  );
}

export default PublishForm;
