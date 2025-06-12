import { GET_SECTIONS_LIST, client } from "@/lib/graphql";
import Link from "next/link";

export default async function Nav() {
  const { data } = await client.query({
    query: GET_SECTIONS_LIST,
    variables: {
      limit: 7,
      offset: 0,
    },
  });

  return (
    <nav className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4 p-4 bg-white shadow-sm px-4 md:px-12">
      <div className="flex items-center justify-between w-full md:w-auto">
        <Link href="/" className="flex items-center">
          <img src="/logoPL.png" alt="Logo" className="h-8 w-auto" />
        </Link>
        <button
          className="md:hidden flex items-center px-3 py-2 text-gray-700 hover:text-gray-900"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
            <path
              fillRule="evenodd"
              d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
            />
          </svg>
        </button>
      </div>
      <div className="hidden md:flex items-center space-x-4">
        {data?.sections?.map((section: any) => (
          <Link
            key={section.id}
            href={`/section/${section.id}`}
            className="text-gray-700 hover:text-gray-900 transition-colors"
          >
            {section.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}
