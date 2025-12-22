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


}
