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
            'namecolor' => 'required',
        ];
    }
    public function messages() {
        return [
            'namecolor.required' => "bạn chưa nhập màu",
            // 'namecolor.unique:colors' => "màu này đã có",
        ];
    }
}
