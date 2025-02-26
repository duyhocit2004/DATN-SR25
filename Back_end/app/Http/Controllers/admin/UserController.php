<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Cloudinary\Cloudinary;

class UserController extends Controller
{
    private $Cloudinary;
    public function __construct(Cloudinary $Cloudinary){
        $this->Cloudinary = $Cloudinary;
    }
    public function index()
    {
        $users = User::where('role', 'Quản lý')->get();
        return view('admin.users.index', compact('users'));
    }

    public function create()
    {
        return view('admin.users.create');
    }

    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'phone_number' => 'required|string|max:15',
            'password' => 'required|min:6',
            'user_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('user_image')) {
            $file = $this->Cloudinary->uploadApi()->upload($request->file('user_image')->getRealPath());
            $imagePath = $file['secure_url'];
        }

        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone_number' => $request->phone_number,
            'password' => Hash::make($request->password),
            'user_image' => $imagePath,
        ]);
        return redirect()->route('users.index')->with('success', 'Tài khoản đã được thêm');
    }

    public function show(){
        $users = User::query()->where('role' ,'=','Khách hàng')->get();
        return view('admin.users.show', compact('users'));
    }
    public function edit($id)
    {
        $user = User::findOrFail($id);
        return view('admin.users.edit', compact('user'));
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone_number' => 'required|string|max:15',
            // 'user_image' => 'nullable|max:2048',
        ]);
        $data = $request->all();
        if ($request->hasFile('user_image')) {
            $publicId = pathinfo($user->user_image, PATHINFO_FILENAME);
            $this->Cloudinary->adminApi()->deleteAssets([$publicId]);
           
        }else{
            $data['user_image'] = $user->user_image;
        }
     

      

        $user->update($data);
        return redirect()->route('users.index')->with('success', 'Tài khoản đã được cập nhật');
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return redirect()->route('users.index')->with('success', 'Tài khoản đã được xóa');
    }
}
