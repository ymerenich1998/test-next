import CollapseList from "@/components/colapse-list";

const data = [
  {
    title: "About Our Company",
    content:
      "We are a leading company in our industry, committed to providing quality services and products to our customers.",
  },
  {
    title: "Our Mission",
    content:
      "Our mission is to innovate and lead the market while maintaining a strong focus on customer satisfaction and sustainability.",
  },
  {
    title: "Our Team",
    content:
      "Our team consists of experienced professionals dedicated to achieving excellence in every project we undertake.",
  },
  {
    title: "Contact Us",
    content:
      "Feel free to reach out to us via email or phone for any inquiries or support. We are here to help you.",
  }
]

export default function About() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
          About Us
        </h1>
        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400 mt-6">
          This is the about page of our Next.js application. Here you can find more information about our mission and values.
        </p>
        <CollapseList items={data} />
      </main>
    </div>
  );
}