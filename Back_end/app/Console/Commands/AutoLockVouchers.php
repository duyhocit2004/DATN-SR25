<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Repositories\VoucherRepositories;

class AutoLockVouchers extends Command
{
    protected $signature = 'vouchers:auto-lock';
    protected $description = 'Tự động khóa các voucher đã hết hạn';

    protected $voucherRepositories;

    public function __construct(VoucherRepositories $voucherRepositories)
    {
        parent::__construct();
        $this->voucherRepositories = $voucherRepositories;
    }

    public function handle()
    {
        $lockedCount = $this->voucherRepositories->autoLockExpiredVouchers();
        $this->info("Đã khóa $lockedCount voucher hết hạn.");
    }
}