<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ArticleController extends Controller
{
    // GET request to /api/articles
    public function index()
    {
        return Article::all();
    }

    // POST request to /api/articles
public function store(Request $request)
{
    $data = $request->validate([
        'title' => 'required|string',
        'content' => 'required|string',
        'source' => 'nullable|string',
    ]);

    return Article::create($data);
}

public function updateContent(Request $request, $id)
{
    Log::info('Enhance request hit', [
        'id' => $id,
        'payload' => $request->all(),
    ]);

    $article = Article::findOrFail($id);

    $article->updated_content = $request->input('updated_content');
    $article->save();

    return response()->json(['ok' => true]);
}

}
