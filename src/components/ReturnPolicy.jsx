import React from 'react';

const ReturnPolicy = () => {
  return (
    <div dir="rtl" className="min-h-screen bg-[#f8fafc] py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm">
        
        {/* العنوان الرئيسي */}
        <h1 className="text-2xl md:text-3xl font-bold text-center text-[#2C5E77] mb-6">
          سياسة الاسترجاع والاستبدال – Chi Matcha
        </h1>

        {/* مقدمة الصفحة */}
        <div className="mb-8 text-right space-y-4">
          <p className="text-gray-700 text-lg leading-relaxed">
            في <span className="font-semibold text-[#2C5E77]">Chi Matcha</span> نسعى لتقديم منتجاتنا 
            بجودة عالية وتجربة مميزة تُرضي عملاءنا.  
            نحرص على تعبئة وتغليف كل منتج بعناية تامة، ومع ذلك ندرك أن بعض الظروف 
            غير المتوقعة قد تحدث أثناء الشحن أو التحضير.
          </p>
          <p className="text-gray-600">
            لذلك وضعنا سياسة استرجاع واستبدال مرنة وواضحة لضمان راحتكم وثقتكم بنا دائمًا.
          </p>
        </div>

        {/* البنود الأساسية */}
        <div className="space-y-6 text-right">
          
          {/* البند الأول */}
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">الاسترجاع أو الاستبدال</h3>
            <p className="text-gray-600 leading-relaxed">
              يمكن استرجاع أو استبدال الطلبية فقط في حال وجود 
              <span className="font-semibold text-[#2C5E77]"> كسر أو تلف في المنتج</span> 
              عند الاستلام، أو إذا تم إرسال منتج مختلف عن الذي تم طلبه.
            </p>
            <p className="text-gray-600 leading-relaxed mt-2">
              يجب التواصل معنا خلال <span className="font-semibold text-[#2C5E77]">24 ساعة من استلام الطلبية</span> 
              مع إرفاق صور توضّح الحالة بشكل واضح.
            </p>
          </div>

          {/* البند الثاني */}
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">شروط القبول</h3>
            <p className="text-gray-600 leading-relaxed">
              - يجب أن يكون المنتج في حالته الأصلية ولم يُستخدم. <br />
              - يجب إرجاع المنتج في عبوته الأصلية مع جميع الملحقات. <br />
              - لا يمكن قبول الاسترجاع لأسباب تتعلق بتغيّر الرأي بعد فتح المنتج.
            </p>
          </div>

          {/* البند الثالث */}
          <div className="border-b border-gray-100 pb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">تكاليف الشحن</h3>
            <p className="text-gray-600 leading-relaxed">
              تتحمّل <span className="font-semibold text-[#2C5E77]">Chi Matcha</span> 
              تكاليف الشحن فقط في حال كان الخطأ من جانبنا (مثل كسر أو إرسال منتج خاطئ).  
              أما في الحالات الأخرى، فتكون تكاليف الشحن على العميل.
            </p>
          </div>

          {/* البند الرابع */}
          <div className="pb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">طريقة التواصل</h3>
            <p className="text-gray-600 leading-relaxed">
              يمكنكم التواصل معنا عبر الحساب الرسمي في إنستغرام  
              <span className="text-[#2C5E77] font-semibold"> @chi.matcha </span>  
              أو من خلال خدمة العملاء لتوضيح المشكلة وإتمام عملية الاسترجاع أو الاستبدال.
            </p>
          </div>

        </div>

        {/* ملاحظة ختامية */}
        <div className="mt-8 text-center text-gray-500 text-sm">
          نشكر ثقتكم بـ <span className="text-[#2C5E77] font-semibold">Chi Matcha</span>  
          ونسعى دائمًا لتقديم الأفضل لكم 🌿
        </div>

      </div>
    </div>
  );
};

export default ReturnPolicy;
