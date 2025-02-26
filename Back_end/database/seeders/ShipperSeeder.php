<?php

namespace Database\Seeders;

use App\Models\Shipper;
use Illuminate\Database\Seeder;

class ShipperSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $shippers = [
            ['name_shipper' => 'Shipper 1', 'phone1' => '0900000001', 'phone2' => '0911111111'],
            ['name_shipper' => 'Shipper 2', 'phone1' => '0900000002', 'phone2' => '0911111112'],
            ['name_shipper' => 'Shipper 3', 'phone1' => '0900000003', 'phone2' => '0911111113'],
            ['name_shipper' => 'Shipper 4', 'phone1' => '0900000004', 'phone2' => '0911111114'],
            ['name_shipper' => 'Shipper 5', 'phone1' => '0900000005', 'phone2' => '0911111115'],
        ];

        foreach ($shippers as $shipper) {
            Shipper::create($shipper);
        }
    }
}
