import GuidePage from "@/components/pages/guide-page";

export {
  generateMetadata,
  generateStaticParams,
} from "@/components/pages/guide-page";

export const dynamicParams = true;
export const revalidate = 3600;

type PageProps = { params: Promise<{ slug: string }> };

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <GuidePage slug={slug} lang="da" />;
}
