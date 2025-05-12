<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ColorRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
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
            // 'code' => 'required|string|max:7|regex:/^#[0-9A-Fa-f]{6}$/'
        ];
    }

    /**
     * Get custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'name.required' => 'Tên màu là bắt buộc',
            'name.string' => 'Tên màu phải là chuỗi',
            'name.max' => 'Tên màu không được vượt quá 255 ký tự',
            // 'code.required' => 'Mã màu là bắt buộc',
            // 'code.string' => 'Mã màu phải là chuỗi',
            // 'code.max' => 'Mã màu không được vượt quá 7 ký tự',
            // 'code.regex' => 'Mã màu phải có định dạng hex hợp lệ (ví dụ: #FF0000)'
        ];
    }
}
