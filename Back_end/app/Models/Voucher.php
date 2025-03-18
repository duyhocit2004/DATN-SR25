<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

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
		'end_date' => 'datetime'
	];

	protected $fillable = [
		'code',
		'quantity',
		'used',
		'voucher_price',
		'start_date',
		'end_date',
		'status'
	];
}
