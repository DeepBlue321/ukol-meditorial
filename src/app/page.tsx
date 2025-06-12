import { GET_BLOGS_LIST } from "@/lib/graphql";
import { client } from "@/lib/graphql";
import BlogCard from "@/components/BlogCard";
import LatestBlogCard from "@/components/LatestBlogCard";

export default async function Home() {
  try {
    const today = new Date().toISOString().split("T")[0];
    const { data, error } = await client.query({
      query: GET_BLOGS_LIST,
      variables: {
        limit: 20,
        offset: 0,
        sort: ["-public_from"],
        today,
      },
    });

    if (error) {
      console.error("GraphQL error:", error);
      return (
        <div className="p-8 pb-20 sm:p-20">
          <div className="max-w-4xl w-full">
            <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
            <div className="text-red-500 text-center">
              {error.message ||
                "Failed to load blog posts. Please try again later."}
            </div>
          </div>
        </div>
      );
    }

    if (!data?.contents?.length) {
      return (
        <div className="p-8 pb-20 sm:p-20">
          <div className="max-w-4xl w-full">
            <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
            <div className="text-gray-500 text-center">
              No blog posts found.
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="p-8 pb-20 sm:p-20 flex justify-center">
        <div className="max-w-4xl w-full">
          <div className="mx-4 my-8 border-b-2 border-gray-200 space-y-4 py-4 ">
            <p className="text-neutral-400">proLékaře</p>
            <h1 className="text-4xl font-bold font-lora">Články</h1>
          </div>

          <div className="space-y-8">
            {data.contents[0] && (
              <LatestBlogCard
                key={data.contents[0].id}
                post={data.contents[0]}
              />
            )}

            <div className="space-y-8">
              {data.contents.slice(1).map((post: any) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return (
      <div className="p-8 pb-20 sm:p-20">
        <div className="max-w-4xl w-full">
          <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
          <div className="text-red-500 text-center">
            {error instanceof Error
              ? error.message
              : "An unexpected error occurred."}
          </div>
        </div>
      </div>
    );
  }
}
