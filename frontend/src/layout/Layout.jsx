import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-200">
      <Navbar />
      <main className="pt-14 max-w-4xl mx-auto p-4">
        {children}
      </main>
    </div>
  );
}
