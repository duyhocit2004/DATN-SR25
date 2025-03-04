<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\comments;
use App\Services\product\ProductService;
use App\Services\user\UserService;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public $ProductService;
    public $UserService;

    public function __construct(
        ProductService $ProductService,
        UserService $UserService
    ) {
        $this->ProductService = $ProductService;
        $this->UserService = $UserService;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $list = comments::latest()->paginate(10);

        return view('admin.comment.list', compact('list'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $product = $this->ProductService->getAllproduct();
        $user = $this->UserService->getAllUsers();

        return view('admin.comment.create', compact(['product', 'user']));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required',
        ]);

        comments::create([
            'products_id' => $request->products_id,
            'user_id' => $request->user_id,
            'content' => $request->content,
            'rating' => $request->rating,
        ]);

        return redirect()->route('comments.index');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $comment = comments::findOrFail($id);

        $product = $this->ProductService->getAllproduct();
        $user = $this->UserService->getAllUsers();

        return view('admin.comment.edit', compact('comment', ['product', 'user']));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $comment = comments::findOrFail($id);

        $request->validate([
            'content' => 'required'
        ]);

        $comment->update([
            'products_id' => $request->products_id,
            'user_id' => $request->user_id,
            'content' => $request->content,
            'rating' => $request->rating,
        ]);

        return redirect()->route('comments.index');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $comment = comments::findOrFail($id);

        $comment->delete($id);

        return redirect()->route('comment.index');
    }
}
