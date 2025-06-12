import { GET_BLOGS_BY_ID } from '@/lib/graphql';
import { client } from '@/lib/graphql';
import parse from 'html-react-parser';

export default async function BlogDetail({ params }: { params: { id: string } }) {
  try {
    const { data } = await client.query({
      query: GET_BLOGS_BY_ID,
      variables: {
        id: params.id
      }
    });
    const post = data.contents_by_id;
    console.log(post.translations[0] );
    if (!post) {
      return <div className="text-red-500">Blog post not found</div>;
    }

    if (post.__typename === 'Error') {
      return <div className="text-red-500">Error: {post.message}</div>;
    }

    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center mb-4">
              <div className="text-sm text-gray-500">
                <h1 className="font-medium text-3xl">{post.translations[0].name}</h1>
                <span className="mx-2">•</span>
                <span>{post.theme?.name ?? "Reprodukce"}</span>
                <span className="mx-2">•</span>
                <span>{new Date(post.date_updated).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-4">
                <button className="text-gray-500 hover:text-gray-700" aria-label="Share on Facebook">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-gray-700" aria-label="Share on Twitter">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.954 2.943c-.885.392-1.83.654-2.826.776 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-gray-700" aria-label="Share on LinkedIn">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.023 16.925c0 6.627-5.373 12-12.025 12 2.478 0 4.86-1.32 6.862-3.5M6.835 10.189a4 4 0 013.465-3.904M1.196 18.827a4 4 0 014.753-4.025M6.256 7.789a4 4 0 013.464 5.453m5.887 3.534a11 11 0 01-5.43 1.07"/>
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mb-6">
              {post.labels?.map((label: any) => (
                <span key={label.label.name} className="bg-red-100 text-red-600 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {label.label.name}
                </span>
              ))}
            </div>
          </div>
            <div className="relative w-full h-96 mb-6">
              <img 
                src={`https://picsum.photos/480/320?random=${post.id}`} 
                alt={post.translations[0]?.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          <div className="p-6">
            <div className="mb-6">
              {parse(post.translations[0]?.content ?? '')}
            </div>
            <div className="space-y-4">
              <div>
                <p className="font-semibold mb-2">Issue:</p>
                <p>{post.issue}</p>
              </div>
              <div>
                <p className="font-semibold mb-2">Date Updated:</p>
                <p>{new Date(post.date_updated).toLocaleDateString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return <div className="text-red-500">Failed to load blog post. Please try again later.</div>;
  }
}
