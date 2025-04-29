<?php

namespace App\Http\Controllers\Admin;

use App\Helpers\BaseResponse;
use App\Http\Controllers\Controller;
use App\Repositories\ColorRepositories;
use Illuminate\Http\Request;

class ColorController extends Controller
{
    protected $colorRepositories;

    public function __construct(ColorRepositories $colorRepositories)
    {
        $this->colorRepositories = $colorRepositories;
    }

    public function getAllColors()
    {
        $colors = $this->colorRepositories->getAllColors();
        return BaseResponse::success($colors);
    }

    public function getColorsPaging(Request $request)
    {
        $colors = $this->colorRepositories->getColorsPaging($request);
        return BaseResponse::success($colors);
    }

    public function addColor(Request $request)
    {
        $color = $this->colorRepositories->addColor($request);
        return BaseResponse::success($color);
    }

    public function updateColor(Request $request)
    {
        $color = $this->colorRepositories->updateColor($request);
        return BaseResponse::success($color);
    }

    public function deleteColor(Request $request)
    {
        $color = $this->colorRepositories->deleteColor($request);
        return BaseResponse::success($color);
    }
} 