
// .jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

import card1 from "../../assets/699de0b7-7732-4bac-83ad-b34fd6a53930.png";
import card2 from "../../assets/72d3dac7-4f0f-4af2-ae8f-03966ae2d195.png";
import card3 from "../../assets/5aec74f1-843d-4e18-8132-bf2dd34a6326.png";
import card4 from "../../assets/93ff9db3-2e2d-45a9-8d95-63d33b10b63c.png";

import log from "../../assets/ChatGPT Image Oct 31, 2025, 05_36_06 PM.png";

const cards = [
  {
    id: 1,
    image: card1,
    trend: ' ',
    title: 'الماتشا و أدواتها'
  },
  {
    id: 2,
    image: card2,
    trend: ' ',
    title: 'القهوة و أدواتها'
  },
  {
    id: 3,
    image: card3,
    trend: ' ',
    title: 'بكجات توفيرية'
  },
  {
    id: 4,
    image: card4,
    trend: ' ',
    title: 'منتجات آخرى'
  },
];

// خريطة ربط عناوين الكروت مع فلاتر المتجر الموجودة
const categoryMap = {
  'الماتشا و أدواتها': 'الماتشا و أدواتها',
  'القهوة و أدواتها': 'القهوة و أدواتها',
  'بكجات توفيرية': 'بكجات توفيرية',
  'منتجات آخرى': 'منتجات آخرى',
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
