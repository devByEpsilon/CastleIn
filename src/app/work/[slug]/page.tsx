import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { artworks, getArtworkBySlug, getAdjacentArtworks } from "@/features/artworks/data";
import { ArtworkDetail } from "@/features/artworks/components/ArtworkDetail";

export function generateStaticParams() {
  return artworks.map((artwork) => ({ slug: artwork.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);
  if (!artwork) return {};
  return {
    title: artwork.title,
    description: artwork.description,
    openGraph: {
      title: `${artwork.title} — کسلین`,
      description: artwork.description,
      images: [artwork.image.src],
    },
  };
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);
  if (!artwork) notFound();

  const { previous, next } = getAdjacentArtworks(slug);

  return <ArtworkDetail artwork={artwork} previous={previous} next={next} />;
}
