'use client';

import { useState } from 'react';
import Head from 'next/head';

const offers = [
  {
    store: 'Netto',
    title: 'عروض اللحوم الطازجة الأسبوعية',
    price: '29.95 DKK',
    category: 'groceries',
    tag: 'خصم 40%',
  },
  {
    store: 'Bilka',
    title: 'تلفزيون ذكي بشاشة 55 بوصة',
    price: '2,999 DKK',
    category: 'electronics',
    tag: 'عرض مميز',
  },
  {
    store: 'Lidl',
    title: 'خضار وفواكه طازجة من الإنتاج المحلي',
    price: '10.00 DKK',
    category: 'groceries',
    tag: 'عرض يومي',
  },
  {
    store: 'Føtex',
    title: 'مسحوق غسيل أريال - عبوة توفيرية',
    price: '89.00 DKK',
    category: 'home',
    tag: 'الأكثر طلبًا',
  },
];

export default function Home() {
  const [category, setCategory] = useState('all');

  const filteredOffers =
    category === 'all'
      ? offers
      : offers.filter((offer) => offer.category === category);

  return (
    <>
      <Head>
        <title>TilbudJagt.dk - أفضل العروض في الدنمارك</title>
        <meta
          name="description"
          content="اكتشف أفضل العروض والخصومات من المتاجر الدنماركية في مكان واحد."
        />
        <link rel="canonical" href="https://www.tilbudjagt.dk/" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="TilbudJagt.dk" />
        <meta
          property="og:title"
          content="TilbudJagt.dk - أفضل العروض والخصومات في الدنمارك"
        />
        <meta
          property="og:description"
          content="اكتشف أفضل العروض والخصومات من المتاجر الدنماركية في مكان واحد."
        />
        <meta property="og:url" content="https://www.tilbudjagt.dk/" />
        <meta name="twitter:card" content="summary" />
      </Head>

      <div className="min-h-screen bg-gray-50 text-gray-900">
        <header className="sticky top-0 z-10 bg-white shadow-sm">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
            <h1 className="text-2xl font-black text-blue-700">
              Tilbud<span className="text-orange-500">Jagt</span>.dk
            </h1>

            <nav className="hidden gap-5 md:flex">
              <a href="#offers">العروض</a>
              <a href="#vip" className="font-bold text-orange-600">
                VIP
              </a>
              <a href="/contact.html">تواصل معنا</a>
            </nav>

            <a
              href="#vip"
              className="rounded-lg bg-orange-500 px-4 py-2 font-bold text-white"
            >
              عضوية VIP
            </a>
          </div>
        </header>

        <section className="bg-blue-900 px-4 py-16 text-center text-white">
          <h2 className="mb-4 text-4xl font-black">
            أفضل العروض والخصومات في الدنمارك
          </h2>
          <p className="mb-7 text-lg text-blue-100">
            نساعدك على اكتشاف عروض Netto وBilka وFøtex وLidl في مكان واحد.
          </p>
          <a
            href="#offers"
            className="rounded-lg bg-white px-6 py-3 font-bold text-blue-900"
          >
            تصفح العروض
          </a>
        </section>

        <main id="offers" className="mx-auto max-w-6xl px-4 py-12">
          <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold">أحدث العروض</h2>

            <div className="flex flex-wrap gap-2">
              {[
                ['all', 'كل العروض'],
                ['groceries', 'السوبرماركت'],
                ['electronics', 'إلكترونيات'],
                ['home', 'المنزل'],
              ].map(([value, label]) => (
                <button
                  key={value}
                  onClick={() => setCategory(value)}
                  className={`rounded-lg px-4 py-2 font-bold ${
                    category === value
                      ? 'bg-blue-600 text-white'
                      : 'bg-white text-gray-700 shadow'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {filteredOffers.map((offer) => (
              <article
                key={offer.title}
                className="rounded-2xl bg-white p-5 shadow"
              >
                <div className="mb-3 flex justify-between gap-2">
                  <span className="rounded bg-blue-100 px-2 py-1 text-xs font-bold text-blue-800">
                    {offer.store}
                  </span>
                  <span className="rounded bg-orange-100 px-2 py-1 text-xs font-bold text-orange-800">
                    {offer.tag}
                  </span>
                </div>

                <h3 className="mb-3 text-lg font-bold">{offer.title}</h3>
                <p className="text-2xl font-black text-blue-600">
                  {offer.price}
                </p>
                <p className="mt-3 text-sm text-gray-500">
                  آخر تحديث: اليوم
                </p>
              </article>
            ))}
          </div>
        </main>

        <section id="vip" className="bg-gray-900 px-4 py-16 text-center text-white">
          <h2 className="mb-4 text-3xl font-black">
            عضوية VIP بـ 40 DKK شهريًا
          </h2>
          <p className="mx-auto mb-7 max-w-xl text-gray-300">
            يحصل الأعضاء الدافعون على تنبيهات حصرية عن العروض وأخطاء الأسعار عبر البريد الإلكتروني.
          </p>

          <div className="mx-auto max-w-md rounded-2xl bg-white p-7 text-gray-900 shadow-xl">
            <h3 className="mb-3 text-xl font-bold">اشتراك VIP شهري</h3>
            <p className="mb-5 text-3xl font-black text-orange-500">
              40 DKK
            </p>
            <button
              className="w-full rounded-lg bg-blue-600 py-3 font-bold text-white"
              onClick={() => alert('سيتم تفعيل الاشتراك قريبًا')}
            >
              اشترك الآن
            </button>
          </div>
        </section>

        <footer className="border-t bg-white px-4 py-8 text-center text-sm text-gray-500">
          <p>© 2026 TilbudJagt.dk - جميع الحقوق محفوظة</p>
          <p className="mt-2">
            <a href="/contact.html" className="mx-2 text-blue-600">
              تواصل معنا
            </a>
            <a href="/privacy.html" className="mx-2 text-blue-600">
              سياسة الخصوصية
            </a>
          </p>
        </footer>
      </div>
    </>
  );
}
