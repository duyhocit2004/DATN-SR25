<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Comment
 *
 * @property int $id
 * @property int|null $parent_id
 * @property int|null $product_id
 * @property string|null $content
 * @property int|null $rate
 * @property string $phone_number
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @property Product|null $product
 *
 * @package App\Models
 */
class Comment extends Model
{
	protected $table = 'comment';

	protected $casts = [
		'parent_id' => 'int',
		'product_id' => 'int',
		'rate' => 'float'
	];

	protected $fillable = [
		'parent_id',
		'product_id',
		'content',
		'rate',
		'phone_number'
	];

	public function product()
	{
		return $this->belongsTo(Product::class);
	}

    public function children()
    {
        return $this->hasMany(Comment::class, 'parent_id');  // 'parent_id' là cột tham chiếu đến id của category cha
    }
}
