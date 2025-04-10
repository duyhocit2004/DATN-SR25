<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'phone_number' => 'required|regex:/^0[0-9]{9,10}$/',
            'role' => 'required',
            'password' => 'required|min:6',
            'receiver_name' => 'nullable|string|max:255',
            'receiver_phone_number' => 'nullable|regex:/^0[0-9]{9,10}$/', 
            'receiver_address' => 'nullable|string|max:255', 
        ];
    }

    public function messages()
{
    return [
        'name.required' => 'Họ tên không được để trống.',
        'name.string' => 'Họ tên phải là chữ.',
        'name.max' => 'Họ tên không được quá 255 ký tự.',

        'phone_number.required' => 'Số điện thoại không được để trống.',
        'phone_number.regex' => 'Số điện thoại không hợp lệ.',

        'role.required' => 'Vai trò không được để trống.',

        'password.required' => 'Mật khẩu không được để trống.',
        'password.min' => 'Mật khẩu phải có ít nhất 6 ký tự.',
    ];
}
}
