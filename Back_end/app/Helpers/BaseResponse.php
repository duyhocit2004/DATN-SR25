<?php

namespace App\Helpers;
use Illuminate\Http\Exceptions\HttpResponseException;

class BaseResponse
{
    private $status;
    private $timestamp;
    private $data;
    private $messageKey;

    public function __construct($status, $data, $messageKey)
    {
        $this->status = $status;
        $this->timestamp = time();
        $this->data = $data;
        $this->messageKey = $messageKey;
    }

    public static function success($data)
    {
        return response()->json([
            'status' => '200',
            'timestamp' => time(),
            'message' => 'success',
            'messageKey' => null,
//            'data' => !is_array($data)?$data:[$data],
            'data' => $data,
        ], 200);

    }


    public static function failure($status, $message, $messageKey, $data)
    {
        throw new HttpResponseException(response()->json([
            'status' => $status,
            'timestamp' => time(),
            'message' => $message,
            'messageKey' => $messageKey,
            'data' => $data
        ], 200));
    }


    public function setStatus($status)
    {
        $this->status = $status;
    }

    public function setData($data)
    {
        $this->data = $data;
    }

    public function setMessageKey($messageKey)
    {
        $this->messageKey = $messageKey;
    }

    public function convertToCamelCase($data)
    {
        $data = $data->map(function ($size) {
            return collect($size->toArray())->mapWithKeys(function ($value, $key) {
                return [Str::camel($key) => $value];
            })->toArray();
        });
        return $data;
    }
}
