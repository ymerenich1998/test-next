"use client"

import Link from "next/link";
import { parseAsString, useQueryStates } from "nuqs";

export default function PostsList({initialPosts}) {
  const [{ search }] = useQueryStates(
    {
      search: parseAsString.withDefault(""),
    }
  );

  const filteredPosts = search
    ? initialPosts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(search.toLowerCase())
      )
    : initialPosts;

  return(
    <>
    {initialPosts.length === 0 ? (
          <p>Публікацій не знайдено.</p>
        ) : filteredPosts.length === 0 ? (
          <p>За вашим запитом "{search}" нічого не знайдено.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "1rem" }}>
            {filteredPosts.map((post) => (
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
    </>
  )
}