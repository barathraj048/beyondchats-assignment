<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

class ArticleController extends Controller
{
    /**
     * GET /api/articles
     * Fetch all articles
     */
    public function index()
    {
        return Article::all();
    }

    /**
     * POST /api/articles
     * Store a new article
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            'title'   => 'required|string',
            'content' => 'required|string',
            'source'  => 'nullable|string',
        ]);

        return Article::create($data);
    }

    /**
     * PUT /api/articles/{id}/enhance
     * Update enhanced content
     */
    public function updateContent(Request $request, $id)
    {
        $request->validate([
            'updated_content' => 'nullable|string',
        ]);

        $article = Article::findOrFail($id);
        $article->updated_content = $request->updated_content;
        $article->save();

        return response()->json(['ok' => true]);
    }

    /**
     * GET /api/articles/count
     * Get count of scraped BeyondChats articles
     */
    public function count()
    {
        return response()->json([
            'count' => Article::where('source', 'beyondchats_blog')->count(),
        ]);
    }

    /**
     * GET /api/articles/exists?title=...
     * Check if an article already exists by title
     */
    public function exists(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
        ]);

        return response()->json([
            'exists' => Article::where('title', $request->title)->exists(),
        ]);
    }
}
