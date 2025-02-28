<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\categories;
use Illuminate\Http\Request;

class ApiCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return response()->json(categories::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category = categories::create([
            'name' => $request->name,
        ]);

        return response()->json(['message' => 'Thêm danh mục thành công', 'category' => $category], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $category = categories::query()->findOrFail($id);

        return response()->json(['data' => $category], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = categories::query()->findOrFail($id);

        $params = $request->all();

        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $category->update($params);

        return response()->json(['message' => 'Cập nhật thành công', 'categories' => $category], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = categories::query()->findOrFail($id);

        $category->delete();

        return response()->json(['message' => 'Đã xóa thành công'], 200);
    }
}
