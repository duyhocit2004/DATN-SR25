<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * Class Voucher
 *
 * @property int $id
 * @property string $code
 * @property int $quantity
 * @property int $used
 * @property float|null $voucher_price
 * @property Carbon|null $start_date
 * @property Carbon|null $end_date
 * @property bool $status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class Voucher extends Model
{
	protected $table = 'vouchers';

	protected $casts = [
		'quantity' => 'int',
		'used' => 'int',
		'voucher_price' => 'float',
		'start_date' => 'datetime',
		'end_date' => 'datetime',
		'max_product_price' => 'float'
	];

	protected $fillable = [
		'code',
		'quantity',
		'used',
		'voucher_price',
		'start_date',
		'end_date',
		'status',
		'min_order_value',
		'max_product_price',
	];
	 // Thêm hàm kiểm tra hết hạn
	 public function isExpired()
	 {
		 $now = now();
 
		 if ($this->end_date && $this->end_date->lt($now)) {
			 return true;
		 }
 
		 if ($this->expired_at && $this->expired_at->lt($now)) {
			 return true;
		 }
 
		 return false;
	 }

	 public function voucherUsages()
	 {
		 return $this->hasMany(VoucherUsage::class);
	 }

	 public function hasUserUsed($userId)
	 {
		 return $this->voucherUsages()->where('user_id', $userId)->exists();
	 }

}
