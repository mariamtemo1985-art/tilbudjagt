import HomePage from "@/components/pages/home-page";
import { DEAL_CATEGORIES, getCategoryTotal } from "@/lib/deal-categories";

export default function Page() {
  const categoryLinks = DEAL_CATEGORIES.map((category) => ({
    slug: category.slug,
    h1: category.h1,
    count: getCategoryTotal(category),
  }));
  return <HomePage categoryLinks={categoryLinks} />;
}
