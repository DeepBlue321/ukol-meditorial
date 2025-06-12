import { GET_SECTIONS_LIST, client } from '@/lib/graphql';
import Link from 'next/link';

export default async function Nav() {
  const { data } = await client.query({
    query: GET_SECTIONS_LIST,
    variables: {
      limit: 7,
      offset: 0
    }
  });

  return (
    <nav className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4 p-4 bg-white shadow-sm">
      
        <Link href="/" className="flex items-center">
          <img src="/logoPL.png" alt="Logo" className="h-8 w-auto" />
        </Link>
      <div className="flex items-center space-x-4 ">
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
