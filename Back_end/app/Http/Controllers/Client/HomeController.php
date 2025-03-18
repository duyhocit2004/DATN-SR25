<?php

namespace App\Http\Controllers\Client;

use App\Helpers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Services\Client\product\IHomeService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;


class HomeController extends Controller
{
    public IHomeService $homeService;

    public function __construct(IHomeService $homeService)
    {
        $this->homeService = $homeService;
    }
}
