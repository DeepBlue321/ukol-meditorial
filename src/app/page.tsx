

import { GET_BLOGS_LIST } from '@/lib/graphql';
import { client } from '@/lib/graphql';
import BlogCard from '@/components/BlogCard';
import LatestBlogCard from '@/components/LatestBlogCard';

export default async function Home() {
  const { data } = await client.query({
    query: GET_BLOGS_LIST,
    variables: {
      limit: 10,
      offset: 0,
      sort: ['id:desc']
    }
  });

  return (  
    <div className="   p-8 pb-20 gap-16 sm:p-20 ">
      <div className="max-w-4xl w-full">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        
        <div className="space-y-8">
          {/* Newest Blog Section */}
          {data.contents[0] && (
            <LatestBlogCard key={data.contents[0].id} post={data.contents[0]} />
          )}
          
          {/* Regular Blog Cards */}
          <div className="space-y-8">
            {data.contents.slice(1).map((post: any) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
   
  );
}
