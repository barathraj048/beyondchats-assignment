import axios from "axios";

const API_BASE = "http://127.0.0.1:8000/api";

async function run() {
  console.log("🚀 Phase 2 started");

  // 1. Fetch all articles
  const res = await axios.get(`${API_BASE}/articles`);
  const articles = res.data;

  if (!articles.length) {
    console.log("❌ No articles found");
    return;
  }

  // 2. Pick latest article
  const article = articles[articles.length - 1];
  console.log("📝 Using article:", article.title);

  // 3. Fake AI enhanced content (TEMP)
  const enhancedContent = `
  ${article.title}

  This is an AI-enhanced version of the article.
  The original content has been improved for clarity,
  structure, and readability.

  ${article.content.substring(0, 500)}...
  `;

  // 4. Save enhanced content
  await axios.post(
    `${API_BASE}/articles/${article.id}/enhance`,
    { updated_content: enhancedContent }
  );

  console.log("✅ Enhanced content saved");
}

run();