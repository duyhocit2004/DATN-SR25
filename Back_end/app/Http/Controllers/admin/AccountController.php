<!-- <?php
// namespace App\Http\Controllers\Admin;

// use App\Http\Controllers\Controller;
// use App\Models\User;
// use Illuminate\Http\Request;
// use Illuminate\Support\Facades\Hash;

// class AccountController extends Controller
// {
//     public function index()
//     {
//         $accounts = User::all();
//         return view('admin.account.index', compact('accounts'));
//     }

//     public function create()
//     {
//         return view('admin.accounts.create');
//     }

//     public function store(Request $request)
//     {
//         $request->validate([
//             'name' => 'required',
//             'email' => 'required|email|unique:users',
//             'password' => 'required|min:6',
//         ]);

//         User::create([
//             'name' => $request->name,
//             'email' => $request->email,
//             'password' => Hash::make($request->password),
//         ]);

//         return redirect()->route('accounts.index')->with('success', 'Tài khoản đã được thêm!');
//     }

//     public function edit($id)
//     {
//         $account = User::findOrFail($id);
//         return view('admin.accounts.edit', compact('account'));
//     }

//     public function update(Request $request, $id)
//     {
//         $account = User::findOrFail($id);
//         $request->validate([
//             'name' => 'required',
//             'email' => 'required|email|unique:users,email,'.$id,
//         ]);

//         $account->update([
//             'name' => $request->name,
//             'email' => $request->email,
//             'password' => $request->password ? Hash::make($request->password) : $account->password,
//         ]);

//         return redirect()->route('accounts.index')->with('success', 'Tài khoản đã được cập nhật!');
//     }

//     public function destroy($id)
//     {
//         User::destroy($id);
//         return redirect()->route('accounts.index')->with('success', 'Tài khoản đã bị xóa!');
//     }
// }
// ?>
