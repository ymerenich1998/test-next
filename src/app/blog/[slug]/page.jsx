import { notFound } from "next/navigation";
import ArticlePage from "@/components/blog/article";

/**
 * Article page for /blog/[id]
 * - Server component (app router)
 * - Fetches article by id from API or returns a placeholder
 */

/**
 * Fetch article from remote API or return null if not found.
 * Adjust NEXT_PUBLIC_API_URL environment variable to point to real backend.
 */
  async function fetchArticle(id) {
    const base = process.env.NEXT_PUBLIC_API_URL || "";
    if (base) {
      try {
        const res = await fetch(`${base.replace(/\/$/, "")}/posts/${id}`, {
          // no-store to always fetch fresh on server; change as needed
          cache: "no-store",
        });

        console.log(`Fetching article ${id} from ${base}/posts/${id}`);
        if (!res.ok) {
          if (res.status === 404) return null;
          throw new Error(`Fetch error: ${res.status}`);
        }
        return await res.json();
      } catch (err) {
        // логування на сервері
        // console.error(err);
        return null;
      }
    }

  // Локальна заглушка для розвитку, якщо бекенд не налаштований
  const demo = {
    id,
    title: `Демо-стаття #${id}`,
    author: "Автор (локально)",
    publishedAt: new Date().toISOString(),
    content: `<p>Це демо-контент для статті з id = <strong>${id}</strong>. Налаштуйте NEXT_PUBLIC_API_URL для підключення реального API.</p>`,
  };

  return demo;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = await fetchArticle(slug);
  if (!article) {
    return {
      title: "Стаття не знайдена",
    };
  }
  return {
    title: article.title,
    description: article.body
      ? article.body.replace(/<\/?[^>]+(>|$)/g, "").slice(0, 160)
      : undefined,
  };
}

export default async function Page({ params }) {
  const { slug } = await params;

  const article = await fetchArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <ArticlePage article={article} />
  );
}