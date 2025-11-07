import Link from "next/link";

/**
 * Сторінка: Блоги (список)
 * Розташування: /app/blog/page.jsx (Next.js App Router)
 *
 * - Серверний компонент, що фетчить список постів (приклад з jsonplaceholder).
 * - Якщо у вас є свій API — поміняйте URL у getBlogs().
 */

export const metadata={
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
    <main style={{ padding: "2rem", maxWidth: 900, margin: "0 auto" }}>
      <header style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ margin: 0 }}>Блоги</h1>
        <p style={{ color: "#555", marginTop: "0.5rem" }}>
          Останні публікації
        </p>
      </header>

      {posts.length === 0 ? (
        <p>Публікацій не знайдено.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "1rem" }}>
          {posts.map((post) => (
            <li
              key={post.id}
              style={{
                padding: "1rem",
                border: "1px solid #e6e6e6",
                borderRadius: 8,
                background: "#fff",
                transition: "box-shadow .15s ease",
              }}
            >
              <Link
                href={`/blog/${post.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <h2 style={{ margin: "0 0 .5rem 0", fontSize: "1.125rem" }}>
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p style={{ margin: 0, color: "#444" }}>{post.excerpt}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}