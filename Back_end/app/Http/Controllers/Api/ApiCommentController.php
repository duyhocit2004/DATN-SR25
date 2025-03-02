<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\comments;
use Dom\Comment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApiCommentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $listComment = comments::get();
        // $list = $listComment->map(function ($query) {
        //     return [
        //         'products' => $query->product->name_product,
        //         'user' => $query->user->name,
        //         'content' => $query->content,
        //         'rating' => $query->rating
        //     ];
        // });
        return response()->json([
            'data' => $listComment,
            'success' => 'thành công',

        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = $request->user(); // Lấy thông tin người dùng đã đăng nhập
        $param = $request->all(); // Lấy tất cả dữ liệu từ yêu cầu

        if (Auth::check()) {
            // Kiểm tra xem người dùng đã đăng nhập
            $comment = comments::create([
                'user_id' => $user->id,
                'products_id' => $param['products_id'],
                'content' => $param['content'],
                'rating' => $param['rating']
            ]);

            return response()->json([
                'success' => "Thêm thành công",
                'data' => $comment // Trả về bình luận vừa được thêm
            ], 201); // Mã trạng thái 201 cho việc tạo thành công
        } else {
            return response()->json([
                'error' => "Bạn cần đăng nhập để thêm bình luận."
            ], 401); // Mã trạng thái 401 cho yêu cầu không hợp lệ
        }
    }
    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
