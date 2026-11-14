import React from 'react';

export default function Home() {
  return (
    <>
      {/* تحسينات محركات البحث وأرشفة جوجل وكروم (SEO Metadata) */}
      <head>
        <title>Tilbudjagt.dk - أفضل العروض، مقارنات الأسعار ونصائح التسوق في الدنمارك</title>
        <meta name="description" content="اكتشف أحدث العروض والصفقات اليومية المحدثة أوتوماتيكياً من أكبر المتاجر والمولات في الدنمارك. انضم لعضوية VIP واقتنص الصفقات قبل الجميع." />
        <meta name="keywords" content="Tilbud, Tilbudjagt, صيد العروض, تخفيضات الدنمارك, عروض المتاجر الدنماركية, مقارنة أسعار, Black Friday" />
        <link rel="canonical" href="https://www.tilbudjagt.dk" />
      </head>

      <main className="min-h-screen bg-gray-50 text-gray-800 font-sans antialiased">
        {/* شريط التنقل العلوي الاحترافي */}
        <header className="bg-white shadow-sm border-b border-gray-200 py-4 px-6 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <div className="flex items-center space-x-3 space-x-reverse">
              <h1 className="text-2xl font-black text-red-600 tracking-tight">
                Tilbudjagt<span className="text-gray-900">.dk</span>
              </h1>
              <span className="bg-red-50 text-red-600 text-xs px-2.5 py-1 rounded-full font-medium hidden md:inline-block">
                تحديث آلي مباشر ⚡
              </span>
            </div>
            
            <nav className="hidden md:flex space-x-6 space-x-reverse text-sm font-medium text-gray-600">
              <span className="text-red-600 cursor-pointer font-semibold">الرئيسية</span>
              <span className="hover:text-red-600 cursor-pointer transition-colors">أحدث العروض</span>
              <span className="hover:text-red-600 cursor-pointer transition-colors">المتاجر والمولات</span>
              <span className="hover:text-red-600 cursor-pointer transition-colors">المدونة والمقارنات</span>
            </nav>

            <div className="flex items-center gap-3">
              <div className="hidden lg:flex items-center gap-1.5 text-xs bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                متاجر متصلة آلياً
              </div>
              
              {/* زر اشتراك الأعضاء VIP (أسبقية رؤية العروض القوية بدون إعلانات) */}
              <button className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-4 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-sm hover:from-amber-600 hover:to-amber-700 transition-all flex items-center gap-1.5">
                <span>⭐ اشتراك VIP</span>
                <span className="bg-black/20 px-1.5 py-0.5 rounded text-[10px]">20kr/شهر</span>
              </button>
            </div>
          </div>
        </header>

        {/* قسم الترحيب الديناميكي والشعار */}
        <section className="bg-gradient-to-r from-red-600 to-red-700 text-white py-14 px-6 text-center shadow-inner">
          <div className="max-w-3xl mx-auto">
            <span className="bg-red-800 text-red-100 text-xs px-3 py-1 rounded-full font-semibold uppercase tracking-wider inline-block mb-3">
              منصة صيد العروض ومقارنة الأسعار الأولى في الدنمارك
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold mb-4 tracking-tight leading-tight">
              اغتنم أقوى الصفقات قبل الجميع وأنت في منزلك
            </h2>
            <p className="text-red-100 text-base sm:text-lg font-light">
              جلب تلقائي ومباشر على مدار الساعة لأحدث عروض المتاجر، السوبرماركات، ومجلات التخفيضات الكبرى في الدنمارك (مثل Elgiganten, Bilka, Lidl وغيرها).
            </p>
          </div>
        </section>

        {/* قسم العروض الرئيسية المحدثة أوتوماتيكياً */}
        <section className="max-w-7xl mx-auto py-12 px-6">
          <div className="flex justify-between items-center mb-8 border-b pb-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                <span>🔥</span> أحدث العروض والخصومات المضافة أوتوماتيكياً
              </h3>
              <p className="text-sm text-gray-500 mt-1">تحديث لحظي عبر خلاصات التسويق بالعمولة وشبكات المتاجر الدنماركية</p>
            </div>
            <span className="text-xs text-red-600 bg-red-50 px-3 py-1.5 rounded-lg font-bold border border-red-100">
              ⚡ عروض حصرية للأعضاء VIP أولاً
            </span>
          </div>
          
          {/* شبكة المنتجات الاحترافية */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            
            {/* بطاقة عرض تجريبية (مرتبطة بنظام الـ Affiliate والربح من النقرات) */}
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
              <div>
                <div className="h-52 bg-gray-100 flex items-center justify-center text-gray-400 relative overflow-hidden">
                  <span className="absolute top-3 right-3 bg-red-600 text-white text-xs px-2.5 py-1 rounded-full font-bold shadow-sm">
                    تخفيض بلاك فرايداي
                  </span>
                  <div className="text-sm font-medium text-gray-400 group-hover:scale-105 transition-transform duration-300">
                    صورة المنتج المستخرجة آلياً
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between text-xs text-gray-400 mb-2">
                    <span className="font-semibold text-gray-600">المتجر: Elgiganten / Power</span>
                    <span className="text-emerald-600 font-semibold">متوفر أوتوماتيكياً</span>
                  </div>
                  <h4 className="font-bold text-base text-gray-900 line-clamp-2 group-hover:text-red-600 transition-colors">
                    عنوان العرض التلقائي يظهر هنا بأسعار محدثة...
                  </h4>
                  <p className="text-gray-500 text-xs mt-2 line-clamp-2">
                    تفاصيل العرض والمميزات المسحوبة من خلاصة المتجر الرسمي في الدنمارك...
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0 flex justify-between items-center border-t border-gray-50 mt-4">
                <div>
                  <span className="text-xs text-gray-400 line-through block">1,999 kr</span>
                  <span className="text-red-600 font-extrabold text-lg">999 kr</span>
                </div>
                {/* زر التوجيه لرابط الشراء (Affiliate Link) لتحقيق الربح */}
                <button className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-700 shadow-sm hover:shadow transition-all">
                  اذهب للمتجر ↗
                </button>
              </div>
            </div>

          </div>
        </section>

        {/* قسم المدونة ومقارنات الأسعار ونصائح العملاء */}
        <section className="bg-white py-12 px-6 border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-8 border-b pb-4">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <span>✍️</span> مدونة صيد العروض ومقارنات الأسعار
                </h3>
                <p className="text-sm text-gray-500 mt-1">مقالات تحليلية، مقارنات دقيقة بين المتاجر، ونصائح لتوفير المال في الدنمارك</p>
              </div>
              <span className="text-xs text-red-600 font-bold hover:underline cursor-pointer">
                عرض كل المقالات ←
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* مقال 1 */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <span className="text-xs bg-red-100 text-red-600 px-2.5 py-1 rounded-full font-semibold">مقارنة أسعار</span>
                  <h4 className="font-bold text-lg text-gray-900 mt-3 mb-2">أرخص متاجر الإلكترونيات في الدنمارك: مقارنة شاملة بين الأسعار والخدمات</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">تعرف على فروق الأسعار بين المتاجر الكبرى وكيف تختار العرض الأنسب لك دون هدر أموالك...</p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center text-xs text-gray-400">
                  <span>قراءة في 4 دقائق</span>
                  <span className="text-red-600 font-semibold hover:underline cursor-pointer">اقرأ المقال ←</span>
                </div>
              </div>

              {/* مقال 2 */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <span className="text-xs bg-red-100 text-red-600 px-2.5 py-1 rounded-full font-semibold">دليل التسوق</span>
                  <h4 className="font-bold text-lg text-gray-900 mt-3 mb-2">كيف تستفيد من مجلات العروض الأسبوعية (Tilbudsaviser) لتوفير مصاريف البقالة؟</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">أفضل الطرق لمتابعة عروض السوبرماركت الدنماركية (Lidl, Netto, Bilka) أوتوماتيكياً...</p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center text-xs text-gray-400">
                  <span>قراءة في 3 دقائق</span>
                  <span className="text-red-600 font-semibold hover:underline cursor-pointer">اقرأ المقال ←</span>
                </div>
              </div>

              {/* مقال 3 */}
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <span className="text-xs bg-red-100 text-red-600 px-2.5 py-1 rounded-full font-semibold">مواسم التخفيضات</span>
                  <h4 className="font-bold text-lg text-gray-900 mt-3 mb-2">دليلك لاقتناص أقوى صفقات بلاك فرايداي في السوق الدنماركي دون خدع الأسعار</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">أسرار وحيل كشف الخصومات الحقيقية ومتابعة التحديثات اللحظية عبر موقعنا...</p>
                </div>
                <div className="mt-6 pt-4 border-t border-gray-200 flex justify-between items-center text-xs text-gray-400">
                  <span>قراءة في 5 دقائق</span>
                  <span className="text-red-600 font-semibold hover:underline cursor-pointer">اقرأ المقال ←</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* تذييل الموقع الاحترافي */}
        <footer className="bg-white border-t border-gray-200 py-8 px-6 text-center text-gray-500 text-sm mt-10">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© 2026 Tilbudjagt.dk - جميع الحقوق محفوظة. منصة صيد العروض الأوتوماتيكية في الدنمارك.</p>
            <div className="flex space-x-6 space-x-reverse text-xs text-gray-400">
              <span className="hover:underline cursor-pointer">سياسة الخصوصية</span>
              <span className="hover:underline cursor-pointer">شروط الاستخدام</span>
              <span className="hover:underline cursor-pointer">اتصل بنا</span>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
