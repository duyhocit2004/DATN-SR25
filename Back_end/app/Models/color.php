<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Color
 * 
 * @property int $id
 * @property string $code
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|ProductVariant[] $product_variants
 *
 * @package App\Models
 */
class Color extends Model
{
	protected $table = 'colors';

	protected $fillable = [
		'code'
	];

	public function product_variants()
	{
		return $this->hasMany(ProductVariant::class);
	}
}
