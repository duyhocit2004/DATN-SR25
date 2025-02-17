<?php

namespace App\Http\Controllers\Api;


use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;

class ApiPostController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    // Lấy danh sách tất cả bài viết
    public function index()
    {
        return response()->json(Post::all(), 200);
    }

    // public function create()
    // {
    //     // return response()->json([]);
    // }

    // Tạo mới bài viết
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'content' => 'required',
            'author' => 'required|string|max:255',
            'image' => 'nullable|string',
            'publish_date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $post = Post::create($request->all());

        return response()->json($post, 201);
    }



    // Lấy chi tiết một bài viết
    public function show($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        return response()->json($post, 200);
    }

    // Cập nhật bài viết
    public function update(Request $request, $id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'string|max:255',
            'content' => 'string',
            'author' => 'string|max:255',
            'image' => 'nullable|string',
            'publish_date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $post->update($request->all());

        return response()->json($post, 200);
    }

    // Xóa bài viết
    public function destroy($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        $post->delete();

        return response()->json(['message' => 'Post deleted successfully'], 200);
    }
    
}
