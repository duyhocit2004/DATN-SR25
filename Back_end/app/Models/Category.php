<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Category
 *
 * @property int $id
 * @property int|null $parent_id
 * @property string|null $name
 * @property string|null $gender
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $description
 *
 * @property Collection|Product[] $products
 *
 * @package App\Models
 */
class Category extends Model
{
	protected $table = 'categories';

	protected $casts = [
		'parent_id' => 'int'
	];

	protected $fillable = [
		'parent_id',
		'name',
		'gender',
		'image',
		'description'
	];

	public function products()
	{
		return $this->hasMany(Product::class, 'categories_id');
	}

    public function children()
    {
        return $this->hasMany(Category::class, 'parent_id');
    }

    public function parent()
    {
        return $this->belongsTo(Category::class, 'parent_id');
    }

}
