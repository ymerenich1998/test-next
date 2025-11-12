import PostsList from "@/components/blog/posts";
import { SearchBox } from "@/components/blog/search";
import Link from "next/link";
import { NuqsAdapter } from 'nuqs/adapters/next/app';
import { Suspense } from "react";
/**
 * Сторінка: Блоги (список)
 * Розташування: /app/blog/page.jsx (Next.js App Router)
 *
 * - Серверний компонент, що фетчить список постів (приклад з jsonplaceholder).
 * - Якщо у вас є свій API — поміняйте URL у getBlogs().
 */

export const metadata = {
  title: "Блог",
  description: "Останні публікації у блозі",
}

async function getBlogs() {
  // Замініть URL на ваш реальний ендпоінт (або /api/blogs)
  const base = process.env.NEXT_PUBLIC_API_URL || "";

  if (!base) {
    return [];
  }

  const res = await fetch(`${base}/posts?_limit=12`, {
    // кешування/рефетч: налаштуйте згідно потреб
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    // обробка помилок: повертаємо порожній масив, щоб сторінка не падала
    console.error("Failed to fetch blogs:", res.status);
    return [];
  }

  const data = await res.json();
  // jsonplaceholder повертає поле title/body; трансформуємо у просту структуру
  return data.map((p) => ({
    id: String(p.id),
    title: p.title ?? "Без назви",
    excerpt:
      (p.body && p.body.slice(0, 140) + (p.body.length > 140 ? "…" : "")) ?? "",
  }));
}

export default async function BlogPage() {

  const posts = await getBlogs();

  return (
    <NuqsAdapter>
      <main style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
        <header style={{ marginBottom: "1.5rem" }}>
          <h1 style={{ margin: 0 }}>Блоги</h1>
          <p style={{ color: "#555", marginTop: "0.5rem" }}>
            Останні публікації
          </p>
        </header>

        <SearchBox />
        <Suspense>
          <PostsList initialPosts={posts} />
        </Suspense>
      </main>
    </NuqsAdapter>
  );
}