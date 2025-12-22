type Article = {
  title: string;
  content: string;
  updated_content?: string | null;
};

type Props = {
  article: Article | null;
};

export default function ArticleViewer({ article }: Props) {
  if (!article) {
    return (
      <div className="w-2/3 p-6 text-gray-500">
        Select an article to view
      </div>
    );
  }

  return (
    <div className="w-2/3 p-6 space-y-6 overflow-y-auto">
      <h1 className="text-2xl font-bold">{article.title}</h1>

      <div>
        <h2 className="text-lg font-semibold mb-2">Original Content</h2>
        <p className="whitespace-pre-line text-gray-800">
          {article.content}
        </p>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Enhanced Content</h2>

        {article.updated_content ? (
          <p className="whitespace-pre-line text-gray-800">
            {article.updated_content}
          </p>
        ) : (
          <p className="text-gray-400 italic">
            Not enhanced yet
          </p>
        )}
      </div>
    </div>
  );
}
