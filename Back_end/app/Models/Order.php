<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Order
 *
 * @property int $id
 * @property string|null $code
 * @property string|null $customer_name
 * @property string $email
 * @property string $phone_number
 * @property float $total_price
 * @property string|null $voucher
 * @property float|null $voucher_price
 * @property string $shippingAddress
 * @property string|null $note
 * @property string|null $status
 * @property Carbon|null $date
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Collection|OrderDetail[] $order_details
 *
 * @package App\Models
 */
class Order extends Model
{
	protected $table = 'orders';

	protected $casts = [
		'total_price' => 'float',
		'voucher_price' => 'float',
		'date' => 'datetime'
	];

	protected $fillable = [
		'code',
		'customer_name',
		'email',
		'phone_number',
		'receiver_name',
		'receiver_phone_number',
		'receiver_address',
		'total_price',
		'voucher',
		'voucher_price',
		'shipping_address',
		'note',
		'status',
		'date',
		'payment_status',
		'payment_method',
	];

	public function order_details()
	{
		return $this->hasMany(OrderDetail::class);
	}
}
