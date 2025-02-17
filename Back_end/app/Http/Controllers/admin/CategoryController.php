<?php

namespace App\Http\Controllers\admin;

use App\Http\Controllers\Controller;
use App\Models\categories;
use App\Services\Categories\CategoryService;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public $category;

    public function __construct(CategoryService $category)
    {

        $this->category = $category;
    }

    public function index()
    {
        $listCategory = $this->category->getAll();

        return view('admin.categories.list', compact('listCategory'));
    }

    public function create()
    {
        return view('admin.categories.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:categories,name|max:255',
            'type' => 'required'
        ], [
            'name.required' => 'Tên danh mục không được bỏ trống',
            'name.unique' => 'Tên danh mục đã tồn tại',
            'name.max' => 'Tên danh mục không được quá 255 kí tự',
        ]);

        categories::create([
            'name' => $request->name,
        ]);

        return redirect()->route('categories.index')->with('success', 'Thêm thành công.');
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $category = categories::findOrFail($id);

        return view('admin.categories.edit', compact('category'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $category = categories::findOrFail($id);

        $request->validate([
            'name' => 'required|unique:categories,name|max:255',
        ], [
            'name.required' => 'Tên danh mục không được bỏ trống',
            'name.unique' => 'Tên danh mục đã tồn tại',
            'name.max' => 'Tên danh mục không được quá 255 kí tự',
        ]);

        $category->update([
            'name' => $request->name,
        ]);

        return redirect()->route('categories.index')->with('success', 'Sửa thành công');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $category = categories::findOrFail($id);

        $category->delete();

        return redirect()->route('categories.index')->with('success', 'Xóa thành công.');
    }
}
