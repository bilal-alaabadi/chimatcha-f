import React from 'react';
import dealsImg from "../../assets/web-pic1-600x857 (1).png";

const DealsSection = () => {
  return (
    <section className='section__container deals__container bg-blue-50 flex flex-col md:flex-row items-center gap-8 p-8'>
        {/* الصورة ستختفي في الشاشات الصغيرة وتظهر في الشاشات المتوسطة وما فوق */}
        <div className='deals__image hidden md:block flex-1'>
            <img src={dealsImg} alt="عروض الشهر" className='w-full h-auto' />
        </div>

        <div className='deals__content flex-1 text-center md:text-right' dir='rtl'>
            <h5 className='text-2xl font-bold text-gray-800'>احصل على خصم يصل إلى %20</h5>
            <h4 className='text-xl font-semibold text-primary mt-2'>عروض هذا الشهر</h4>
            <p className='text-gray-600 mt-4'>
                عروض موضة الرجال العمانيين لهذا الشهر هنا لتحقيق أحلام أناقتك دون تكلفة باهظة. اكتشف مجموعة مختارة من الملابس التقليدية والعصرية، والإكسسوارات والأحذية، كلها مختارة بعناية لتعزيز خزانة ملابسك.
            </p>
        </div>
    </section>
  );
};

export default DealsSection;