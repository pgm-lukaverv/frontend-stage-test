import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-gray-900 border-r border-yellow-500 shadow-lg p-6 flex flex-col">
      <h1 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
        Star Wars DB
      </h1>
      <nav className="flex flex-col space-y-4">
        <Link
          href="/"
          className="text-yellow-300 hover:text-yellow-400 font-semibold"
        >
          Home
        </Link>
        <Link
          href="/characters"
          className="text-yellow-300 hover:text-yellow-400 font-semibold"
        >
          Characters
        </Link>
      </nav>
    </aside>
  );
}
