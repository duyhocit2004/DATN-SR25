@extends('admin.index')
@section('main')
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="">
                    <h2 class="mt-4">Sửa Bình Luận</h2>
                </div>
                <div class="card-body basic-form">
                    <div class="card-wrapper border rounded-3">
                        <form class="row" action="{{ route('comments.update', $comment->id) }}" method="POST">
                            @csrf
                            @method('PUT')
                            <div class="mb-3">
                                <label for="product" class="form-label fw-bold">Sản phẩm</label>
                                <select class="form-select" id="products_id" name="products_id">
                                    @foreach ($product as $product)
                                        <option value="{{ $product->id }}"
                                            {{ old('products_id') == $product->products_id ? 'selected' : '' }}>
                                            {{ $product->name_product }}
                                        </option>
                                    @endforeach
                                </select>
                                @error('product')
                                    <p style="color: red">{{ $message }}</p>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label for="account" class="form-label fw-bold">Tài khoản</label>
                                <select class="form-select" id="user_id" name="user_id">
                                    @foreach ($user as $user)
                                       <option value="{{ $user->id }}"
                                            {{ old('user_id') == $user->id ? 'selected' : '' }}>
                                            {{ $user->name }}
                                        </option>
                                    @endforeach
                                </select>
                            </div>

                            <div class="mb-3">
                                <label for="content" class="form-label fw-bold">Nội dung</label>
                                <textarea class="form-control" id="content" name="content" rows="3">{{ $comment->content }}</textarea>
                                @error('content')
                                    <p style="color: red">{{ $message }}</p>
                                @enderror
                            </div>

                            <div class="mb-3">
                                <label for="rating" class="form-label fw-bold">Đánh giá</label>
                                <select class="form-select" id="rating" name="rating">
                                    <option value="1" {{ old('rating') == '1' ? 'selected' : '' }}>1 Sao</option>
                                    <option value="2" {{ old('rating') == '2' ? 'selected' : '' }}>2 Sao</option>
                                    <option value="3" {{ old('rating') == '3' ? 'selected' : '' }}>3 Sao</option>
                                    <option value="4" {{ old('rating') == '4' ? 'selected' : '' }}>4 Sao</option>
                                    <option value="5" {{ old('rating') == '5' ? 'selected' : '' }}>5 Sao</option>
                                </select>
                                @error('rating')
                                    <div class="alert alert-danger mt-2" role="alert">{{ $message }}</div>
                                @enderror
                            </div>


                            <div class="row">
                                <div class="text-end">
                                    <button class="btn btn-success me-2" type="submit">Submit</button>
                                    <input class="btn btn-danger" type="reset" value="Cancel">
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
