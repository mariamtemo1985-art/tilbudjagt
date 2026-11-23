import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { submitOfferAction } from "@/app/submit/actions";

type Props = { searchParams: Promise<{ error?: string; success?: string }> };

export default async function SubmitOfferPage({ searchParams }: Props) {
  const params = await searchParams;
  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    return <main className="auth-page" dir="rtl"><section className="auth-card"><h1>إضافة عرض</h1><p>إرسال العروض سيتاح بعد ربط قاعدة البيانات.</p><Link href="/">العودة للرئيسية</Link></section></main>;
  }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect(`/login?error=${encodeURIComponent("سجّل الدخول قبل إضافة عرض.")}`);

  return (
    <main className="auth-page" dir="rtl">
      <section className="auth-card submit-card">
        <Link href="/" className="auth-brand">TilbudJagt.dk</Link>
        <h1>شارك عرضاً مع المجتمع</h1>
        <p>كل العروض تمر بالمراجعة قبل ظهورها للزوار. لا تضف روابط مختصرة أو روابط غير موثوقة.</p>
        {params.error && <div className="auth-alert error">{params.error}</div>}
        {params.success && <div className="auth-alert success">وصلنا عرضك! سيظهر بعد مراجعته والموافقة عليه.</div>}
        <form action={submitOfferAction} className="auth-form">
          <label>اسم المنتج أو العرض<input name="title" required minLength={5} maxLength={120} /></label>
          <label>التصنيف
            <select name="category" required defaultValue="electronics">
              <option value="electronics">إلكترونيات</option><option value="home">المنزل</option>
              <option value="fashion">الأزياء</option><option value="groceries">مواد غذائية</option>
              <option value="beauty">الجمال</option><option value="sports">رياضة وترفيه</option>
              <option value="travel">السفر</option><option value="other">أخرى</option>
            </select>
          </label>
          <label>السعر الحالي (DKK)<input name="price" inputMode="decimal" placeholder="مثلاً 199" /></label>
          <label>السعر السابق (DKK)<input name="original_price" inputMode="decimal" placeholder="مثلاً 299" /></label>
          <label>رابط صفحة المنتج (يجب أن يبدأ بـ https)<input name="product_url" type="url" required placeholder="https://butik.dk/produkt" /></label>
          <label>تفاصيل إضافية<textarea name="description" rows={4} maxLength={2000} /></label>
          <button type="submit">إرسال للمراجعة</button>
        </form>
        <Link href="/" className="auth-back">العودة إلى الصفحة الرئيسية</Link>
      </section>
    </main>
  );
}
