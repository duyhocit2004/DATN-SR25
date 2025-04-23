<?php

namespace App\Repositories;

use App\Helpers\BaseResponse;
use App\Models\Comment;
use App\Models\Order;
use App\Models\OrderDetail;
use App\Models\Size;
use App\Models\Voucher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use function PHPUnit\Framework\isEmpty;

class CommentRepositories
{
    public function getComment($productId)
    {
        $comment = Comment::with('children')->whereNull('parent_id')->where('product_id', '=', $productId)->get();
        return $comment;
    }

    public function getCommentWithReply(Request $request)
    {
        $comment = Comment::with('children')->where('id', '=', $request->input('commentId'))->get();
        return $comment;
    }

    public function getParentCommentPaging(Request $request)
    {
        $productId = $request->get('productId', null);
        $productName = $request->get('productName', null);
        $content = $request->get('content', null);
        $rate = $request->get('rate', null);
        $phoneNumber = $request->get('phoneNumber', null);
        $page = $request->get('pageNum', 1);
        $perPage = $request->get('pageSize', 10);

        $query = Comment::query()->whereNull('parent_id')
            ->join('products', 'comment.product_id', '=', 'products.id')
            ->select('comment.*', 'products.name as product_name');

        if (!empty($productName)) {
            $query->where('products.name', 'like', '%' . $productName . '%');
        }
        if (!empty($productId)) {
            $query->where('product_id', '=', $productId);
        }
        if (!empty($content)) {
            $query->where('comment.content', 'like', '%' . $content . '%');
        }
        if (!empty($phoneNumber)) {
            $query->where('phone_number', '=', $phoneNumber);
        }
        if (!empty($rate)) {
            $query->where('comment.rate', '=', $rate);
        }

        $comments = $query->orderBy('created_at','desc')->paginate($perPage, ['*'], 'page', $page);
        return $comments;
    }

    public function addComment(Request $request)
    {
        $productId = $request->input('productId');
        $phoneNumber = $request->input('phoneNumber');
        
        // Check if user has already reviewed this product
        $existingReview = Comment::where('phone_number', $phoneNumber)
            ->where('product_id', $productId)
            ->first();

        if ($existingReview) {
            return BaseResponse::failure("400", "Sản phẩm này đã được bạn đánh giá", "already.reviewed", []);
        }

        // Find the most recent order for this phone number that contains this product
        $order = Order::where('phone_number', $phoneNumber)
            ->whereHas('order_details', function ($query) use ($productId) {
                $query->where('product_id', $productId);
            })
            ->orderBy('created_at', 'desc')
            ->first();

        if (!$order) {
            return BaseResponse::failure("400", "Cảm ơn bạn đã mua sản phẩm này", "order.not.found", []);
        }

        // Create the review
        $comment = Comment::create([
            'parent_id' => $request->input('parentId'),
            'product_id' => $productId,
            'content' => $request->input('content'),
            'rate' => $request->input('rate'),
            'phone_number' => $phoneNumber,
            'order_id' => $order->id,
        ]);

        // Update product average rating
        $averageRate = DB::table('comment')
            ->where('product_id', $productId)
            ->avg('rate');

        if ($averageRate !== null) {
            DB::table('products')
                ->where('id', $productId)
                ->update(['rate' => $averageRate]);
        }

        return $comment;
    }
}
