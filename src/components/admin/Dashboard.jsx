// src/components/admin/Dashboard.jsx

import React, { useState } from "react";
import "./Dashboard.css";
import { useGlobalContext } from "../../context/GlobalContext";

// Import des nouveaux composants d'onglets
import OeuvresTab from './OeuvresTab';
import CategoriesTab from './CategoriesTab';
import ArtisansTab from './ArtisansTab';
import EvenementsTab from './EvenementsTab';

export default function DashboardAdmin() {
  const { loading: globalLoading } = useGlobalContext();
  const [activeTab, setActiveTab] = useState("oeuvres");

  if (globalLoading) {
    return <p className="text-center py-20">Chargement du tableau de bord...</p>;
  }

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
        {activeTab === 'oeuvres' && <OeuvresTab />}
        {activeTab === 'categories' && <CategoriesTab />}
        {activeTab === 'artisans' && <ArtisansTab />}
        {activeTab === 'evenements' && <EvenementsTab />}
      </section>
    </div>
  );
}