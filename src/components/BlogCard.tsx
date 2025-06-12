import Link from "next/link";
import { Labels } from "./Label";

interface BlogCardProps {
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

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="bg-white border-b-2 border-gray-200 m-6 pb-8">
      <Link
        href={`/blog/${post.id}`}
        className="block hover:bg-gray-50 transition-colors"
      >
        <div className="flex flex-col gap-6 w-full ">
          <Labels labels={post.labels} className="justify-end" />
          <div className="flex gap-10">
            <div className="flex-shrink-0 w-48 h-32">
              <img
                src={`https://picsum.photos/480/320?random=${post.id}`}
                alt={post.translations[0]?.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-grow">
              <div className="flex flex-col justify-between items-start mb-4 gap-4  ">
                <h2 className="text-2xl font-semibold">
                  {post.translations[0]?.name}
                </h2>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="font-bold">{`Téma: ${
                    post.theme?.name ?? "Reprodukce"
                  }`}</span>
                  <span className="mx-2">|</span>
                  <span>
                    {new Date(post.date_updated).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <p className="text-gray-600 font-extralight">
            {post.translations[0]?.perex}
          </p>
        </div>
      </Link>
    </div>
  );
}
