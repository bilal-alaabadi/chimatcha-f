import React from 'react'

const PromoBanner = () => {
  return (
    <section className='section__container banner__container'>
          <div className='banner__card text-center p-6 bg-white rounded-lg shadow-md'>
        <span className='text-3xl text-primary'><i className="ri-truck-line"></i></span>
        <h4 className='text-xl font-bold text-gray-800 mt-4'>توصيل مجاني</h4>
        <p className='text-gray-600 mt-2'>يوفر الراحة والقدرة على التسوق من أي مكان وفي أي وقت.</p>
    </div>
    <div className='banner__card text-center p-6 bg-white rounded-lg shadow-md'>
        <span className='text-3xl text-primary'><i className="ri-money-dollar-circle-line"></i></span>
        <h4 className='text-xl font-bold text-gray-800 mt-4'>ضمان استرداد الأموال 100%</h4>
        <p className='text-gray-600 mt-2'>تتمتع المتاجر الإلكترونية بنظام تقييم حيث يمكن للعملاء مشاركة آرائهم.</p>
    </div>
    <div className='banner__card text-center p-6 bg-white rounded-lg shadow-md'>
        <span className='text-3xl text-primary'><i className="ri-user-voice-fill"></i></span>
        <h4 className='text-xl font-bold text-gray-800 mt-4'>دعم قوي</h4>
        <p className='text-gray-600 mt-2'>نقدم خدمات دعم العملاء لمساعدتهم في الاستفسارات والمشكلات.</p>
</div>
    </section>
  )
}

export default PromoBanner

