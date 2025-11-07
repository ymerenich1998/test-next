import Image from "next/image";

export default function ArticlePage({ article }) {
  return(
    <main style={{ padding: 24, maxWidth: 900, margin: "0 auto" }}>
      <article>
        <header>
          <div className="relative aspect-[600/400]">
            <Image src={"/test.jpg"} fill alt={article.title} quality={85} className=" w-full h-full object-cover" />
          </div>
          <h1 style={{ margin: "0 0 8px 0" }}>{article.title}</h1>
          <div style={{ color: "#666", fontSize: 14, marginBottom: 18 }}>
            <span>{article.author}</span>
            {" • "}
            <time dateTime={article.publishedAt}>
              {new Date(article.publishedAt).toLocaleString()}
            </time>
          </div>
        </header>

        <section
          style={{ lineHeight: 1.7, fontSize: 18 }}
        />

        <p>
          {article.body}
        </p>

        <footer style={{ marginTop: 40, color: "#888", fontSize: 14 }}>
          <p>Підписуйтесь на оновлення блогу.</p>
        </footer>
      </article>
    </main>
  )
}