<!-- <?php

// namespace App\Http\Controllers\Api;

// use App\Http\Controllers\Controller;
// use App\Models\User;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Auth;
// use Illuminate\Support\Facades\Hash;
// use Illuminate\Validation\ValidationException;

// class AuthController extends Controller
// {
//     // Đăng ký người dùng mới
//     public function register(Request $request)
//     {
//         $request->validate([
//             'name' => 'required|string|max:255',
//             'email' => 'required|email|unique:users,email',
//             'phone_number' => 'required|regex:/^0[0-9]{9,10}$/',
//             'password' => 'required|min:6|confirmed',
//         ]);

//         $user = User::create([
//             'name' => $request->name,
//             'email' => $request->email,
//             'phone_number' => $request->phone_number,
//             'password' => Hash::make($request->password),
//         ]);

//         $token = $user->createToken('auth_token')->plainTextToken;

//         return response()->json([
//             'message' => 'Đăng ký thành công!',
//             'user' => $user,
//             'token' => $token,
//         ], 201);
//     }

//     // Đăng nhập
//     public function login(Request $request)
//     {
//         // Validate request
//         $request->validate([
//             'email' => 'required|email',
//             'password' => 'required|min:6',
//         ]);

//         // Kiểm tra đăng nhập
//         if (!Auth::attempt($request->only('email', 'password'))) {
//             return response()->json(['message' => 'Sai email hoặc mật khẩu'], 401);
//         }

//         // Lấy user & tạo token
//         $user = Auth::user();
//         $token = $user->createToken('auth_token')->plainTextToken;

//         return response()->json([
//             'message' => 'Đăng nhập thành công!',
//             'user' => $user,
//             'token' => $token,
//         ], 200);
//     }

//     // Lấy thông tin người dùng
//     public function me(Request $request)
//     {
//         return response()->json([
//             'user' => $request->user(),
//         ]);
//     }

//     // Đăng xuất
//     public function logout(Request $request)
//     {
//         $request->user()->tokens()->delete();
//         return response()->json(['message' => 'Đăng xuất thành công!']);
//     }
// }
// ?>
