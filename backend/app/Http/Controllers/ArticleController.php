<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;

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
        return Article::create($request->all());
    }
}
