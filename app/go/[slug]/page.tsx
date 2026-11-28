import { notFound, redirect } from "next/navigation";
import { getStore, isAffiliateLink } from "@/lib/stores";

type PageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ uid?: string | string[] }>;
};

const UID_PATTERN = /^[a-zA-Z0-9_-]{1,40}$/;

function campaignFrom(value: string | string[] | undefined): string {
  if (typeof value === "string" && UID_PATTERN.test(value)) return value;
  return "tilbudjagt";
}

/**
 * Only Partner-ads links get uid/uid2. Other networks use their own
 * tracking format and must not receive parameters they do not understand.
 */
function destinationFor(url: string, slug: string, campaign: string): string {
  if (!url.includes("partner-ads.com")) return url;
  try {
    const destination = new URL(url);
    destination.searchParams.set("uid", campaign);
    destination.searchParams.set("uid2", slug);
    return destination.toString();
  } catch {
    return url;
  }
}

export default async function GoPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const store = getStore(slug);
  if (!store || !isAffiliateLink(store) || !store.affiliateUrl) notFound();

  const { uid } = await searchParams;
  const campaign = campaignFrom(uid);
  redirect(destinationFor(store.affiliateUrl, store.slug, campaign));
}
