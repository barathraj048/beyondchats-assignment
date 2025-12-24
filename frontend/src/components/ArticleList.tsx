import { type Article } from '../types';

type Props = {
  articles: Article[];
  onSelect: (article: Article) => void;
  selectedId?: number;
};

export default function ArticleList({
  articles,
  onSelect,
  selectedId,
}: Props) {
  return (
    <aside className="w-1/3 border-r bg-white overflow-y-auto">
      <div className="sticky top-0 bg-white z-10 border-b">
        <h2 className="text-lg font-semibold px-5 py-4">
          Articles
        </h2>
      </div>

      <div className="divide-y">
        {articles.map((article) => {
          const isActive = article.id === selectedId;

          return (
            <button
              key={article.id}
              onClick={() => onSelect(article)}
              className={`
                w-full text-left px-5 py-4 transition
                hover:bg-gray-50
                ${isActive ? 'bg-gray-100' : ''}
              `}
            >
              <p className="font-medium text-gray-900 line-clamp-2">
                {article.title}
              </p>

              <p className="text-xs text-gray-500 mt-1">
                BeyondChats Blog
              </p>
            </button>
          );
        })}
      </div>
    </aside>
  );
}
