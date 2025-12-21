import { useEffect, useState } from "react";

interface Article {
  id: number;
  title: string;
  content: string;
  source: string;
}

function App() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/api/articles")
      .then(res => res.json())
      .then(data => setArticles(data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Articles</h1>

      {articles.map(article => (
        <div key={article.id} style={{ marginBottom: 20 }}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
          <small>Source: {article.source}</small>
        </div>
      ))}
    </div>
  );
}

export default App;
