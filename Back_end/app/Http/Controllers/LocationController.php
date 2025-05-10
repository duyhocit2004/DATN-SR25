<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Http;

class LocationController extends Controller
{
    public function index()
    {
        $locations = Location::where('user_id', Auth::id())->get();
        return response()->json($locations);
    }

    public function store(Request $request)
    {
        $request->validate([
            'location_name' => 'required|string|max:255',
            'user_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'location_detail' => 'required|string|max:255',
            'province_code' => 'nullable|string|max:20',
            'district_code' => 'nullable|string|max:20',
            'ward_code' => 'nullable|string|max:20',
            'status' => 'required|in:Chính,Phụ',
            'is_default' => 'boolean'
        ]);

        $location = new Location();
        $location->user_id = Auth::id();
        $location->location_name = $request->location_name;
        $location->user_name = $request->user_name;
        $location->phone_number = $request->phone_number;
        $location->location_detail = $request->location_detail;
        $location->province_code = $request->province_code;
        $location->province_name = $request->province_name;
        $location->district_code = $request->district_code;
        $location->district_name = $request->district_name;
        $location->ward_code = $request->ward_code;
        $location->ward_name = $request->ward_name;
        $location->status = $request->status;
        $location->is_default = $request->is_default ?? false;

        if ($location->is_default) {
            Location::where('user_id', Auth::id())
                ->where('is_default', true)
                ->update(['is_default' => false]);
        }

        $location->save();

        return response()->json($location, 201);
    }

    public function update(Request $request, $id)
    {
        $location = Location::where('user_id', Auth::id())->findOrFail($id);

        $request->validate([
            'location_name' => 'required|string|max:255',
            'user_name' => 'required|string|max:255',
            'phone_number' => 'required|string|max:20',
            'location_detail' => 'required|string|max:255',
            'province_code' => 'nullable|string|max:20',
            'district_code' => 'nullable|string|max:20',
            'ward_code' => 'nullable|string|max:20',
            'status' => 'required|in:Chính,Phụ',
            'is_default' => 'boolean'
        ]);

        $location->location_name = $request->location_name;
        $location->user_name = $request->user_name;
        $location->phone_number = $request->phone_number;
        $location->location_detail = $request->location_detail;
        $location->province_code = $request->province_code;
        $location->province_name = $request->province_name;
        $location->district_code = $request->district_code;
        $location->district_name = $request->district_name;
        $location->ward_code = $request->ward_code;
        $location->ward_name = $request->ward_name;
        $location->status = $request->status;
        $location->is_default = $request->is_default ?? false;

        if ($location->is_default) {
            Location::where('user_id', Auth::id())
                ->where('id', '!=', $id)
                ->where('is_default', true)
                ->update(['is_default' => false]);
        }

        $location->save();

        return response()->json($location);
    }

    public function destroy($id)
    {
        $location = Location::where('user_id', Auth::id())->findOrFail($id);
        $location->delete();
        return response()->json(null, 204);
    }

    public function getProvinces()
    {
        $response = Http::get('https://provinces.open-api.vn/api/p/');
        return response()->json($response->json());
    }

    public function getDistricts($provinceId)
    {
        $response = Http::get("https://provinces.open-api.vn/api/p/{$provinceId}?depth=2");
        return response()->json($response->json()['districts']);
    }

    public function getWards($districtId)
    {
        $response = Http::get("https://provinces.open-api.vn/api/d/{$districtId}?depth=2");
        return response()->json($response->json()['wards']);
    }
} 