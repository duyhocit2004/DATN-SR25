<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Location
 * 
 * @property int $id
 * @property int $user_id
 * @property string $location_name
 * @property string $user_name
 * @property string $phone_number
 * @property string $location_detail
 * @property string $status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property User $user
 *
 * @package App\Models
 */
class Location extends Model
{
	protected $table = 'location';

	protected $casts = [
		'user_id' => 'int'
	];

	protected $fillable = [
		'user_id',
		'location_name',
		'user_name',
		'phone_number',
		'location_detail',
		'status'
	];

	public function user()
	{
		return $this->belongsTo(User::class);
	}
}
