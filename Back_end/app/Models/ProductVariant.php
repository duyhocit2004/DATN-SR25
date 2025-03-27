<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ProductVariant
 *
 * @property int $id
 * @property int $product_id
 * @property int $color_id
 * @property int $size_id
 * @property string $quantity
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Color $color
 * @property Product $product
 * @property Size $size
 * @property Collection|OrderDetail[] $order_details
 *
 * @package App\Models
 */
class ProductVariant extends Model
{
	protected $table = 'product_variants';

	protected $casts = [
		'product_id' => 'int',
		'color_id' => 'int',
		'size_id' => 'int',
        'quantity' => 'int',
        'code' => 'int'
	];

	protected $fillable = [
		'product_id',
		'color_id',
		'size_id',
		'quantity',
        'code'
	];

	public function color()
	{
		return $this->belongsTo(Color::class);
	}

	public function product()
	{
		return $this->belongsTo(Product::class);
	}

	public function size()
	{
		return $this->belongsTo(Size::class);
	}

	public function order_details()
	{
		return $this->hasMany(OrderDetail::class, 'product_variants_id');
	}
}
