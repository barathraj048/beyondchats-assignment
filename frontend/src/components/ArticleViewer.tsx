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
      <div className="w-2/3 flex items-center justify-center text-gray-400">
        Select an article to view
      </div>
    );
  }

  return (
    <main className="w-2/3 p-8 overflow-y-auto bg-gray-50">
      <article className="max-w-4xl mx-auto space-y-10">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          {article.title}
        </h1>

        {/* Original Content */}
        <section className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">
            Original Content
          </h2>

          <div
            className="prose prose-lg prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </section>

        {/* Enhanced Content */}
        <section className="bg-white rounded-xl border shadow-sm p-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase mb-4">
            Enhanced Content
          </h2>

          {article.updated_content ? (
            <div
              className="prose prose-lg prose-slate max-w-none"
              dangerouslySetInnerHTML={{
                __html: article.updated_content,
              }}
            />
          ) : (
            <p className="text-gray-400 italic">
              Not enhanced yet
            </p>
          )}
        </section>
      </article>
    </main>
  );
}
