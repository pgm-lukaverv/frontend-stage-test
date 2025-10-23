import Link from "next/link";

export default function Sidebar() {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed top-0 left-0 h-full w-64 bg-gray-900 border-r border-yellow-500 shadow-lg p-6 flex-col z-40">
        <h1 className="text-2xl font-bold text-yellow-400 mb-6 text-center">
          Star Wars Team Builder
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
          <Link
            href="/team"
            className="text-yellow-300 hover:text-yellow-400 font-semibold"
          >
            Team
          </Link>
        </nav>
      </aside>
      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-gray-900 border-t border-yellow-500 shadow-lg flex justify-around items-center py-2 z-50">
        <Link
          href="/"
          className="flex flex-col items-center text-yellow-300 hover:text-yellow-400 font-semibold"
        >
          <span className="text-xl">🏠</span>
          <span className="text-xs">Home</span>
        </Link>
        <Link
          href="/characters"
          className="flex flex-col items-center text-yellow-300 hover:text-yellow-400 font-semibold"
        >
          <span className="text-xl">👤</span>
          <span className="text-xs">Characters</span>
        </Link>
        <Link
          href="/team"
          className="flex flex-col items-center text-yellow-300 hover:text-yellow-400 font-semibold"
        >
          <span className="text-xl">🗡️</span>
          <span className="text-xs">Team</span>
        </Link>
      </nav>
    </>
  );
}
