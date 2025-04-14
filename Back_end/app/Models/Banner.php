<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Banner
 *
 * @property int $id
 * @property string|null $image
 * @property bool $status
 * @property string $type
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class Banner extends Model
{
	protected $table = 'banners';

	protected $fillable = [
		'image',
		'status',
		'type',
		'link',
		'product_id',
	];
}
