  import axios from "axios";
  import * as cheerio from "cheerio";

  const BLOG_URL = "https://beyondchats.com/blogs/";
  const API_URL = "http://127.0.0.1:8000/api/articles";

  async function scrapeBlogs() {
    console.log("🚀 Starting blog scraping");

    const res = await axios.get(BLOG_URL);
    const $ = cheerio.load(res.data);

    const blogLinks = [];

    $("a").each((_, el) => {
      const href = $(el).attr("href");

      if (
        href &&
        href.startsWith("/blogs/") &&
        !href.includes("/tag/")
      ) {
        blogLinks.push(`https://beyondchats.com${href}`);
      }
    });

    const uniqueLinks = [...new Set(blogLinks)];
    const oldestBlogs = uniqueLinks.slice(-5);

    console.log("📄 Blogs to scrape:", oldestBlogs);

    for (const url of oldestBlogs) {
      await scrapeSingleBlog(url);
    }
  }

async function scrapeSingleBlog(url) {
  console.log(`➡️ Scraping: ${url}`);

  const res = await axios.get(url);
  const $ = cheerio.load(res.data);

  const title = $("h1").first().text().trim();

  const content = $(".blog-content, .entry-content, .post-content")
    .first()
    .text()
    .replace(/\s+/g, " ")
    .trim();

  console.log("📝 Title:", title);
  console.log("📏 Content length:", content.length);

  if (!title || content.length < 300) {
    console.log("⚠️ Skipping invalid article");
    return;
  }

  await axios.post(API_URL, {
    title,
    content,
    source: "original",
  });

  console.log(`✅ Saved: ${title}`);
}


  scrapeBlogs();
