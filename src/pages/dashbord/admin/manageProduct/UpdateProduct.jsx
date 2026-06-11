// ========================= src/components/admin/updateProduct/UpdateProduct.jsx =========================
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  useFetchProductByIdQuery,
  useUpdateProductMutation,
} from '../../../../redux/features/products/productsApi';

import TextInput from '../addProduct/TextInput';
import SelectInput from '../addProduct/SelectInput';
import UploadImage from '../manageProduct/UploadImag';

const categories = [
  { label: 'الكل', value: 'الكل' },
  { label: 'الماتشا و أدواتها', value: 'الماتشا و أدواتها' },
  { label: 'القهوة و أدواتها', value: 'القهوة و أدواتها' },
  { label: 'بكوس توفيرية', value: 'بكوس توفيرية' },
  { label: 'منتجات آخرى', value: 'منتجات آخرى' },
];

const coffeeSubCategories = [
  { label: 'المحامص السعودية', value: 'المحامص السعودية' },
  { label: 'المحامص العمانية', value: 'المحامص العمانية' },
  { label: 'الأدوات', value: 'الأدوات' },
];

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const {
    data: productData,
    isLoading: isFetching,
    error: fetchError,
  } = useFetchProductByIdQuery(id);

  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const [product, setProduct] = useState({
    name: '',
    size: '',
    category: '',
    subCategory: '',
    price: '',
    quantity: '',
    description: '',
    oldPrice: '',
    inStock: true,
    image: [],
  });

  const [newImages, setNewImages] = useState([]);
  const [keepImages, setKeepImages] = useState([]);

  useEffect(() => {
    if (!productData) return;

    const p = productData.product ? productData.product : productData;

    const currentImages = Array.isArray(p?.image)
      ? p.image
      : p?.image
      ? [p.image]
      : [];

    setProduct({
      name: p?.name || '',
      size: p?.size || '',
      category: p?.category || '',
      subCategory: p?.subCategory || '',
      price: p?.price != null ? String(p.price) : '',
      quantity: p?.quantity != null ? String(p.quantity) : '',
      description: p?.description || '',
      oldPrice: p?.oldPrice != null ? String(p.oldPrice) : '',
      inStock: typeof p?.inStock === 'boolean' ? p.inStock : true,
      image: currentImages,
    });

    setKeepImages(currentImages);
  }, [productData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === 'ended' && type === 'checkbox') {
      setProduct((prev) => ({ ...prev, inStock: !checked }));
    } else if (name === 'category') {
      setProduct((prev) => ({
        ...prev,
        category: value,
        subCategory: value === 'القهوة و أدواتها' ? prev.subCategory : '',
      }));
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const required = {
      'أسم المنتج': product.name,
      'صنف المنتج': product.category,
      'السعر': product.price,
      'الكمية': product.quantity,
      'الوصف': product.description,
      'الصور': keepImages.length > 0 || newImages.length > 0,
    };

    if (product.category === 'القهوة و أدواتها') {
      required['تصنيف القهوة'] = product.subCategory;
    }

    const missing = Object.entries(required)
      .filter(([, v]) => v === '' || v === null || v === false)
      .map(([k]) => k);

    if (missing.length) {
      alert(`الرجاء ملء الحقول التالية: ${missing.join('، ')}`);
      return;
    }

    try {
      const formData = new FormData();

      formData.append('name', product.name);
      formData.append('size', product.size || '');
      formData.append('category', product.category);
      formData.append('subCategory', product.subCategory || '');
      formData.append('price', product.price);
      formData.append('quantity', Number(product.quantity));
      formData.append('description', product.description);
      formData.append('oldPrice', product.oldPrice || '');
      formData.append(
        'inStock',
        String(Number(product.quantity) > 0 && product.inStock)
      );
      formData.append('author', user?._id || '');

      formData.append('keepImages', JSON.stringify(keepImages || []));

      if (Array.isArray(newImages) && newImages.length > 0) {
        newImages.forEach((file) => formData.append('image', file));
      }

      await updateProduct({ id, body: formData }).unwrap();

      alert('تم تحديث المنتج بنجاح');
      navigate('/dashboard/manage-products');
    } catch (error) {
      console.error('Failed to update product', error);
      alert(
        'حدث خطأ أثناء تحديث المنتج: ' +
          (error?.data?.message || error?.message || 'خطأ غير معروف')
      );
    }
  };

  if (isFetching) {
    return <div className="text-center py-8">جاري تحميل بيانات المنتج...</div>;
  }

  if (fetchError) {
    return <div className="text-center py-8 text-red-500">خطأ في تحميل بيانات المنتج</div>;
  }

  return (
    <div className="container mx-auto mt-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-right">تحديث المنتج</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="أسم المنتج"
          name="name"
          placeholder="أكتب أسم المنتج"
          value={product.name}
          onChange={handleChange}
        />

        <SelectInput
          label="صنف المنتج"
          name="category"
          value={product.category}
          onChange={handleChange}
          options={categories}
        />

        {product.category === 'القهوة و أدواتها' && (
          <SelectInput
            label="تصنيف القهوة"
            name="subCategory"
            value={product.subCategory}
            onChange={handleChange}
            options={coffeeSubCategories}
          />
        )}

        <TextInput
          label="الحجم (اختياري)"
          name="size"
          placeholder="مثال: 250g | 12pcs | Medium"
          value={product.size}
          onChange={handleChange}
        />

        <TextInput
          label="السعر القديم (اختياري)"
          name="oldPrice"
          type="number"
          placeholder="100"
          value={product.oldPrice}
          onChange={handleChange}
        />

        <TextInput
          label="السعر"
          name="price"
          type="number"
          placeholder="50"
          value={product.price}
          onChange={handleChange}
        />

        <TextInput
          label="الكمية المتوفرة"
          name="quantity"
          type="number"
          placeholder="مثال: 50"
          value={product.quantity}
          onChange={handleChange}
        />

        <UploadImage
          name="image"
          id="image"
          initialImages={product.image}
          setImages={setNewImages}
          setKeepImages={setKeepImages}
        />

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            وصف المنتج
          </label>

          <textarea
            name="description"
            id="description"
            className="add-product-InputCSS"
            value={product.description}
            placeholder="اكتب وصف المنتج"
            onChange={handleChange}
            rows={4}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="ended"
            name="ended"
            checked={!product.inStock}
            onChange={handleChange}
          />
          <label htmlFor="ended">هل انتهى المنتج؟</label>
        </div>

        <div>
          <button type="submit" className="add-product-btn" disabled={isUpdating}>
            {isUpdating ? 'جاري التحديث...' : 'حفظ التغييرات'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;