import Link from "next/link";
import { signInAction } from "@/app/auth/actions";

type Props = { searchParams: Promise<{ error?: string; message?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  return (
    <main className="auth-page" dir="rtl">
      <section className="auth-card">
        <Link href="/" className="auth-brand">TilbudJagt.dk</Link>
        <h1>تسجيل الدخول</h1>
        <p>ادخل إلى حسابك لمتابعة عروضك المحفوظة.</p>
        {params.error && <div className="auth-alert error">{params.error}</div>}
        {params.message && <div className="auth-alert success">{params.message}</div>}
        <form action={signInAction} className="auth-form">
          <label>البريد الإلكتروني<input name="email" type="email" autoComplete="email" required /></label>
          <label>كلمة المرور<input name="password" type="password" autoComplete="current-password" required /></label>
          <button type="submit">دخول</button>
        </form>
        <p className="auth-switch">ما عندك حساب؟ <Link href="/register">إنشاء حساب جديد</Link></p>
        <Link href="/" className="auth-back">العودة إلى الصفحة الرئيسية</Link>
      </section>
    </main>
  );
}
