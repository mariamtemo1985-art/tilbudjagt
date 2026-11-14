"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function redirectWithMessage(path: string, key: "error" | "message", value: string): never {
  redirect(`${path}?${key}=${encodeURIComponent(value)}`);
}

export async function signInAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) redirectWithMessage("/login", "error", "اكتب البريد الإلكتروني وكلمة المرور.");

  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    redirectWithMessage("/login", "error", "تسجيل الدخول غير متاح حالياً؛ قاعدة البيانات لم تُربط بعد.");
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) redirectWithMessage("/login", "error", "تعذر تسجيل الدخول. تحقق من البريد وكلمة المرور.");
  redirect("/account");
}

export async function signUpAction(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const displayName = String(formData.get("display_name") ?? "").trim().slice(0, 80);
  if (!email || password.length < 8) {
    redirectWithMessage("/register", "error", "أدخل بريداً صحيحاً وكلمة مرور من 8 أحرف على الأقل.");
  }

  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    redirectWithMessage("/register", "error", "إنشاء الحساب غير متاح حالياً؛ قاعدة البيانات لم تُربط بعد.");
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName, preferred_language: "da" } },
  });
  if (error) redirectWithMessage("/register", "error", "تعذر إنشاء الحساب. قد يكون البريد مستخدماً أو إعدادات التسجيل غير مكتملة.");
  redirectWithMessage("/login", "message", "تم إرسال رسالة تأكيد إلى بريدك الإلكتروني إذا كان تأكيد البريد مفعّلاً.");
}

export async function signOutAction() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}
