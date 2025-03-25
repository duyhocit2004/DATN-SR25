<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class OrderDetail
 *
 * @property int $id
 * @property int $order_id
 * @property string|null $name
 * @property string|null $image
 * @property float $price_regular
 * @property float $price_sale
 * @property int|null $discount
 * @property string|null $color
 * @property string|null $size
 * @property int $quantity_order
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Order $order
 *
 * @package App\Models
 */
class OrderDetail extends Model
{
	protected $table = 'order_detail';

	protected $casts = [
		'order_id' => 'int',
		'price_regular' => 'float',
		'price_sale' => 'float',
		'discount' => 'int',
		'quantity_order' => 'int',
        'product_id' => 'int'
	];

	protected $fillable = [
		'order_id',
		'name',
		'image',
		'price_regular',
		'price_sale',
		'discount',
		'color',
		'size',
		'quantity_order',
		'product_id'
	];

	public function order()
	{
		return $this->belongsTo(Order::class);
	}
}
