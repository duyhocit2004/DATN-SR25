<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Services\Admin\product\IAdminProductService;

class AutoProductDelete extends Command
{
    protected $signature = 'Product:auto-delete';
    protected $description = 'Tự động xóa sản phẩm bị xóa trong vòng 30 ngày';

    public $IAdminProductService;

    public function __construct(IAdminProductService $IAdminProductService)
    {
        parent::__construct();
        $this->IAdminProductService = $IAdminProductService;
    }

    public function handle()
    {
        $product = $this->IAdminProductService->getStatusProductFlase();
        $this->info("Đã xóa $product sản phẩm đã bị xóa trong vòng 30 ngày.");
    }
    protected $commands = [
        AutoProductDelete::class
    ];
}