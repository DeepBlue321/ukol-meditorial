import Link from 'next/link';

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
  console.log(post);
  return (
    <div className="bg-white border-b-2 border-gray-200">
      <Link
        href={`/blog/${post.id}`}
        className="block hover:bg-gray-50 transition-colors"
      >
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-wrap justify-end gap-2 mb-4">
              {(post.labels.length > 0 ? post.labels : [{label: {name: "Technologie"}}])?.map((label: any) => (
                <span key={label.label.name} className="text-red-600 text-sm font-medium px-2.5 py-0.5">
                  {label.label.name}
                </span>
              ))}
            </div>
        <div className="flex gap-6">
          <div className="flex-shrink-0 w-48 h-32">
            <img 
              src={`https://picsum.photos/480/320?random=${post.id}`} 
              alt={post.translations[0]?.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-grow">
            <div className="flex flex-col justify-between items-start mb-4">
              <h2 className="text-2xl font-semibold">{post.translations[0]?.name}</h2>
              <div className="flex items-center text-sm text-gray-500">
                <span>{new Date(post.date_updated).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span>{post.theme?.name ?? "Reprodukce"}</span>
              </div>
            </div>
          </div>
        </div>
            <p className="text-gray-600">{post.translations[0]?.perex}</p>
        </div>

      </Link>
    </div>
  );
}
