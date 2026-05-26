// HeroSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import card1 from "../../assets/ChatGPT Image Oct 31, 2025, 06_22_28 PM.png";
import card2 from "../../assets/top-view-green-matcha-still-life.jpg";
import card3 from "../../assets/ChatGPT Image Oct 31, 2025, 06_32_40 PM.png";
import card4 from "../../assets/dark-coffee-beans-bowl-brown-table.jpg";
import log from "../../assets/ChatGPT Image Oct 31, 2025, 05_36_06 PM.png"; // شعار الأنثور

const cards = [
  { id: 1, image: card1, trend: ' ', title: 'الماتشا و أدواتها' },
  { id: 2, image: card2, trend: ' ', title: 'القهوة و أدواتها' },
  { id: 3, image: card3, trend: ' ', title: 'بكجات توفيرية' },
];

// خريطة ربط عناوين الكروت مع فلاتر المتجر الموجودة
const categoryMap = {
  'الماتشا و أدواتها': 'الماتشا و أدواتها',
  'القهوة و أدواتها': 'القهوة و أدواتها',
  'بكجات توفيرية': 'بكجات توفيرية',
};

const HeroSection = () => {
  const navigate = useNavigate();

  const handleClick = (title) => {
    const category = categoryMap[title] || title;
    navigate(`/shop?category=${encodeURIComponent(category)}`);
  };

  return (
    <section className=' px-4 py-8'>
      <div className="relative text-center" dir="rtl">
        <h2 className="text-[32px] font-normal text-[#1F2C1F] mb-1">أستكشف مجموعاتنا المميزة</h2>
        <p className="text-[32px] font-bold text-[#3c3c3c] mb-4">عبر أقسامنا الفريدة</p>

        <div className="flex items-center justify-center gap-3 relative z-10">
          <span className="flex-1 max-w-[100px] h-px bg-[#c8c5b9]"></span>
          <img src={log} alt="شعار الأنثور" className="h-20 w-auto object-contain" />
          <span className="flex-1 max-w-[100px] h-px bg-[#c8c5b9]"></span>
        </div>
      </div>

      <div className='grid grid-cols-2 gap-4 md:gap-6'>
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleClick(card.title)}
            className='relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 aspect-[3/4] focus:outline-none focus:ring-2 focus:ring-amber-500'
            type="button"
          >
            <img
              src={card.image}
              alt={card.title}
              className='w-full h-full object-cover transform hover:scale-105 transition-transform duration-300'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col items-center justify-end p-4'>
              <p className='text-xs md:text-sm font-medium text-gray-200'>{card.trend}</p>
              <h4 className='text-lg md:text-xl font-bold text-white mt-1 text-center'>{card.title}</h4>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
