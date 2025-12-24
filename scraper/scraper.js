import axios from "axios";
import * as cheerio from "cheerio";

const BLOG_LIST_URL = "https://beyondchats.com/blogs/";
const BACKEND_API_URL = "http://127.0.0.1:8000/api/articles";
const TARGET_COUNT = 5;

function isValidBlogTitle(title) {
  if (!title) return false;

  const normalized = title.toLowerCase().trim();
  const blockedTitles = [
    "beyondchats blogs",
    "blogs",
    "blog",
    "beyondchats",
  ];

  if (blockedTitles.includes(normalized)) return false;
  if (normalized.length < 10) return false;

  return true;
}

function extractHtmlContent($) {
  const selectors = [
    ".entry-content",
    "article .content",
    "[class*='post-content']",
    "[class*='article-content']",
    "main article",
    "article",
  ];

  let bestHtml = "";

  for (const selector of selectors) {
    const container = $(selector).first();
    if (!container.length) continue;

    container.find("script, style, nav, footer").remove();

    const html = container
      .find("h2, h3, h4, p, ul, ol, li")
      .map((_, el) => $.html(el))
      .get()
      .join("\n");

    if (html.length > bestHtml.length) {
      bestHtml = html;
    }
  }

  return bestHtml.trim();
}

async function scrapeBlogs() {
  try {
    const countRes = await axios.get(`${BACKEND_API_URL}/count`);
    let currentCount = countRes.data.count;

    if (currentCount >= TARGET_COUNT) return;

    const blogLinks = new Set();
    const pagesToCheck = [
      BLOG_LIST_URL,
      `${BLOG_LIST_URL}?page=1`,
      `${BLOG_LIST_URL}page/1/`,
      `${BLOG_LIST_URL}page/2/`,
    ];

    for (const pageUrl of pagesToCheck) {
      if (currentCount >= TARGET_COUNT) break;

      try {
        const response = await axios.get(pageUrl);
        const $ = cheerio.load(response.data);

        $("a").each((_, el) => {
          const href = $(el).attr("href");
          if (!href) return;

          const isValid =
            href.includes("/blogs/") &&
            !href.includes("/tag/") &&
            !href.includes("/category/") &&
            href !== "/blogs/" &&
            href !== "/blogs";

          if (isValid) {
            const fullUrl = href.startsWith("http")
              ? href
              : `https://beyondchats.com${href}`;
            blogLinks.add(fullUrl);
          }
        });
      } catch (e){
        console.error(`Error fetching page ${pageUrl}:`, e.message);
      }
    }

    for (const url of blogLinks) {
      if (currentCount >= TARGET_COUNT) break;

      const saved = await scrapeSingleBlog(url);
      if (saved) currentCount++;
    }
  } catch (e){
    console.error("Error in scrapeBlogs:", e.message);
  }
}

async function scrapeSingleBlog(url) {
  try {
    if (url.endsWith("/blogs") || url.endsWith("/blogs/")) return false;

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const title =
      $("h1").first().text().trim() ||
      $("title").text().split("|")[0].trim();

    if (!isValidBlogTitle(title)) return false;

    const existsRes = await axios.get(
      `${BACKEND_API_URL}/exists`,
      { params: { title } }
    );

    if (existsRes.data.exists) return false;

    const content = extractHtmlContent($);
    if (!content || content.length < 500) return false;

    await axios.post(BACKEND_API_URL, {
      title,
      content,
      source: "beyondchats_blog",
    });

    return true;
  } catch {
    return false;
  }
}

scrapeBlogs();
