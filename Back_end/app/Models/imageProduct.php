<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class ImageProduct
 * 
 * @property int $id
 * @property int $products_id
 * @property string $image_link
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Product $product
 *
 * @package App\Models
 */
class ImageProduct extends Model
{
	protected $table = 'image_product';

	protected $casts = [
		'products_id' => 'int'
	];

	protected $fillable = [
		'products_id',
		'image_link'
	];

	public function product()
	{
		return $this->belongsTo(Product::class, 'products_id');
	}
}
