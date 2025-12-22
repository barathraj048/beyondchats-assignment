import { useEffect, useState } from "react";
import { fetchArticles } from "./api";
import ArticleList from "./components/ArticleList";
import ArticleViewer from "./components/ArticleViewer";
import {type Article} from "./types";



export default function App() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selected, setSelected] = useState<Article | null>(null);

  useEffect(() => {
    fetchArticles().then(setArticles);
  }, []);

  return (
    <div className="flex h-screen">
      <ArticleList articles={articles} onSelect={setSelected} />
      <ArticleViewer article={selected} />
    </div>
  );
}
