// Home page for the Star Wars Team Builder app
// Shows app title, description, and navigation to characters
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-yellow-300">
      {/* App Title */}
      <h1 className="text-5xl font-extrabold mb-6 drop-shadow-lg text-yellow-400 text-center">
        Welcome to the Star Wars Team Builder
      </h1>
      {/* App Description */}
      <p className="text-lg mb-8 text-center max-w-xl">
        Assemble your dream team of Star Wars characters!
        <br />
        Use the sidebar to explore characters and start building your squad.
        <br />
        May the Force be with you!
      </p>
      {/* Navigation button to characters page */}
      <div className="flex gap-4">
        <Link
          href="/characters"
          className="px-6 py-3 bg-yellow-500 text-black font-semibold rounded-lg shadow-lg hover:bg-yellow-600 transition-colors"
        >
          Go to Characters
        </Link>
      </div>
    </main>
  );
}
