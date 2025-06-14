import Link from "next/link";
import { Labels } from "./Label";

interface LatestBlogCardProps {
  post: {
    readonly id: string;
    readonly translations: ReadonlyArray<{
      readonly name: string;
      readonly perex: string;
    }>;
    readonly labels: ReadonlyArray<{
      readonly label: {
        readonly name: string;
      };
    }>;
    readonly date_updated: string;
    readonly theme: {
      readonly name: string;
    };
  };
}

export default function LatestBlogCard({ post }: LatestBlogCardProps) {
  return (
    <div className="bg-white border-b-2 border-gray-200 pb-8  mx-6 ">
      <Link
        href={`/blog/${post.id}`}
        className="block hover:bg-gray-50 transition-colors"
      >
        <div className="flex flex-col gap-4 ">
          <h2 className="text-3xl font-bold mb-2">
            {post.translations[0]?.name}
          </h2>

          <div className="relative w-full h-64 mb-6">
            <img
              src={`https://picsum.photos/800/480?random=${post.id}`}
              alt={post.translations[0]?.name}
              className="w-full h-full object-cover "
            />
          </div>
          <Labels labels={post.labels} />
          <div className="flex flex-col justify-between items-start mb-4">
            <div className="flex items-center text-sm text-gray-500">
              <span>{new Date(post.date_updated).toLocaleDateString()}</span>
            </div>
          </div>
          <p className="text-gray-600 text-lg leading-relaxed">
            {post.translations[0]?.perex}
          </p>
        </div>
      </Link>
    </div>
  );
}
