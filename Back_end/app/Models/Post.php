<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Post
 * 
 * @property int $id
 * @property string $title
 * @property string $content
 * @property string $author
 * @property string|null $image
 * @property Carbon|null $publish_date
 * @property int $views
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class Post extends Model
{
	protected $table = 'post';

	protected $casts = [
		'publish_date' => 'datetime',
		'views' => 'int'
	];

	protected $fillable = [
		'title',
		'content',
		'author',
		'image',
		'publish_date',
		'views'
	];
}
