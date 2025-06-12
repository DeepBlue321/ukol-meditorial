import { GET_BLOGS_BY_ID } from "@/lib/graphql";
import { client } from "@/lib/graphql";
import parse from "html-react-parser";
import { Labels } from "@/components/Label";

interface HTMLNode {
  name: string;
  attribs: Record<string, string>;
  children: HTMLNode[];
  data?: string;
}

function isHTMLNode(node: any): node is HTMLNode {
  return typeof node === "object" && node !== null && "name" in node;
}

function Socials() {
  return (
    <div className="flex items-center gap-4">
      <button
        className="text-gray-500 hover:text-gray-700"
        aria-label="Share on Facebook"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
        </svg>
      </button>
      <button
        className="text-gray-500 hover:text-gray-700"
        aria-label="Share on Twitter"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.954 2.943c-.885.392-1.83.654-2.826.776 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
        </svg>
      </button>
      <button
        className="text-gray-500 hover:text-gray-700"
        aria-label="Share on LinkedIn"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.954 2.943c-.885.392-1.83.654-2.826.776 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
        </svg>
      </button>
    </div>
  );
}
export default async function BlogDetail({
  params,
}: {
  params: { id: string };
}) {
  try {
    const { data } = await client.query({
      query: GET_BLOGS_BY_ID,
      variables: {
        id: params.id,
      },
    });
    const post = data.contents_by_id;

    if (!post) {
      return <div className="text-red-500">Blog post not found</div>;
    }

    if (post.__typename === "Error") {
      return <div className="text-red-500">Error: {post.message}</div>;
    }

    return (
      <div className="max-w-4xl mx-auto p-8">
        <div className="bg-white ">
          <div className="border-b border-gray-300 pb-8 flex flex-col gap-4 my-10">
            <p className="text-neutral-400">proLékaře</p>
            <Labels labels={post.labels} />
            <div className="flex flex-col justify-start items-start mb-4">
              <h1 className="font-medium text-4xl font-lora">
                {post.translations[0].name}
              </h1>
              <div className="flex items-center justify-between w-full">
                <div className="text-sm flex text-gray-500">
                  <span className="">Téma:</span>
                  <span>{post.theme?.name ?? "Reprodukce"}</span>
                  <span className="mx-2">|</span>
                  <span>
                    {new Date(post.date_updated).toLocaleDateString()}
                  </span>
                </div>
                <Socials />
              </div>
            </div>
          </div>
          <div className="relative w-full h-96 mb-6">
            <img
              src={`https://picsum.photos/480/320?random=${post.id}`}
              alt={post.translations[0]?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="">
            <div className="mb-6">
              {parse(post.translations[0]?.content ?? "", {
                replace: (domNode) => {
                  if (isHTMLNode(domNode) && domNode.name === "h2") {
                    return (
                      <h2 className="text-2xl mb-8 text-neutral-900 font-lora">
                        {domNode.children?.map((child) => child.data).join("")}
                      </h2>
                    );
                  }
                  if (isHTMLNode(domNode) && domNode.name === "p") {
                    return (
                      <p className="mb-8">
                        {domNode.children?.map((child) => child.data).join("")}
                      </p>
                    );
                  }
                },
              })}
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return (
      <div className="text-red-500">
        Failed to load blog post. Please try again later.
      </div>
    );
  }
}
