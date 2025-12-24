import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api/articles";

async function enhanceAllArticles() {
  console.log("Starting AI enhancement pipeline");

  const res = await axios.get(API_URL);
  const articles = res.data;

const pending = articles.filter(
  a => !a.updated_content && a.source === "original"
);

  console.log(` Found ${pending.length} articles to enhance`);

  for (const article of pending) {
    console.log(`Enhancing: ${article.title}`);

    const enhancedContent = `
 Enhanced Version

${article.content}

---

This article has been rewritten and enhanced for clarity, structure, and SEO.
    `.trim();

      await axios.put(`${API_URL}/${article.id}/enhance`, {
        updated_content: enhancedContent,
      });
    console.log(`Updated: ${article.title}`);
  }

  console.log("🎉 All articles enhanced");
}

enhanceAllArticles();
