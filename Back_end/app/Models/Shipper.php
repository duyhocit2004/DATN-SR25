<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Shipper
 * 
 * @property int $id
 * @property string $name_shipper
 * @property string $phone1
 * @property string|null $phone2
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * 
 * @property Collection|Order[] $orders
 *
 * @package App\Models
 */
class Shipper extends Model
{

	protected $table = 'shipper';


	protected $fillable = [
		'name_shipper',
		'phone1',
		'phone2'
	];

	public function orders()
	{
		return $this->hasMany(Order::class);
	}
}
