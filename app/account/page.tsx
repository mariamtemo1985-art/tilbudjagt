import Link from "next/link";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { signOutAction } from "@/app/auth/actions";

export default async function AccountPage() {
  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    redirect("/login?error=قاعدة البيانات لم تُربط بعد.");
  }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  return (
    <main className="auth-page" dir="rtl">
      <section className="auth-card">
        <Link href="/" className="auth-brand">TilbudJagt.dk</Link>
        <h1>حسابي</h1>
        <p>أهلاً بك. تم تسجيل دخولك بنجاح.</p>
        <div className="account-email"><strong>البريد الإلكتروني</strong><span>{user.email}</span></div>
        <p className="account-note">سيظهر هنا لاحقاً ملفك الشخصي والعروض المحفوظة وعضوية VIP بعد ربط قاعدة البيانات.</p>
        <form action={signOutAction}><button type="submit">تسجيل الخروج</button></form>
        <Link href="/" className="auth-back">العودة إلى العروض</Link>
      </section>
    </main>
  );
}
