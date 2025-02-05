@extends('admin.index')
@section('css')
<style>
  

  #ss {
    display: flex;
  }
</style>
@endsection
@section('main')
<div class="container">
  <div class="row"> 
    <form action="{{route('postProduct')}}" method="POST" enctype="multipart/form-data">
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
                  <input class="form-control" id="product" type="text" name="product" placeholder="áo dài nam/nữ">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="mb-3 mx-1">
                  <label class="form-label" for="categories_id">Thể loại</label>
                  <select class="form-select" id="categories_id" name="categories_id">
                    @foreach ($categori as $as)
            <option value="{{$as->id}}">{{$as->name}}{{$as->type}}</option>
          @endforeach
                  </select>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="mb-3 mx-1">
                  <label class="form-label" for="quanlity">Số lượng</label>
                  <input class="form-control" id="quanlity" type="text" placeholder="200">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="mb-3 mx-1">
                  <label class="form-label" for="price_regular">giá sản phẩm</label>
                  <input class="form-control" id="price_regular" name="price_regular" type="text" placeholder="200,000">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="mb-3 mx-1">
                  <label class="form-label" for="price_sale">Giảm giá sản phẩm(không bắt buộc)</label>
                  <input class="form-control" id="price_sale" name="price_sale" type="text" placeholder="180,000">
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col">
                <div class="mb-3 mx-1">
                  <label class="form-label" for="description">miêu tả</label>
                  <textarea class="form-control" id="description"></textarea>
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

              </div>
              <div class="d-flex justify-content-center align-items-center">
                <div id="button" class="btn btn-secondary mx-auto">thêm ảnh</div>
              </div>
            </div>
          </div>
        </div>
        {{-- end thêm ảnh --}}
      </div>


      {{-- biến thể --}}
      <div class="col" id="divContainer">
       
        
      </div>
      <div class="d-flex justify-content-center  align-items-center">
        <button class="btn btn-success mx-1">thêm sản phẩm</button>
        <button type="button" onclick="addVariant()" id="variant " class="btn btn-success mx-1">Thêm biến thể</button>
      </div>
      {{-- end biến thể --}}
    </form>
  </div>
</div>

@endsection

@section('js_main')
<script>
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
    });


  const imagediv = document.getElementById('imagediv')
  var lengimage = 0
  const lick = document.getElementById('button');
  lick.addEventListener('click', () => {
    // console.log('hi');
    if (lengimage < 4) {
      lengimage++;
      const addimage = `
         <div class="mb-3">
              <input class="form-control" id="image_product_${lengimage}" name="images[]" type="file" accept="image/*">
              <div class="previewContainer" id="previewContainer_${lengimage}"></div>
            </div>
        `
      imagediv.insertAdjacentHTML('beforeend', addimage);
    }
  })

  const color = @json($color); // chuyển đổi dữ liệu sang json
  const size = @json($size);
  console.log(size, color);

  let variantCount = 0; 
  const divContainer = document.getElementById('divContainer');

  function addVariant() {
    console.log('Thêm biến thể mới');

      variantCount++;

      let sizeOptions = `<option>--- Chọn Size ---</option>`;
      size.forEach((size) => {
        sizeOptions += `<option value="${size.id}">${size.name}</option>`;
      })// duyệt các phần tử mảng json
      let colorOptions = `<option>--- Chọn Size ---</option>`;
      color.forEach((color) => {
        colorOptions += `<option value="${color.id}">${color.name}</option>`;
      })

      var variantHtml = `
        <div class="ads card-body basic-form" id="variant-${variantCount}" >
          <div class="container d-flex">
            <div class="card-header card-no-border">
              <h3>Biến thể ${variantCount}</h3>
            </div>
            <div>
              <button type="button" class="btn btn-danger btn-sm" id="delete" onclick="deleteVariant(${variantCount})">Xóa</button>
            </div>
          </div>
          <div id="divContainer" class=" row card-wrapper border rounded-3 my-1 d-flex">
            <div class="col-3">
              <label class="form-label" for="size_id">kích cỡ</label>
              <select class="form-select" name="size_id" id="size_${variantCount}">
                ${sizeOptions}
              </select>
            </div>
            <div class="col-3">
              <label class="form-label" for="color_id">màu</label>
              <select class="form-select" name="color" id="color_${variantCount}">
                ${colorOptions}
              </select>
            </div>
            <div class="col-3">
              <label class="form-label" for="	quanlity">số lượng</label>
              <input class="form-control" id="quanlity_${variantCount}" name="quanlity1[]" type="text" placeholder="30">
            </div>
            <div class="col-3">
              <label class="form-label" for="price">giá</label>
              <input class="form-control" id="price_${variantCount}" name="price[]" type="text" placeholder="120,000">
            </div>
          </div>
      `;
      divContainer.insertAdjacentHTML('beforeend', variantHtml);
    }
    function deleteVariant(variantCount) {
    const variant = document.getElementById(`variant-${variantCount}`);
    if (variant) {
        variant.remove(); // Xóa biến thể khỏi DOM
        
        
    }
}
</script>
@endsection