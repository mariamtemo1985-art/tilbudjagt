import React, { useState } from 'react';
import Head from 'next/head';

export default function Home() {
  const [activeTab, setActiveTab] = useState('all');

  const offers = [
    { id: 1, store: 'Netto', title: 'عروض اللحوم الطازجة الأسبوعية', price: '29.95 دك', category: 'groceries', tag: 'خصم 40%' },
    { id: 2, store: 'Bilka', title: 'تلفزيون ذكي بشاشة 55 بوصة', price: '2,999 دك', category: 'electronics', tag: 'VIP حصري' },
    { id: 3, store: 'Lidl', title: 'خضار وفواكه طازجة من الإنتاج المحلي', price: '10.00 دك', category: 'groceries', tag: 'عرض يومي' },
    { id: 4, store: 'Føtex', title: 'مسحوق غسيل أريال (عبوة توفيرية)', price: '89.00 دك', category: 'home', tag: 'الأكثر طلباً' },
  ];

  const filteredOffers = activeTab === 'all' 
    ? offers 
    : offers.filter(o => o.category === activeTab);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <Head>
        <title>Tilbudjagt.dk - أفضل العروض والخصومات في الدنمارك</title>
        <meta name="description" content="منصتك الأولى لمتابعة أقوى عروض المتاجر والمولات الدنماركية وتوفير أموالك." />
      </Head>

      {/* شريط التنقل العلوي */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-black text-blue-600 tracking-wider">
            Tilbud<span className="text-orange-500">jagt</span>.dk
          </h1>
          <nav className="hidden md:flex space-x-6 space-x-reverse font-medium text-gray-600">
            <a href="#offers" className="hover:text-blue-600 transition">العروض المباشرة</a>
            <a href="#vip" className="hover:text-blue-600 transition text-orange-500 font-bold">عضوية VIP</a>
            <a href="#blog" className="hover:text-blue-600 transition">المدونة ومقارنات الأسعار</a>
          </nav>
          <a href="#vip" className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-full font-bold shadow-md transition">
            انضم لـ VIP (20 kr)
          </a>
        </div>
      </header>

      {/* قسم الترحيب */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">اكتشف أرخص الأسعار في جميع المتاجر الدنماركية</h2>
          <p className="text-lg text-blue-100 mb-8">نجمع لك أحدث عروض Netto, Bilka, Føtex, وLidl في مكان واحد لتوفير وقتك وميزانيتك.</p>
          <div className="flex justify-center gap-4">
            <a href="#offers" className="bg-white text-blue-900 font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-gray-100 transition">تصفح عروض اليوم</a>
            <a href="#vip" className="bg-orange-500 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-orange-600 transition">ترقية إلى VIP</a>
          </div>
        </div>
      </section>

      {/* قسم العروض والمنتجات */}
      <main id="offers" className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <h3 className="text-2xl font-bold mb-4 md:mb-0">🔥 أحدث العروض المضافة</h3>
          
          {/* أزرار التصفية */}
          <div className="flex flex-wrap gap-2">
            <button 
              onClick={() => setActiveTab('all')} 
              className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'all' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 shadow-sm hover:bg-gray-100'}`}>
              الكل
            </button>
            <button 
              onClick={() => setActiveTab('groceries')} 
              className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'groceries' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 shadow-sm hover:bg-gray-100'}`}>
              سوبرماركت
            </button>
            <button 
              onClick={() => setActiveTab('electronics')} 
              className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'electronics' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 shadow-sm hover:bg-gray-100'}`}>
              إلكترونيات
            </button>
            <button 
              onClick={() => setActiveTab('home')} 
              className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === 'home' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 shadow-sm hover:bg-gray-100'}`}>
              المنزل والمطبخ
            </button>
          </div>
        </div>

        {/* شبكة العروض */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredOffers.map((offer) => (
            <div key={offer.id} className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100 hover:shadow-xl transition flex flex-col justify-between">
              <div className="p-5">
                <div className="flex justify-between items-center mb-3">
                  <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full">{offer.store}</span>
                  <span className="bg-orange-100 text-orange-800 text-xs font-bold px-2.5 py-1 rounded-full">{offer.tag}</span>
                </div>
                <h4 className="text-lg font-bold text-gray-800 mb-2">{offer.title}</h4>
                <p className="text-2xl font-black text-blue-600">{offer.price}</p>
              </div>
              <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex justify-between items-center">
                <span className="text-xs text-gray-500">تحديث آلي اليوم</span>
                <button className="text-blue-600 hover:text-blue-800 font-bold text-sm">عرض التفاصيل &larr;</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* قسم عضويات الـ VIP */}
      <section id="vip" className="bg-gray-900 text-white py-16 px-4 my-12">
        <div className="max-w-4xl mx-auto text-center">
          <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">حصري للأعضاء</span>
          <h3 className="text-3xl font-extrabold mt-3 mb-4">انضم إلى باقة VIP بـ 20 كرونة فقط شهرياً</h3>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">احصل على أسبقية رؤية العروض القوية قبل الجميع، تصفح الموقع بدون إعلانات نهائياً، وتنبيهات فورية بأرخص الأسعار.</p>
          <div className="bg-white text-gray-900 p-8 rounded-3xl shadow-2xl max-w-md mx-auto text-left">
            <div className="flex justify-between items-center mb-6">
              <h4 className="font-bold text-xl text-blue-900">اشتراك VIP شهري</h4>
              <span className="text-3xl font-black text-orange-500">20 kr<span className="text-sm font-normal text-gray-500">/شهر</span></span>
            </div>
            <ul className="space-y-3 mb-8 text-sm text-gray-600">
              <li className="flex items-center">✅ أسبقية مشاهدة العروض قبل بAساعات</li>
              <li className="flex items-center">✅ تصفح سريع وبدون إعلانات مزعجة</li>
              <li className="flex items-center">✅ تنبيهات مخصصة لمنتجاتك المفضلة</li>
            </ul>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition shadow-lg">
              اشترك الآن واستفد من العروض
            </button>
          </div>
        </div>
      </section>

      {/* قسم المدونة ومقارنات الأسعار */}
      <section id="blog" className="max-w-7xl mx-auto px-4 py-12">
        <h3 className="text-2xl font-bold mb-6">💡 نصائح التوفير ومقارنات الأسعار</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-xs text-blue-600 font-bold">دليل التسوق</span>
            <h4 className="font-bold text-lg mt-2 mb-2">كيف توفر 3000 كرونة شهرياً على مقاضي البيت في الدنمارك؟</h4>
            <p className="text-gray-600 text-sm mb-4">استراتيجيات ذكية ومجربة لمقارنة الأسعار بين السوبرماركت الكبرى وكيف تستغل عروض نهاية الأسبوع.</p>
            <a href="#" className="text-blue-600 font-bold text-sm hover:underline">اقرأ المقال &larr;</a>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-xs text-blue-600 font-bold">مقارنة أسعار</span>
            <h4 className="font-bold text-lg mt-2 mb-2">أيهما أرخص لشراء اللحوم والمواد الأساسية هذا الأسبوع؟</h4>
            <p className="text-gray-600 text-sm mb-4">مقارنة شاملة ومحدثة بين أسعار المنتجات الأكثر استهلاكاً في Netto ومنافستها.</p>
            <a href="#" className="text-blue-600 font-bold text-sm hover:underline">اقرأ المقال &larr;</a>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <span className="text-xs text-blue-600 font-bold">عروض الإلكترونيات</span>
            <h4 className="font-bold text-lg mt-2 mb-2">أفضل أوقات السنة لشراء الأجهزة الذكية والمنزلية</h4>
            <p className="text-gray-600 text-sm mb-4">متى تقدم المتاجر الدنماركية أكبر التخفيضات الحقيقية على الشاشات والمكانس الذكية؟</p>
            <a href="#" className="text-blue-600 font-bold text-sm hover:underline">اقرأ المقال &larr;</a>
          </div>
        </div>
      </section>

      {/* تذييل الصفحة */}
      <footer className="bg-white border-t border-gray-200 mt-16 py-8 text-center text-gray-500 text-sm">
        <p>© 2026 Tilbudjagt.dk. جميع الحقوق محفوظة. المنصة الأوي لتتبع عروض الأسعار في الدنمارك.</p>
      </footer>
    </div>
  );
}
