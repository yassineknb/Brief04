import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001";

export default function DashboardAdmin() {
  const [activeTab, setActiveTab] = useState("oeuvres");

  const [oeuvres, setOeuvres] = useState([]);
  const [categories, setCategories] = useState([]);
  const [artisans, setArtisans] = useState([]);
  const [evenements, setEvenements] = useState([]);

  const [newOeuvre, setNewOeuvre] = useState({ titre: "", category: "", description: "", lieu: "", image: "" });
  const [newCategory, setNewCategory] = useState({ nom: "" });
  const [newArtisan, setNewArtisan] = useState({ nom: "", specialite: "", region: "" });
  const [newEvenement, setNewEvenement] = useState({ titre: "", date: "", lieu: "", image: "" });

  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const handleInputChange = (e, setState) => {
    const { name, value } = e.target;
    setState(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [oeuvresRes, categoriesRes, artisansRes, evenementsRes] = await Promise.all([
          axios.get(`${API_URL}/oeuvres`),
          axios.get(`${API_URL}/categories`),
          axios.get(`${API_URL}/artisans`),
          axios.get(`${API_URL}/evenements`),
        ]);
        setOeuvres(oeuvresRes.data.reverse());
        setCategories(categoriesRes.data);
        setArtisans(artisansRes.data);
        setEvenements(evenementsRes.data.reverse());
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    fetchData();
  }, []);

  const handleAddItem = async (endpoint, newItem, setItems, resetState, requiredField, reverse = false) => {
    if (requiredField && !newItem[requiredField].trim()) {
      alert(`Le champ "${requiredField}" est requis.`);
      return;
    }
    try {
      const res = await axios.post(`${API_URL}/${endpoint}`, newItem);
      if (reverse) {
        setItems(prevItems => [res.data, ...prevItems]);
      } else {
        setItems(prevItems => [...prevItems, res.data]);
      }
      resetState();
    } catch (err) {
      console.error(`Error adding ${endpoint}:`, err);
    }
  };

  const handleDeleteItem = async (endpoint, id, setItems) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer cet élément?`)) return;
    try {
      await axios.delete(`${API_URL}/${endpoint}/${id}`);
      setItems(prevItems => prevItems.filter(item => item.id !== id));
    } catch (err) {
      console.error(`Error deleting ${endpoint}:`, err);
    }
  };

  const handleAddOeuvre = async () => {
    if (!newOeuvre.titre || !newOeuvre.image) {
      alert("Le titre et l'URL de l'image sont requis.");
      return;
    }
    try {
      const res = await axios.post(`${API_URL}/oeuvres`, newOeuvre);
      setOeuvres(prev => [res.data, ...prev]);
      setNewOeuvre({ titre: "", category: "", description: "", lieu: "", image: "" });
    } catch (err) { console.error("Error adding oeuvre:", err); }
  };

  const handleUpdateOeuvre = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/oeuvres/${editingId}`, editFormData);
      setOeuvres(oeuvres.map((o) => (o.id === editingId ? editFormData : o)));
      setEditingId(null);
    } catch (err) { console.error("Error updating oeuvre:", err); }
  };

  const handleEditClick = (oeuvre) => { setEditingId(oeuvre.id); setEditFormData(oeuvre); };
  const handleCancelEdit = () => setEditingId(null);

  const renderOeuvresTab = () => (
    <>
      <h3>Gestion Des Œuvres</h3>
      <div className="filters">
        <input type="text" name="titre" placeholder="Titre" value={newOeuvre.titre} onChange={(e) => handleInputChange(e, setNewOeuvre)} />
        <select name="category" value={newOeuvre.category} onChange={(e) => handleInputChange(e, setNewOeuvre)}>
            <option value="">Choisir catégorie...</option>
            {categories.map(cat => <option key={cat.id} value={cat.nom}>{cat.nom}</option>)}
        </select>
        <input type="text" name="description" placeholder="Description" value={newOeuvre.description} onChange={(e) => handleInputChange(e, setNewOeuvre)} />
        <input type="text" name="lieu" placeholder="Région" value={newOeuvre.lieu} onChange={(e) => handleInputChange(e, setNewOeuvre)} />
        <input type="text" name="image" placeholder="URL de l'image" value={newOeuvre.image} onChange={(e) => handleInputChange(e, setNewOeuvre)} />
        <button className="add-btn" onClick={handleAddOeuvre}>Ajouter</button>
      </div>
      <div className="cards">{oeuvres.map((item) => (<React.Fragment key={item.id}>{ editingId === item.id ? (
        <form onSubmit={handleUpdateOeuvre} className="card card-form">
          <input type="text" name="titre" value={editFormData.titre} onChange={(e) => handleInputChange(e, setEditFormData)} />
          <select name="category" value={editFormData.category} onChange={(e) => handleInputChange(e, setEditFormData)}>{categories.map(cat => <option key={cat.id} value={cat.nom}>{cat.nom}</option>)}</select>
          <textarea name="description" value={editFormData.description} onChange={(e) => handleInputChange(e, setEditFormData)} />
          <input type="text" name="lieu" value={editFormData.lieu} onChange={(e) => handleInputChange(e, setEditFormData)} />
          <input type="text" name="image" value={editFormData.image} onChange={(e) => handleInputChange(e, setEditFormData)} />
          <div className="form-actions">
            <button type="submit" className="save-btn">Enregistrer</button>
            <button type="button" onClick={handleCancelEdit} className="cancel-btn">Annuler</button>
          </div>
        </form>
      ) : (
        <div className="card"><img src={item.image} alt={item.titre} /><div className="card-body"><h4>{item.titre}</h4><p>{item.category} - {item.lieu}</p><div className="admin-actions"><button className="edit" onClick={() => handleEditClick(item)}>Modifier</button><button className="delete" onClick={() => handleDeleteItem('oeuvres', item.id, setOeuvres)}>Supprimer</button></div></div></div>
      )}</React.Fragment>))}</div>
    </>
  );

  const renderCategoriesTab = () => (
    <>
      <h3>Gestion des Catégories</h3>
      <div className="simple-manager">
        <div className="simple-add-form">
          <input type="text" name="nom" placeholder="Nom de la nouvelle catégorie" value={newCategory.nom} onChange={(e) => handleInputChange(e, setNewCategory)} />
          <button className="add-btn" onClick={() => handleAddItem('categories', newCategory, setCategories, () => setNewCategory({nom:''}), 'nom')}>Ajouter</button>
        </div>
        <ul className="simple-list">{categories.map(cat => (<li key={cat.id}><span>{cat.nom}</span><button className="delete" onClick={() => handleDeleteItem('categories', cat.id, setCategories)}>Supprimer</button></li>))}</ul>
      </div>
    </>
  );

  const renderArtisansTab = () => (
    <>
      <h3>Gestion des Artisans</h3>
      <div className="simple-manager">
        {/* Removed .grid-3 class from here */}
        <div className="simple-add-form">
          <input type="text" name="nom" placeholder="Nom de l'artisan" value={newArtisan.nom} onChange={(e) => handleInputChange(e, setNewArtisan)} />
          <input type="text" name="specialite" placeholder="Spécialité" value={newArtisan.specialite} onChange={(e) => handleInputChange(e, setNewArtisan)} />
          <input type="text" name="region" placeholder="Région" value={newArtisan.region} onChange={(e) => handleInputChange(e, setNewArtisan)} />
          <button className="add-btn" onClick={() => handleAddItem('artisans', newArtisan, setArtisans, () => setNewArtisan({ nom: "", specialite: "", region: "" }), 'nom')}>Ajouter</button>
        </div>
        <ul className="simple-list">{artisans.map(art => (<li key={art.id}><span><strong>{art.nom}</strong> ({art.specialite} - {art.region})</span><button className="delete" onClick={() => handleDeleteItem('artisans', art.id, setArtisans)}>Supprimer</button></li>))}</ul>
      </div>
    </>
  );

  const renderEvenementsTab = () => (
    <>
      <h3>Gestion des Événements</h3>
      {/* Removed .grid-4 class from here */}
      <div className="simple-add-form">
        <input type="text" name="titre" placeholder="Titre de l'événement" value={newEvenement.titre} onChange={(e) => handleInputChange(e, setNewEvenement)} />
        <input type="date" name="date" placeholder="Date" value={newEvenement.date} onChange={(e) => handleInputChange(e, setNewEvenement)} />
        <input type="text" name="lieu" placeholder="Lieu" value={newEvenement.lieu} onChange={(e) => handleInputChange(e, setNewEvenement)} />
        <input type="text" name="image" placeholder="URL de l'image" value={newEvenement.image} onChange={(e) => handleInputChange(e, setNewEvenement)} />
        <button className="add-btn" onClick={() => handleAddItem('evenements', newEvenement, setEvenements, () => setNewEvenement({ titre: "", date: "", lieu: "", image: "" }), 'titre', true)}>Ajouter</button>
      </div>
      <div className="cards">
        {evenements.map(evt => (
          <div key={evt.id} className="card">
            <img src={evt.image} alt={evt.titre} />
            <div className="card-body">
              <h4>{evt.titre}</h4>
              <p>{evt.lieu} - {new Date(evt.date).toLocaleDateString('fr-FR', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              <div className="admin-actions">
                <button className="delete" onClick={() => handleDeleteItem('evenements', evt.id, setEvenements)}>Supprimer</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );

  return (
    <div className="dashboard-admin">
      <section className="page-title"><h2>Tableau de bord Admin</h2></section>
      <div className="tabs-container">
        <div className="tabs">
          <button className={activeTab === "oeuvres" ? "active" : ""} onClick={() => setActiveTab("oeuvres")}>Œuvres</button>
          <button className={activeTab === "categories" ? "active" : ""} onClick={() => setActiveTab("categories")}>Catégories</button>
          <button className={activeTab === "artisans" ? "active" : ""} onClick={() => setActiveTab("artisans")}>Artisans</button>
          <button className={activeTab === "evenements" ? "active" : ""} onClick={() => setActiveTab("evenements")}>Événements</button>
        </div>
      </div>
      <section className="content">
        {activeTab === 'oeuvres' && renderOeuvresTab()}
        {activeTab === 'categories' && renderCategoriesTab()}
        {activeTab === 'artisans' && renderArtisansTab()}
        {activeTab === 'evenements' && renderEvenementsTab()}
      </section>

      <style>{`
   body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    background-color: #DDC6BC;
    color: #4B3B34;
}

.dashboard-admin {
    padding: 20px;
}

.page-title {
    text-align: center;
    padding: 10px 20px 20px 20px;
    font-weight: 500;
}

.tabs-container {
    max-width: fit-content;
    margin: 0 auto 30px auto;
    background: white;
    border-radius: 12px;
    padding: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.tabs {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
}

.tabs button {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    background: transparent;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    color: #555;
    transition: background-color 0.3s, color 0.3s;
}

.tabs button.active {
    background: #C5A46D;
    color: #4B3B34;
    font-weight: 600;
}

.content {
    background: #C1A093;
    border-radius: 10px;
    padding: 30px;
    max-width: 1200px;
    margin: auto;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.content h3 {
    text-align: center;
    margin-bottom: 30px;
    font-size: 24px;
    font-weight: 600;
}

.filters {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-bottom: 30px;
}

.filters input,
.filters select {
    padding: 12px;
    border: 1px solid #D0AFA3;
    border-radius: 8px;
    background: #D0AFA3;
    color: #4B3B34;
    font-size: 14px;
}

.filters input::placeholder {
    color: #6B4B3E;
}

.add-btn {
    background: #A2674C;
    color: #fff;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
    padding: 20px;
}

.cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 30px;
}

.card {
    background: #fff;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
}

.card img {
    width: 100%;
    height: 200px;
    object-fit: cover;
}

.card-body {
    padding: 20px;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
}

.card-body h4 {
    margin: 0 0 5px 0;
    font-size: 18px;
}

.card-body p {
    margin: 0;
    font-size: 14px;
    color: #6B4B3E;
}

.admin-actions {
    display: flex;
    gap: 10px;
    margin-top: auto;
    padding-top: 15px;
}

.edit,
.delete {
    border: none;
    padding: 6px 14px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 500;
}

.edit {
    background: #EAE0D5;
    color: #4B3B34;
}

.delete {
    background: #DDC6BC;
    color: #4B3B34;
}

.card-form {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.card-form input,
.card-form textarea,
.card-form select {
    width: 100%;
    padding: 10px;
    border-radius: 6px;
    border: 1px solid #ccc;
    background-color: #f9f9f9;
    box-sizing: border-box;
}

.card-form textarea {
    min-height: 80px;
    resize: vertical;
}

.form-actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.form-actions button {
    flex-grow: 1;
    padding: 10px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-weight: bold;
}

.save-btn {
    background-color: #A2674C;
    color: white;
}

.cancel-btn {
    background-color: #EAE0D5;
    color: #4B3B34;
}

.simple-manager {
    max-width: 1000px;
    margin: auto;
}

.simple-add-form {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 25px;
    align-items: center;
}

.simple-add-form input {
    flex: 1;
    min-width: 180px;
    padding: 12px;
    border: 1px solid #D0AFA3;
    border-radius: 8px;
    background: #D0AFA3;
    color: #4B3B34;
    font-size: 14px;
}

.simple-add-form input::placeholder {
    color: #6B4B3E;
}

.simple-list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    list-style: none;
    padding: 0;
    margin: 0;
}

.simple-list li {
    background-color: #EAE0D5;
    padding: 12px 15px;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
}

.simple-list li span {
    font-weight: 500;
}

      `}</style>
    </div>
  );
}