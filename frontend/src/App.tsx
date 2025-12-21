import { useEffect, useState } from "react";
import Header from "./header";

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
    <div className="w-screen">
      <Header/>
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Articles list</h2>
      </main>
    </div>
  );
}

export default App;
