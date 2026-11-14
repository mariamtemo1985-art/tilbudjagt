import Link from "next/link";
import { signUpAction } from "@/app/auth/actions";

type Props = { searchParams: Promise<{ error?: string }> };

export default async function RegisterPage({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <main className="auth-page" dir="rtl">
      <section className="auth-card">
        <Link href="/" className="auth-brand">TilbudJagt.dk</Link>
        <h1>إنشاء حساب</h1>
        <p>أنشئ حساباً مجانياً لحفظ العروض ومتابعتها.</p>
        {params.error && <div className="auth-alert error">{params.error}</div>}
        <form action={signUpAction} className="auth-form">
          <label>الاسم (اختياري)<input name="display_name" type="text" autoComplete="name" maxLength={80} /></label>
          <label>البريد الإلكتروني<input name="email" type="email" autoComplete="email" required /></label>
          <label>كلمة المرور<input name="password" type="password" autoComplete="new-password" minLength={8} required /><small>8 أحرف على الأقل.</small></label>
          <button type="submit">إنشاء الحساب</button>
        </form>
        <p className="auth-switch">عندك حساب؟ <Link href="/login">سجّل الدخول</Link></p>
        <Link href="/" className="auth-back">العودة إلى الصفحة الرئيسية</Link>
      </section>
    </main>
  );
}
