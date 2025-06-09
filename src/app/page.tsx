
import { GET_BLOGS } from '@/lib/graphql';
import { ApolloClient, InMemoryCache } from '@apollo/client';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  created_at: string;
  updated_at: string;
}

export default async function Home() {
  const client = new ApolloClient({
    uri: 'https://directus.devmed.cz/graphql',
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: GET_BLOGS,
    variables: { limit: 10, offset: 0 }
  });

  const posts = data?.items?.blogs ?? [];

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        <div className="space-y-8">
          {posts.map((post: BlogPost) => (
            <article key={post.id} className="p-6 bg-white rounded-lg shadow-md">
              <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.content}</p>
              <div className="text-sm text-gray-500">
                Created: {new Date(post.created_at).toLocaleDateString()}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
