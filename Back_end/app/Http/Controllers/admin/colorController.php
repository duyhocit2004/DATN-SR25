<?php

namespace App\Http\Controllers\admin;

use Illuminate\Http\Request;
use App\Http\Requests\ColorRequest;
use App\Http\Controllers\Controller;
use App\Models\color;
use App\Services\color\ColorService;

class colorController extends Controller
{
    public $color;
    public function __construct(ColorService $color)
    {
        $this->color = $color;
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $list = $this->color->getAll();
        return view('admin.color.listcolor', compact('list'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.color.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(request $request)
    {
        color::create([
            'name' => $request->name
        ]);
        return redirect()->route('color');

        return $this->color->insert($request->name);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {}

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        $list = $this->color->GetId($id);
        return view('admin.color.edit', compact('list'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // dd($id,$request);
        $list = $request->except('_token', '_method');
        return $this->color->insertId($id, $list);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        return $this->color->delete($id);
    }
}
