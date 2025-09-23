import React from "react";

export default function Categories() {
  return (
    <div>
      <section style={{
        fontFamily: 'itim',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: '3rem',
        gap: '7px',
      }}>
        <h2 style={{ fontSize: '1rem' }}>CATÉGORIES</h2>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1rem',
        }}>
          {['Artisanat', 'Gastronomie', 'Habits', 'Architecture', 'Musique & Danse'].map((cat) => (
            <button
              key={cat}
              style={{
                fontFamily: 'itim',
                padding: '0.8rem 2rem',
                fontSize: '1rem',
                fontWeight: 600,
                color: '#B8860B',
                backgroundColor: '#F5F5DC',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseOver={e => {
                e.target.style.backgroundColor = '#D0AFA3';
                e.target.style.transform = 'translateY(-5px) scale(1.02)';
                e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.2)';
                e.target.style.color = '#fff9ec';
              }}
              onMouseOut={e => {
                e.target.style.backgroundColor = '#F5F5DC';
                e.target.style.transform = 'none';
                e.target.style.boxShadow = 'none';
                e.target.style.color = '#B8860B';
              }}>
              {cat}
            </button>
          ))}
        </div>
      </section>
    </div>
    )
  }