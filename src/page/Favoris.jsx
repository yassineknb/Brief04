import React, { useEffect } from 'react';
import gnawa from '../assets/gnawa.jpg';
import riad from '../assets/Riad.jpg';
import zellige from '../assets/Zellige.jpg';

const FavorisPage = () => {
useEffect(() => {
if (window.lucide) {
window.lucide.createIcons();
}
}, []);

return (
<div className="min-h-screen bg-[#D7AFA3] p-8">
<h1 className="text-3xl font-bold text-center mb-16 mt-12 text-[#2b2b2b]">
Vos Favoris
</h1>

<div className="flex flex-col gap-6 max-w-2xl mx-auto">
{/* Card 1 */}
<div className="flex items-center bg-white  rounded-xl shadow-md overflow-hidden">
<img
src={gnawa}
alt="Gnawa Musique"
className="w-48 h-32 object-cover"
/>
<div className="flex-1 px-4 py-3">
<h2 className="text-lg font-semibold text-gray-900">Gnawa Musique</h2>
<p className="text-sm text-gray-600">Musique - Essaouira et Marrakech</p>
</div>
<button className="flex items-center gap-2 text-red-500 pr-4 hover:text-red-600">
<i data-lucide="heart" className="w-5 h-5 fill-red-500"></i>
<span className="text-sm font-medium">Retirer des favoris</span>
</button>
</div>

{/* Card 2 */}
<div className="flex items-center bg-white rounded-xl shadow-md overflow-hidden">
<img
src={riad}
alt="Riad Marocain"
className="w-48 h-32 object-cover"
/>
<div className="flex-1 px-4 py-3">
<h2 className="text-lg font-semibold text-gray-900">Riad Marocain</h2>
<p className="text-sm text-gray-600">Architecture - Marrakech et Fès</p>
</div>
<button className="flex items-center gap-2 text-red-500 pr-4 hover:text-red-600">
<i data-lucide="heart" className="w-5 h-5 fill-red-500"></i>
<span className="text-sm font-medium">Retirer des favoris</span>
</button>
</div>

{/* Card 3 */}
<div className="flex items-center bg-white rounded-xl shadow-md overflow-hidden">
<img
src={zellige}
alt="Zellige Marocain"
className="w-48 h-32 object-cover"
/>
<div className="flex-1 px-4 py-3">
<h2 className="text-lg font-semibold text-gray-900">Zellige Marocain</h2>
<p className="text-sm text-gray-600">Zellige - Fès</p>
</div>
<button className="flex items-center gap-2 text-red-500 pr-4 hover:text-red-600">
<i data-lucide="heart" className="w-5 h-5 fill-red-500"></i>
<span className="text-sm font-medium">Retirer des favoris</span>
</button>
</div>
</div>
</div>
);
};

export default FavorisPage;