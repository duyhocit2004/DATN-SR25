@extends('admin.index')
@section('css')
<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .listproduct {
        margin-top: 20px;
        width: 920px;
        height: 300px;
        display: flex;
        border: 1px 5px 5px solid black;
    }

    .fromProduct {
        display: flex;
    }

    #product {
        width: 500px;
    }

    #variant {
        width: 300px;
    }
    #variant1 {
        margin-left : 5px;
    }
    #image {
        width: 100%;
        height: auto;
        object-fit: cover;
    }

    .container {
        background-color: white;
    }

    #image {
        width: 200px;
        height: 220px;
    }

    .editVariant {
        display: flex;
        
    }
</style>
@endsection
@section('main')
<div class="container">
    <div class="card-header card-border">
        <h3>Sửa biến thể</h3>
    </div>
    <div class="listproduct">
        <div class="fromProduct">
            <div style="width: 50%;">
                <div class="col my-1">
                    <label for="product" class="form-label card-border"> Sản phẩm</label>
                    <input type="text" id="product" value="{{$product->name_product}}" id="input" disabled
                        class="form-control">
                </div>
                <div class="col my-1">
                    <label for="product" class="form-label"> thể loại</label>
                    <select id="product" class="form-control" disabled id="category">
                        <option value="">{{$product->categories->name}}</option>
                    </select>
                </div>
                <div class="col my-1">
                    <label for="product" class="form-label"> mã đơn hàng</label>
                    <input type="text" id="product" value="{{$product->SKU}}" id="input" disabled class="form-control">
                </div>
                <div class="col my-1">
                    <label for="product" class="form-label"> Số lượng đơn hàng</label>
                    <input type="text" id="product" value="{{$product->base_stock}}" id="input" disabled
                        class="form-control">
                </div>
            </div>

            <div style="width: 50%; margin-left:20px;">
                <div class="col my-1">
                    <label for="product" class="form-label card-border"> giá gốc</label>
                    <input type="text" id="product" value="{{$product->price_regular}}" id="input" disabled
                        class="form-control">
                </div>
                <div class="col my-1">
                    <label for="product" class="form-label"> giá giảm </label>
                    <input type="text" id="product" value="{{$product->price_sale}}" id="input" disabled
                        class="form-control">
                </div>
                <div class="col my-1">
                    <label for="product" class="form-label"> tiêu đề</label>
                    <input type="text" id="product" value="{{$product->description}}" id="input" disabled
                        class="form-control">
                </div>
            </div>
            <div style="width: 50%; margin-left:20px;">
                <div class="col my-1">
                    <label for="product" class="form-label card-border">ảnh</label>
                    <img src="{{Storage::url($product->image)}}" id="image" alt="">
                </div>

            </div>

        </div>
    </div>
    <div class="card-header card-border">
        <h3>biến thể</h3>
    </div>
    <div class="editVariant container">
        <form action="{{route('variant.update', $listVariant->id)}}" method="POST">
            @csrf
            @method('PUT')

            <div class="container" style="display:flex;">
                <div class="col my-1">
                    <label for="variant" class="form-label"> màu</label>
                    <select id="variant" class="form-control" name="color_id" id="category">
                        @foreach ($color as $as)
                            <option value="{{$as->id}}" {{$listVariant['size_id'] == $as->id ? 'selected' : ''}}>{{$as->name}}
                            </option>
                        @endforeach
                    </select>
                </div>
                <div class="col my-1" id="variant1">
                    <label for="variant" class="form-label"> kích cỡ</label>
                    <select id="variant" class="form-control" name="size_id" id="category">
                        @foreach ($size as $as)
                            <option value="{{$as->id}}" {{$listVariant['color_id'] == $as->id ? 'selected' : ''}}>{{$as->name}}
                            </option>
                        @endforeach
                    </select>
                </div>
                <div class="col my-1" id="variant1">
                    <label for="variant" class="form-label card-border"> số lượng</label>
                    <input type="text" id="variant" name="quanlity" value="{{$listVariant->quanlity}}" 
                        class="form-control">
                </div>
                <div class="col my-1" id="variant1">
                    <label for="variant" class="form-label card-border"> giá</label>
                    <input type="text" id="variant" name="price" value="{{$listVariant->price}}"
                        class="form-control">
                </div>
            </div>
            <div class=" my-2 d-flex justify-content-center  align-items-center">
                <a class="btn btn-primary" href="{{route('variant.index')}}">quay lại</a> 
                <button type="reset" class="btn btn-danger mx-1">reset</button>
                <button class="btn btn-success mx-1">sửa</button>
              </div>

        </form>

    </div>
</div>

@endsection

@section('js_main')
<script>

</script>
@endsection