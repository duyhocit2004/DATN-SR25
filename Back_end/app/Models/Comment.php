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
		// Định nghĩa mối quan hệ với bảng Product
		// Sử dụng belongsTo để chỉ định rằng mỗi comment thuộc về một sản phẩm
		// 'product_id' là khóa ngoại trong bảng comment
		return $this->belongsTo(Product::class);
	}

	public function parent()
	{
		return $this->belongsTo(Comment::class, 'parent_id');  // 'parent_id' là cột tham chiếu đến id của category cha		
		// Sử dụng belongsTo để chỉ định rằng mỗi comment có thể có một comment cha
		// 'parent_id' là khóa ngoại trong bảng comment
		// Nếu comment không có comment cha, thì parent_id sẽ là null
		// Nếu comment có comment cha, thì parent_id sẽ chứa id của comment cha
		// Điều này cho phép chúng ta truy cập thông tin của comment cha từ comment hiện tại


		// Ví dụ: $comment->parent sẽ trả về comment cha của comment hiện tại
	}

    public function children()
    {
        return $this->hasMany(Comment::class, 'parent_id');  // 'parent_id' là cột tham chiếu đến id của category cha
    }
}
