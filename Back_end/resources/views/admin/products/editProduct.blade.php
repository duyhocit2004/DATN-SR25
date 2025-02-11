@extends('admin.index')
@section('css')
<style>
  #ss {
    display: flex;
  }
  #ss1 {
    margin-top:15%;
  }
  *{
    margin: 0;
    padding: 0 ;
    box-sizing: border-box;
  }
</style>
@endsection
@section('main')
<div class="container">
  <div class="row">
    <form action="{{route('update.Product',$idproduct->id)}}" method="POST" enctype="multipart/form-data">
      @method('PUT')
      @csrf
      <div class="container" id="ss">
        <div class="col-md-7">
          <div class="card">
            <div class="card-header card-no-border">
              <h3>Thêm sản phẩm</h3>
            </div>

            <div class="row">
              <div class="col">
                <div class="mb-3 mx-1">
                  <label class="form-label" for="product">Tên sản phẩm</label>
                  <input class="form-control" id="product" type="text" value="{{$idproduct->name_product}}" name="product" placeholder="áo dài nam/nữ">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="mb-3 mx-1">
                  <label class="form-label" for="categories_id">Thể loại</label>
                  <select class="form-select" id="categories_id" name="categories_id">
                    @foreach ($categori as $as)
                      <option value="{{$as->id}}" {{ $as->id == $idproduct->categories_id ? 'selected' : '' }}>
                        {{$as->name}}{{$as->type}}</option>
                    @endforeach
                  </select>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="mb-3 mx-1">
                  <label class="form-label" for="quanlity">Số lượng</label>
                  <input class="form-control" id="quanlity" value="{{$idproduct->quanlity}}" name="quanlity" type="text" placeholder="200">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="mb-3 mx-1">
                  <label class="form-label" for="price_regular">giá sản phẩm</label>
                  <input class="form-control" id="price_regular" value="{{$idproduct->price_regular}}" name="price_regular" type="text" placeholder="200,000">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="mb-3 mx-1">
                  <label class="form-label" for="price_sale">Giảm giá sản phẩm(không bắt buộc)</label>
                  <input class="form-control" id="price_sale" value="{{$idproduct->price_sale}}" name="price_sale" type="text" placeholder="180,000">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                  <div class="mb-3 mx-1">
                      <label class="form-label" for="description">Miêu tả</label>
                      <textarea class="form-control" name="description" id="description">{{ $idproduct->description }}</textarea>
                  </div>
              </div>
          </div>

          </div>
        </div>
        {{-- thêm ảnh --}}
        <div class="col-md-5">


          <div class="card-body basic-form">
            <div class="card-header card-no-border">
                <h3>Thêm ảnh</h3>
            </div>
            <div class="card-wrapper border rounded-3">
              <div id="imagediv">
                  <div class="container d-flex">
                      <div class="col-7">
                          <img id="preview_0" src="{{ Storage::url($idproduct->image) }}" width="200px" alt="Preview Image">
                      </div>
                      <div class="mb-5 mx-1" id="ss1">
                          <label for="file" class="btn btn-primary">Chọn ảnh</label>
                          <input class="form-control d-none" id="file" name="file" onchange="previewImage(this, 0)" type="file">
                      </div>
                  </div>
              </div>
          </div>
        </div>
        </div>
        {{-- end thêm ảnh --}}
      </div>
      <div class="d-flex justify-content-center  align-items-center">
        <a class="btn btn-primary" href="{{route('product')}}">quay lại</a> 
        <button type="reset" class="btn btn-danger mx-1">reset</button>
        <button class="btn btn-success mx-1">sửa</button>
      </div>
    </form>
  </div>
</div>

@endsection

@section('js_main')
<script>
  function previewImage(input, rowIndex) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById(`preview_${rowIndex}`).setAttribute('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
  ClassicEditor
    .create(document.getElementById('description'), {
      toolbar: [
        'undo', 'redo', '|',
        'bold', 'italic', '|',
        'link', 'imageUpload', '|',
        'bulletedList', 'numberedList', '|',
        'blockQuote', 'insertTable', '|',
        'mediaEmbed', 'codeBlock'
      ],
      // Thêm các plugin nếu cần thiết
      
    })
    .then(editor => {
      window.editor = editor;
    })
    .catch(error => {
      console.error(error);
    })

    
</script>
@endsection