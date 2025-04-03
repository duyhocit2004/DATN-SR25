<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable; // Sử dụng Authenticatable
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;


//use Laravel\Sanctum\HasApiTokens;

/**
 * Class User
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @property string|null $phone_number
 * @property string $role
 * @property Carbon|null $email_verified_at
 * @property string|null $gender
 * @property string|null $user_image
 * @property string $password
 * @property string|null $remember_token
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property string|null $deleted_at
 *
 * @property Collection|Cart[] $carts
 * @property Collection|Location[] $locations
 * @property Collection|Order[] $orders
 * @property Collection|Voucher[] $vouchers
 *
 * @package App\Models
 */
class User extends Authenticatable implements JWTSubject
{

    use HasFactory;
    use Notifiable;
    use SoftDeletes;
    protected $table = 'users';

    protected $casts = [
        'email_verified_at' => 'datetime'
    ];

    protected $hidden = [
        'password',
        'remember_token'
    ];

    protected $fillable = [
        'name',
        'email',
        'phone_number',
        'role',
        'email_verified_at',
        'gender',
        'user_image',
        'password',
        'remember_token',
        'status'
    ];

    public function carts()
    {
        return $this->hasMany(Cart::class);
    }

    public function locations()
    {
        return $this->hasMany(Location::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function vouchers()
    {
        return $this->hasMany(Voucher::class);
    }

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
    public function getJWTIdentifier()
    {
        return $this->getKey(); // Trả về khóa chính của người dùng
    }

    // Phương thức để trả về các dữ liệu cần thiết cho payload của token
    public function getJWTCustomClaims()
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phoneNumber' => $this->phone_number,
            'role' => $this->role,
            'gender' => $this->gender,
            'userImage' => $this->user_image,
            'emailVerifiedAt' => $this->email_verified_at,
            'status' => $this->status,
            'createdAt' => $this->created_at,
            'updatedAt' => $this->updated_at,
            'deletedAt' => $this->deleted_at,
        ];
    }
}
