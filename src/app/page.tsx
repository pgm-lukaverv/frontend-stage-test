import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome to the Home Page</h1>
      <nav>
        <ul>
          <li>
            <Link href="/characters">Go to Characters Page</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
}
