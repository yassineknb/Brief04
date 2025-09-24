import React from 'react'
import BouchraImg from './Bouchra.jpg';

export default function Artsan() {
  return (
    <>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Itim&display=swap');
.container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Itim', cursive;
}
img{
  width: 150px;
  height: 150px;
  border-radius: 100%;
}
.section-artisan{
  font-family: 'Itim', cursive;
  background-color: rgba(255, 255, 255, 0.305);
  display: flex;
  width: 700px;
  height: 200px;
  align-items: center;
  gap: 30px;
  padding: 20px;
  border-radius: 20px;
}
h3{
  font-family: 'Itim', cursive;
  border-bottom: 1px solid black;
  width: 200px;
}
h4{
  font-family: 'Itim', cursive;
  color: rgba(0, 0, 0, 0.489);
}
      `}</style>
      <div className='container' >
        <h2>Artisan du mois.</h2>
        <div className='section-artisan'>
          <div className='artisan'>
            <img src={BouchraImg} alt="Bouchra" />
          </div>
          <div className='info'>
            <h3>Bouchra Boudoua</h3>
            <h4>la Mémoire de la Terre Réinventée</h4>
            <p>Ce mois-ci, nous mettons en lumière Bouchra Boudoua, une céramiste et designer qui façonne bien plus que de l'argile : elle tisse un dialogue entre le passé et le présent, entre les techniques ancestrales marocaines et une esthétique résolument moderne. Basée entre Casablanca et Marrakech, elle est une figure incontournable de la scène du design marocain.</p>
          </div>
        </div>
      </div>
    </>
  )
}
