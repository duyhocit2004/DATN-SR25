<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;

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
	use HasFactory;

	protected $table = 'orders';

	protected $casts = [
		'total_price' => 'float',
		'voucher_price' => 'float',
		'date' => 'datetime'
	];

	protected $fillable = [
		'code',
		'user_id',
		'customer_name',
		'email',
		'phone_number',
		'receiver_name',
		'receiver_phone_number',
		'receiver_address',
		'shipping_address',
		'total_price',
		'voucher',
		'voucher_price',
		'status',
		'payment_status',
		'payment_method',
		'transaction_id',
		'note',
		'refundCompleted',
		'refund_status',
		'refund_reason',
		'refunded_by',
		'refunded_at',
		'date',
		'created_at',
		'updated_at'
	];

	public function user()
	{
		return $this->belongsTo(User::class);
	}

	public function order_details()
	{
		return $this->hasMany(OrderDetail::class);
	}

	public function statusHistories()
	{
		return $this->hasMany(OrderStatusHistory::class)->orderBy('updated_at', 'desc');
	}

	public function paymentStatusHistories()
	{
		return $this->hasMany(PaymentStatusHistory::class);
	}
}
