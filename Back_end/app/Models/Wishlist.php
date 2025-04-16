<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Wishlist
 *
 * @property int $id
 * @property int $product_id
 * @property int $user_id
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Product $product
 * @property User $user
 *
 * @package App\Models
 */
class Wishlist extends Model
{
	protected $table = 'wishlist';

	protected $casts = [
		'product_id' => 'int',
		'user_id' => 'int'
	];

	protected $fillable = [
		'product_id',
		'user_id'
	];

	public function product()
	{
		return $this->belongsTo(Product::class);
	}

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
