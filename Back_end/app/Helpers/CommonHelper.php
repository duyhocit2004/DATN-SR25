<?php

namespace App\Helpers;
use Illuminate\Http\Exceptions\HttpResponseException;
use Illuminate\Support\Collection;
use Illuminate\Support\Str;

class CommonHelper
{

    public static function convertToCamelCase($data)
    {
        // Nếu dữ liệu là mảng hoặc Collection, chúng ta duyệt qua từng phần tử
        if (is_array($data) || $data instanceof \Illuminate\Support\Collection) {
            return collect($data)->map(function ($item) {
                // Nếu item là mảng, chuyển đổi tất cả các thuộc tính trong đó
                return self::convertObjectToCamelCase($item);
            });
        } else {
            // Nếu không phải Collection hoặc mảng, chuyển đổi một đối tượng đơn lẻ
            return self::convertObjectToCamelCase($data);
        }
    }

    // Phương thức chuyển đối tượng sang camelCase và xử lý đệ quy với 'children'
    public static function convertObjectToCamelCase($item)
    {
        // Chuyển đổi các thuộc tính của item từ snake_case sang camelCase
        $item = collect($item)->mapWithKeys(function ($value, $key) {
            return [Str::camel($key) => $value]; // Chuyển đổi các key sang camelCase
        });

        // Kiểm tra và xử lý đệ quy cho trường 'children' nếu có
        if (isset($item['children']) && is_array($item['children'])) {
            $item['children'] = self::convertToCamelCase($item['children']);  // Đệ quy xử lý children
        }

        return $item;
    }


}
