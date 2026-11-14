"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const allowedCategories = new Set([
  "electronics", "home", "fashion", "groceries", "beauty", "sports", "travel", "other",
]);

export async function submitOfferAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const category = String(formData.get("category") ?? "");
  const productUrl = String(formData.get("product_url") ?? "").trim();
  const rawPrice = String(formData.get("price") ?? "").trim();
  const rawOldPrice = String(formData.get("original_price") ?? "").trim();

  if (title.length < 5 || title.length > 120 || description.length > 2000 || !allowedCategories.has(category)) {
    redirect("/submit?error=تحقق من عنوان العرض والتصنيف والشرح.");
  }
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(productUrl);
  } catch {
    redirect("/submit?error=رابط المنتج غير صحيح.");
  }
  if (parsedUrl.protocol !== "https:" || !parsedUrl.hostname.includes(".")) {
    redirect("/submit?error=استخدم رابط متجر آمن يبدأ بـ https.");
  }

  const parsePrice = (value: string) => {
    if (!value) return null;
    const normalized = value.replace(",", ".");
    if (!/^\d{1,8}(\.\d{1,2})?$/.test(normalized)) return Number.NaN;
    return Number(normalized);
  };
  const price = parsePrice(rawPrice);
  const originalPrice = parsePrice(rawOldPrice);
  if ((price !== null && (!Number.isFinite(price) || price < 0)) ||
      (originalPrice !== null && (!Number.isFinite(originalPrice) || originalPrice < 0))) {
    redirect("/submit?error=أدخل السعر بالأرقام وبالكرونة الدنماركية.");
  }

  let supabase;
  try {
    supabase = await createSupabaseServerClient();
  } catch {
    redirect("/submit?error=قاعدة البيانات غير مربوطة حالياً.");
  }
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login?error=سجّل الدخول قبل إضافة عرض.");

  const { error } = await supabase.from("offers").insert({
    created_by: user.id,
    title_da: title,
    description_da: description || null,
    category,
    price,
    original_price: originalPrice,
    product_url: parsedUrl.toString(),
    source: "community",
    status: "pending",
    is_sponsored: false,
  });
  if (error) redirect("/submit?error=لم نتمكن من إرسال العرض. حاول مرة أخرى.");
  redirect("/submit?success=1");
}
