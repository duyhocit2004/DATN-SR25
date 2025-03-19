<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class StatusOrder
 * 
 * @property int $id
 * @property string $name_status
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 *
 * @package App\Models
 */
class StatusOrder extends Model
{
	protected $table = 'status_orders';

	protected $fillable = [
		'name_status'
	];
}
