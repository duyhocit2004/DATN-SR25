<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Product
 *
 * @property int $id
 * @property int|null $categories_id
 * @property string|null $name
 * @property string|null $image
 * @property float|null $price_regular
 * @property float|null $price_sale
 * @property string|null $description
 * @property int|null $views
 * @property string|null $content
 * @property int|null $quantity
 * @property int|null $quantity_sold
 * @property float|null $rate
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 * @property int|null $discount
 *
 * @property Category|null $category
 * @property Collection|Cart[] $carts
 * @property Collection|ImageProduct[] $image_products
 * @property Collection|OrderDetail[] $order_details
 * @property Collection|ProductVariant[] $product_variants
 * @property Collection|Wishlist[] $wishlists
 *
 * @package App\Models
 */
class Product extends Model
{
	protected $table = 'products';

	protected $casts = [
		'categories_id' => 'int',
		'price_regular' => 'float',
		'price_sale' => 'float',
		'views' => 'int',
		'quantity' => 'int',
		'quantity_sold' => 'int',
		'rate' => 'float',
		'discount' => 'int'
	];

	protected $fillable = [
		'categories_id',
		'name',
		'image',
		'price_regular',
		'price_sale',
		'description',
		'views',
		'content',
		'quantity',
		'quantity_sold',
		'rate',
		'discount'
	];

	public function category()
	{
		return $this->belongsTo(Category::class, 'categories_id');
	}

	public function carts()
	{
		return $this->hasMany(Cart::class);
	}

	public function image_products()
	{
		return $this->hasMany(ImageProduct::class, 'products_id');
	}

	public function order_details()
	{
		return $this->hasMany(OrderDetail::class);
	}

	public function product_variants()
	{
		return $this->hasMany(ProductVariant::class);
	}

	public function wishlists()
	{
		return $this->hasMany(Wishlist::class);
	}

    public function sizes()
    {
        return $this->belongsToMany(Size::class, 'product_variants', 'product_id', 'size_id');
    }

    public function colors()
    {
        return $this->belongsToMany(Color::class, 'product_variants', 'product_id', 'color_id');
    }
}
