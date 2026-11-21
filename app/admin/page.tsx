"use client";

import { useEffect, useState, type FormEvent } from "react";
import { ArrowRight, Check, KeyRound, Store as StoreIcon, Tag } from "lucide-react";
import { STORES, STORE_CATEGORIES, type StoreCategory } from "@/lib/stores";
import SiteNav from "@/components/site-nav";

const CATEGORY_KEYS = Object.keys(STORE_CATEGORIES) as StoreCategory[];

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [category, setCategory] = useState<StoreCategory>("dagligvarer");
  const [status, setStatus] = useState<"partner" | "directory">("directory");
  const [website, setWebsite] = useState("");
  const [affiliateUrl, setAffiliateUrl] = useState("");
  const [network, setNetwork] = useState("");
  const [descriptionDa, setDescriptionDa] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const saved = sessionStorage.getItem("tj_admin_pw");
    if (saved) setPassword(saved);
  }, []);

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .replace(/ø/g, "oe")
      .replace(/æ/g, "ae")
      .replace(/å/g, "aa")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setMessage("Gemmer…");
    sessionStorage.setItem("tj_admin_pw", password);
    try {
      const response = await fetch("/api/admin/stores", {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-admin-password": password },
        body: JSON.stringify({
          store: {
            name,
            slug: slug || slugify(name),
            category,
            status,
            website,
            affiliateUrl,
            network,
            descriptionDa,
          },
        }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setMessage(response.status === 401 ? "كلمة السر غير صحيحة." : data.error || "لم يتم الحفظ. تحقق من البيانات.");
      } else {
        setMessage("تم الحفظ. سيظهر المتجر على الموقع بعد دقيقة تقريبًا.");
        setName("");
        setSlug("");
        setWebsite("");
        setAffiliateUrl("");
        setDescriptionDa("");
      }
    } catch {
      setMessage("تعذر الاتصال بالخادم. حاول مرة أخرى.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <main dir="rtl">
      <header className="header wrap">
        <a className="brand" href="/">
          <span className="brand-mark"><Tag size={22} /></span>
          <span>Tilbud<span className="brand-accent">Jagt</span><small>.dk</small></span>
        </a>
        <SiteNav ariaLabel="القائمة">
          <a href="/#butikker">المتاجر</a>
          <a href="/">الرئيسية</a>
        </SiteNav>
      </header>

      <section className="wrap admin-section">
        <span className="eyebrow muted">ADMIN</span>
        <h1>إدارة المتاجر</h1>
        <p className="admin-intro">
          تُحفظ البيانات في ملف المتاجر داخل الموقع ثم يُعيد Vercel نشر الموقع
          تلقائيًا خلال دقيقة تقريبًا. أدخل كلمة سر الإدارة مرة واحدة؛ تبقى في هذا
          المتصفح فقط ولا تُحفظ في الخادم.
        </p>

        <form className="admin-card" onSubmit={submit}>
          <label className="admin-field">
            <span><KeyRound size={14} /> كلمة سر الإدارة</span>
            <div className="admin-token-row">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="كلمة السر"
                autoComplete="current-password"
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "إخفاء" : "إظهار"}
              </button>
            </div>
          </label>

          <div className="admin-grid">
            <label className="admin-field">
              <span>اسم المتجر</span>
              <input
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setSlug(slugify(event.target.value));
                }}
                placeholder="مثال: Normal"
                required
              />
            </label>
            <label className="admin-field">
              <span>الرابط في الموقع (slug)</span>
              <input
                value={slug}
                onChange={(event) => setSlug(slugify(event.target.value))}
                placeholder="normal"
                required
              />
            </label>
            <label className="admin-field">
              <span>التصنيف</span>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value as StoreCategory)}
              >
                {CATEGORY_KEYS.map((key) => (
                  <option key={key} value={key}>{STORE_CATEGORIES[key].da}</option>
                ))}
              </select>
            </label>
            <label className="admin-field">
              <span>الحالة</span>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value as "partner" | "directory")}
              >
                <option value="directory">رابط مباشر (بلا عمولة)</option>
                <option value="partner">شريك معتمد (رابط عمولة)</option>
              </select>
            </label>
          </div>

          <label className="admin-field">
            <span>موقع المتجر (https)</span>
            <input
              type="url"
              value={website}
              onChange={(event) => setWebsite(event.target.value)}
              placeholder="https://www.normal.dk"
              required
            />
          </label>

          {status === "partner" && (
            <div className="admin-grid">
              <label className="admin-field">
                <span>رابط العمولة (https)</span>
                <input
                  type="url"
                  value={affiliateUrl}
                  onChange={(event) => setAffiliateUrl(event.target.value)}
                  placeholder="https://www.awin1.com/cread.php?…"
                  required
                />
              </label>
              <label className="admin-field">
                <span>الشبكة</span>
                <input
                  value={network}
                  onChange={(event) => setNetwork(event.target.value)}
                  placeholder="Awin / Adtraction / Partner-ads"
                />
              </label>
            </div>
          )}

          <label className="admin-field">
            <span>وصف مختصر بالدنماركية</span>
            <textarea
              value={descriptionDa}
              onChange={(event) => setDescriptionDa(event.target.value)}
              rows={3}
              placeholder="Kort beskrivelse af butikken."
            />
          </label>

          <button className="admin-submit" type="submit" disabled={busy}>
            {busy ? "جارٍ الحفظ…" : "حفظ المتجر"} <ArrowRight size={16} />
          </button>
          {message && <p className="admin-message">{message}</p>}
        </form>

        <h2 className="admin-list-title"><StoreIcon size={18} /> المتاجر الحالية ({STORES.length})</h2>
        <ul className="admin-list">
          {STORES.map((store) => (
            <li key={store.slug}>
              <strong>{store.name}</strong>
              <small>{STORE_CATEGORIES[store.category].da}</small>
              <span className={store.status === "partner" ? "status-badge partner" : "status-badge directory"}>
                {store.status === "partner" ? <><Check size={11} /> شريك</> : "رابط مباشر"}
              </span>
              <a href={`/butikker/${store.slug}`}>عرض</a>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
