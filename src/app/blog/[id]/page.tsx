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
        <div className="bg-white rounded-lg shadow-md p-6">
          {post.translations[0]?.image && (
            <div className="mb-6">
              <img 
                src={post.translations[0].image.filename_download}
                alt={post.translations[0].name}
                className="w-full rounded-lg"
              />
            </div>
          )}
          <h1 className="text-3xl font-bold mb-6">{post.translations[0]?.name}</h1>
          <div className="mb-6">
            {parse(post.translations[0]?.content || '')}
            <div className="flex flex-wrap gap-2 mb-6">
              {post.labels?.map((label: any) => (
                <span key={label.label.name} className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {label.label.name}
                </span>
              ))}
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
      </div>
    );
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return <div className="text-red-500">Failed to load blog post. Please try again later.</div>;
  }


}
