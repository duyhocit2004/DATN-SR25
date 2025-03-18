<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Size
 * 
 * @property int $id
 * @property string $size
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|ProductVariant[] $product_variants
 *
 * @package App\Models
 */
class Size extends Model
{
	protected $table = 'sizes';

	protected $fillable = [
		'size'
	];

	public function product_variants()
	{
		return $this->hasMany(ProductVariant::class);
	}
}
