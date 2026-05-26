// ========================= src/pages/shop/SingleProduct.jsx (نهائي) =========================
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useFetchProductByIdQuery } from '../../../redux/features/products/productsApi';
import { addToCart } from '../../../redux/features/cart/cartSlice';

// يلتقط السعر سواء كان رقمًا أو كائن أحجام
const pickPrice = (src, preferredKeys = ['500 جرام', '1 كيلو', 'افتراضي', 'default']) => {
  if (src == null) return 0;
  if (typeof src === 'number' || typeof src === 'string') return Number(src) || 0;
  if (typeof src === 'object') {
    for (const k of preferredKeys) {
      if (src[k] != null && !Number.isNaN(Number(src[k]))) return Number(src[k]);
    }
    const firstNum = Object.values(src).find(v => !Number.isNaN(Number(v)));
    return Number(firstNum) || 0;
  }
  return 0;
};

const SingleProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { country } = useSelector((state) => state.cart);
  const { data, error, isLoading } = useFetchProductByIdQuery(id);

  const isAEDCountry = country === 'الإمارات' || country === 'دول الخليج';
  const currency = isAEDCountry ? 'د.إ' : 'ر.ع.';
  const exchangeRate = isAEDCountry ? 9.5 : 1;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [cartQty, setCartQty] = useState(1);

  // ✅ لا تضع Hooks بعد هذه الحواجز حتى لا يحدث خطأ "Rendered more hooks..."
  if (isLoading) return <p>جاري التحميل...</p>;
  if (error) return <p>حدث خطأ أثناء تحميل تفاصيل المنتج.</p>;
  if (!data) return null;

  // صور المنتج (تظهر كلها أسفل كـ Thumbnails)
  const images = Array.isArray(data.image)
    ? data.image
    : data.image
    ? [data.image]
    : [];

  // الأسعار: الحالي والمقارن (regularPrice ثم oldPrice، مع دعم الكائنات)
  const currentBase = pickPrice(data.price);
  const compareBase = (() => {
    const reg = pickPrice(data.regularPrice);
    const old = pickPrice(data.oldPrice);
    return reg || old || currentBase;
  })();

  const currentPrice = currentBase * exchangeRate;
  const comparePrice = compareBase * exchangeRate;
  const hasDiscount = compareBase > currentBase && currentBase > 0;
  const discountPercent = hasDiscount
    ? Math.round(((compareBase - currentBase) / compareBase) * 100)
    : 0;

  const handleAddToCart = () => {
    // نرسل للستور/الباك السعر الأساس بالريال العُماني
    dispatch(
      addToCart({
        ...data,
        price: currentBase,
        quantity: cartQty,
        currency,
        exchangeRate,
      })
    );
  };

  const nextImage = () =>
    setCurrentImageIndex((prev) => (images.length ? (prev + 1) % images.length : 0));
  const prevImage = () =>
    setCurrentImageIndex((prev) => (images.length ? (prev - 1 + images.length) % images.length : 0));

  return (
    <section className="section__container mt-8" dir="rtl">
      <div className="flex flex-col items-center md:flex-row gap-8">
        {/* ====================== الصور ====================== */}
        <div className="md:w-1/2 w-full relative">
          {images.length > 0 ? (
            <>
              <div className="overflow-hidden rounded-md relative">
                {/* شارة الخصم فوق الصورة */}
                {hasDiscount && (
                  <div className="absolute top-3 right-3 z-10 bg-[#1F2C1F] text-white text-sm font-bold px-3 py-1 rounded-full shadow">
                    -{discountPercent}%
                  </div>
                )}
                <img
                  src={images[currentImageIndex]}
                  alt={data.name}
                  className="w-full h-auto object-contain"
                  onError={(e) => {
                    e.currentTarget.src = 'https://via.placeholder.com/800x800?text=No+Image';
                  }}
                />
              </div>

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#1F2C1F] text-white w-9 h-9 rounded-full flex items-center justify-center"
                    aria-label="الصورة السابقة"
                  >
                    ‹
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#1F2C1F] text-white w-9 h-9 rounded-full flex items-center justify-center"
                    aria-label="الصورة التالية"
                  >
                    ›
                  </button>
                </>
              )}

              {/* كل الصور أسفل */}
              {images.length > 1 && (
                <div className="mt-4 flex gap-2 overflow-x-auto py-1">
                  {images.map((src, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`border rounded-md p-1 flex-shrink-0 ${
                        idx === currentImageIndex ? 'border-[#1F2C1F]' : 'border-gray-200'
                      }`}
                      aria-label={`صورة رقم ${idx + 1}`}
                      title={`صورة رقم ${idx + 1}`}
                    >
                      <img
                        src={src}
                        alt={`${data.name} ${idx + 1}`}
                        className="w-20 h-20 object-cover rounded"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/150x150?text=No+Image';
                        }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </>
          ) : (
            <p>لا توجد صور متاحة.</p>
          )}
        </div>

        {/* ====================== التفاصيل ====================== */}
        <div className="md:w-1/2 w-full">
          <h3 className="text-2xl font-semibold mb-4">{data.name}</h3>
          <p className="text-gray-600 mb-2">الفئة: {data.category || 'غير محدد'}</p>
          {data.description && <p className="text-gray-600 mb-4">{data.description}</p>}

          {/* السعر مع إظهار الخصم */}
          <div className="mb-6">
            {hasDiscount ? (
              <div className="flex items-baseline gap-3">
                <div className="text-2xl text-[#1F2C1F] font-bold">
                  {currentPrice.toFixed(2)} {currency}
                </div>
                <div className="text-gray-400 line-through">
                  {comparePrice.toFixed(2)} {currency}
                </div>
                <span className="bg-[#1F2C1F] text-white text-xs font-bold px-2 py-1 rounded">
                  وفر {discountPercent}%
                </span>
              </div>
            ) : (
              <div className="text-2xl text-[#1F2C1F] font-bold">
                {currentPrice.toFixed(2)} {currency}
              </div>
            )}
          </div>

          {/* عداد الكمية */}
          <div className="mb-6 flex items-center gap-4">
            <button
              type="button"
              onClick={() => setCartQty((q) => (q > 1 ? q - 1 : 1))}
              className="w-10 h-10 flex items-center justify-center bg-[#1F2C1F] text-white rounded-md"
              aria-label="تقليل الكمية"
            >
              -
            </button>
            <div className="min-w-[3rem] text-center font-bold text-lg">{cartQty}</div>
            <button
              type="button"
              onClick={() => setCartQty((q) => q + 1)}
              className="w-10 h-10 flex items-center justify-center bg-[#1F2C1F] text-white rounded-md"
              aria-label="زيادة الكمية"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="px-6 py-3 bg-[#1F2C1F] text-white rounded-md hover:opacity-90"
          >
            إضافة إلى السلة
          </button>
        </div>
      </div>
    </section>
  );
};

export default SingleProduct;
