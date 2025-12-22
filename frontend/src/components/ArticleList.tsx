import { type Article } from '../types';

type Props = {
  articles: Article[];
  onSelect: (article: Article) => void;
};

export default function ArticleList({ articles, onSelect }: Props) {
  return (
    <div className="w-1/3 border-r overflow-y-auto">
      <h2 className="text-xl font-semibold p-4">Articles</h2>

      {articles.map((article) => (
        <button
          key={article.id}
          onClick={() => onSelect(article)}
          className="block w-full text-left p-4 hover:bg-gray-100 border-b"
        >
          {article.title}
        </button>
      ))}
    </div>
  );
}
