// ShopPage.jsx
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCards from './ProductCards';
import ShopFiltering from './ShopFiltering';
import { useFetchAllProductsQuery } from '../../redux/features/products/productsApi';
import imge from "../../assets/بنر-شاي.jpg";

const filters = {
  categories: [
    'الكل',
    'الماتشا و أدواتها',
    'القهوة و أدواتها',
    'بكوس توفيرية',
    'منتجات آخرى'
  ]
};

const coffeeSubCategories = [
  { label: 'المحامص السعودية', value: 'المحامص السعودية' },
  { label: 'المحامص العمانية', value: 'المحامص العمانية' },
  { label: 'الأدوات', value: 'الأدوات' },
];

const ShopPage = () => {
  const [searchParams] = useSearchParams();

  const [filtersState, setFiltersState] = useState({
    category: 'الكل',
    subCategory: ''
  });

  useEffect(() => {
    const categoryFromURL = searchParams.get('category');

    if (categoryFromURL && filters.categories.includes(categoryFromURL)) {
      setFiltersState({
        category: categoryFromURL,
        subCategory: ''
      });
    }
  }, [searchParams]);

  const [currentPage, setCurrentPage] = useState(1);
  const [ProductsPerPage] = useState(8);
  const [showFilters, setShowFilters] = useState(false);

  const { category, subCategory } = filtersState;

  useEffect(() => {
    setCurrentPage(1);
  }, [filtersState]);

  const { data: { products = [], totalPages, totalProducts } = {}, error, isLoading } = useFetchAllProductsQuery({
    category: category !== 'الكل' ? category : undefined,
    subCategory: subCategory || undefined,
    page: currentPage,
    limit: ProductsPerPage,
  });

  const clearFilters = () => {
    setFiltersState({
      category: 'الكل',
      subCategory: ''
    });
  };

  const handleCategoryChange = (categoryValue) => {
    setFiltersState({
      category: categoryValue,
      subCategory: ''
    });
  };

  const handleSubCategoryChange = (subCategoryValue) => {
    setFiltersState((prev) => ({
      ...prev,
      subCategory: subCategoryValue
    }));
  };

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  if (isLoading) return <div className="text-center py-8 text-[#1F2C1F]">جاري تحميل المنتجات...</div>;
  if (error) return <div className="text-center py-8 text-red-500">حدث خطأ أثناء تحميل المنتجات.</div>;

  const startProduct = totalProducts > 0 ? (currentPage - 1) * ProductsPerPage + 1 : 0;
  const endProduct = Math.min(startProduct + ProductsPerPage - 1, totalProducts);

  return (
    <>
      <section className='relative w-full overflow-hidden bg-[#e2e5e5]' style={{ aspectRatio: '16/9' }}>
        <img
          src={imge}
          alt="متجر حناء برغند"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center px-4"></h1>
        </div>
      </section>

      <section className='section__container py-8'>
        <div className='flex flex-col md:flex-row md:gap-8 gap-6'>
          <div className='md:w-1/4'>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className='md:hidden w-full bg-[#1F2C1F] text-white py-2 px-4 rounded-md mb-4 flex items-center justify-between transition-colors'
            >
              <span>{showFilters ? 'إخفاء الفلاتر' : 'تصفية المنتجات'}</span>
              <svg
                className={`w-5 h-5 transition-transform ${showFilters ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <div className={`${showFilters ? 'block' : 'hidden'} md:block bg-white p-4 rounded-lg shadow-sm`}>
              <ShopFiltering
                filters={filters}
                filtersState={filtersState}
                setFiltersState={setFiltersState}
                clearFilters={clearFilters}
              />

              {category === 'القهوة و أدواتها' && (
                <div className="mt-6">
                  <h4 className="font-medium text-[#1F2C1F] mb-3">تصنيف القهوة</h4>

                  <div className="space-y-2">
                    {coffeeSubCategories.map((item) => (
                      <label
                        key={item.value}
                        className="flex items-center gap-2 cursor-pointer text-[#1F2C1F]"
                      >
                        <input
                          type="radio"
                          name="coffeeSubCategory"
                          value={item.value}
                          checked={subCategory === item.value}
                          onChange={() => handleSubCategoryChange(item.value)}
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>

                  {subCategory && (
                    <button
                      type="button"
                      onClick={() => handleSubCategoryChange('')}
                      className="mt-3 text-sm text-red-500"
                    >
                      إلغاء تصنيف القهوة
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className='md:w-3/4'>
            <div className='flex justify-between items-center mb-6'>
              <h3 className='text-lg font-medium text-[#1F2C1F]'>
                عرض {startProduct}-{endProduct} من {totalProducts} منتج
              </h3>
            </div>

            {products.length > 0 ? (
              <>
                <ProductCards products={products} />

                {totalPages > 1 && (
                  <div className='mt-8 flex flex-col sm:flex-row items-center justify-between gap-4'>
                    <div className="text-sm text-[#1F2C1F]">
                      الصفحة {currentPage} من {totalPages}
                    </div>

                    <div className='flex gap-2'>
                      <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`px-4 py-2 rounded-md border transition-colors ${
                          currentPage === 1
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-gray-200'
                            : 'border-[#1F2C1F] text-[#1F2C1F] hover:bg-black hover:text-white'
                        }`}
                      >
                        السابق
                      </button>

                      <div className="flex gap-1">
                        {[...Array(totalPages)].map((_, index) => {
                          const active = currentPage === index + 1;
                          return (
                            <button
                              key={index}
                              onClick={() => handlePageChange(index + 1)}
                              className={`w-10 h-10 flex items-center justify-center rounded-md border transition-colors ${
                                active
                                  ? 'bg-[#1F2C1F] text-white border-[#1F2C1F]'
                                  : 'border-[#1F2C1F] text-[#1F2C1F] bg-white hover:text-white'
                              }`}
                            >
                              {index + 1}
                            </button>
                          );
                        })}
                      </div>

                      <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`px-4 py-2 rounded-md border transition-colors ${
                          currentPage === totalPages
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-gray-200'
                            : 'border-[#1F2C1F] text-[#1F2C1F] hover:text-white'
                        }`}
                      >
                        التالي
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-lg text-[#1F2C1F]">لا توجد منتجات متاحة حسب الفلتر المحدد</p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-4 py-2 bg-[#1F2C1F] text-white rounded-md transition-colors"
                >
                  عرض جميع المنتجات
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopPage;