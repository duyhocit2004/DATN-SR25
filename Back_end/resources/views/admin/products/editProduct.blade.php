@extends('admin.index')
@section('css')
  <style>
    #ss {
    display: flex;
    }

    #ss1 {
    margin-top: 15%;
    }

    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }

    #previewImage {
    display: flex;
    flex-wrap: wrap;
    /* Allows wrapping of images */
    justify-content: center;
    /* Centers images horizontally */
    align-items: center;
    /* Centers images vertically */
    }

    .previewContainer1 {
    max-width: 100px;
    max-height: 100px;
    margin: 5px;
    }

    .previewContainer {
    max-width: 250px;
    /* You can adjust this size */
    max-height: 250px;
    /* You can adjust this size */
    margin: 5px;
    /* Space between images */
    }
  </style>
@endsection
@section('main')
  <div class="container">
    <div class="row">
    <form action="{{route('update.Product', $idproduct->id)}}" method="POST" enctype="multipart/form-data">
      @method('PUT')
      @csrf
      <div class="container" id="ss">
      <div class="col-md-8">
        <div class="card">
        <div class="card-header card-no-border">
          <h3>Thêm sản phẩm</h3>
        </div>

        <div class="row">
          <div class="col">
          <div class="mb-3 mx-1">
            <label class="form-label" for="product">Tên sản phẩm</label>
            <input class="form-control" id="product" type="text" value="{{ $idproduct->name_product }}"
            name="product" placeholder="áo dài nam/nữ">
          </div>
          </div>
        </div>

        <div class="row">
          <div class="col">
          <div class="mb-3 mx-1">
            <label class="form-label" for="categories_id">Thể loại</label>
            <select class="form-select" id="categories_id" name="categories_id">
            @foreach ($categori as $as)
        <option value="{{ old('categories_id', $as->id) }}" {{ $as->id == $idproduct->categories_id ? 'selected' : '' }}>
          {{ $as->name }}{{ $as->type }}
        </option>
      @endforeach
            </select>
          </div>
          </div>
        </div>

        <div class="row">
          <div class="col">
          <div class="mb-3 mx-1">
            <label class="form-label" for="base_stock">Số lượng</label>
            <input class="form-control" id="base_stock" value="{{ $idproduct->base_stock }}" name="base_stock"
            type="text" placeholder="200">
          </div>
          </div>
        </div>

        <div class="row">
          <div class="col">
          <div class="mb-3 mx-1">
            <label class="form-label" for="price_regular">giá sản phẩm</label>
            <input class="form-control" id="price_regular" value="{{ $idproduct->price_regular }}"
            name="price_regular" type="text" placeholder="200,000">
          </div>
          </div>
        </div>

        <div class="row">
          <div class="col">
          <div class="mb-3 mx-1">
            <label class="form-label" for="price_sale">Giảm giá sản phẩm(không bắt buộc)</label>
            <input class="form-control" id="price_sale" value="{{ $idproduct->price_sale }}" name="price_sale"
            type="text" placeholder="180,000">
          </div>
          </div>
        </div>

        <div class="row">
          <div class="col">
          <div class="mb-3 mx-1">
            <label class="form-label" for="description">Miêu tả</label>
            <textarea class="form-control" name="description"
            id="description">{{ $idproduct->description }}</textarea>
          </div>
          </div>
        </div>

        </div>
      </div>
      {{-- thêm ảnh --}}
      <div class="col-md-4">


        <div class="card-body basic-form">
        <div class="card-header card-no-border">
          <h3>Thêm ảnh</h3>
        </div>
        <div class="row">
          <div class="col">
          <div class="mb-3 mx-1">
            <label class="form-label" for="file">ảnh</label>
            <input class="form-control" onchange="previewImage(this, 0)" id="file" name="file" type="file"
            placeholder="200">
          </div>
          <div class="d-flex justify-content-center align-items-center">
            <img src="{{$idproduct->image }}" class="previewContainer" id="preview_0" width="200px"
            alt="">
          </div>
          </div>
        </div>
        <div class="card-wrapper border rounded-3">
          <div class="card-header card-no-border">
          <h3>album ảnh</h3>
          </div>
          <div id="imagediv">
          <div class="mb-3">
            <input class="form-control" id="image_product" onchange="onlickImage()" name="images[]" multiple
            type="file" accept="image/*">
            <div id="previewImage">
            @foreach ($iamge as $as)
        <img src="{{$as->image_link}}" class="previewContainer1" alt="">
      @endforeach
            </div>
          </div>
          </div>
          {{-- <div class="d-flex justify-content-center align-items-center">
          <div id="button" class="btn btn-secondary mx-auto">thêm ảnh</div>
          </div> --}}
        </div>
        </div>
      </div>
      {{-- end thêm ảnh --}}

      </div>
      <div class="col" id="divContainer">
      @foreach ($variant as $index => $item)
      <div class="ads card-body basic-form" id="variant-{{ $index + 1 }}">
      <div class="container d-flex">
      <div class="card-header card-no-border">
        <h3>Biến thể {{$index + 1}}</h3>
      </div>
      <input type="text" value="{{$item->id}}" hidden name="variants[{{$index + 1}}][id]">
      <div>
        <button type="button" class="btn btn-danger btn-sm"
        onclick="deleteVariant11({{ $item->id }})">Xóa</button>
      </div>
      </div>
      <div class="row card-wrapper border rounded-3 my-1 d-flex">
      <div class="col-3">
        <label class="form-label" for="size_{{$index + 1}}">Kích cỡ</label>
        <select class="form-select" name="variants[{{$index + 1}}][size_id]" id="size_{{$index + 1}}">
        @foreach ($size as $sizeitem)
      <option value="{{$sizeitem->id}}" {{ $sizeitem->id === $item->size_id ? 'selected' : '' }}>
      {{$sizeitem->name}}
      </option>
    @endforeach
        </select>
      </div>
      <div class="col-3">
        <label class="form-label" for="color_{{$index + 1}}">Màu</label>
        <select class="form-select" name="variants[{{$index + 1}}][color_id]" id="color_{{$index + 1}}">
        @foreach ($color as $colors)
      <option value="{{$colors->id}}" {{ $colors->id === $item->colors_id ? 'selected' : '' }}>
      {{$colors->name}}
      </option>
    @endforeach
        </select>
      </div>
      <div class="col-3">
        <label class="form-label" for="quantity_{{$index + 1}}">Số lượng</label>
        <input class="form-control" id="quantity_{{$index + 1}}" name="variants[{{$index + 1}}][quantity]"
        type="text" placeholder="30" value="{{$item->quantity}}">
      </div>
      <div class="col-3">
        <label class="form-label" for="price_{{$index + 1}}">Giá</label>
        <input class="form-control" id="price_{{$index + 1}}" name="variants[{{$index + 1}}][price]" type="text"
        placeholder="120,000" value="{{$item->price}}">
      </div>
      </div>
      </div>
    @endforeach
      </div>
      <div class="d-flex justify-content-center  align-items-center">
      <a class="btn btn-primary" href="{{route('product')}}">quay lại</a>
      <button type="reset" class="btn btn-danger mx-1">reset</button>
      <button class="btn btn-success mx-1">sửa</button>
      <button type="button" onclick="addVariant()" id="variant " class="btn btn-success mx-1">Thêm biến
        thể</button>
      </div>
      {{-- thêm ảnh --}}

    </form>
    </div>
  </div>

@endsection

@section('js_main')
  <script>
    function previewImage(input, rowIndex) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
      document.getElementById(`preview_${rowIndex}`).setAttribute('src', e.target.result);
      }
      reader.readAsDataURL(input.files[0]);
    }
    }
    function onlickImage() {
    var previewContainer = document.getElementById('previewImage');
    previewContainer.innerHTML = '';
    const fileimage = document.getElementById('image_product').files;
    console.log(fileimage)

    for (let i = 0; i < fileimage.length; i++) {
      const file = fileimage[i];
      const reader = new FileReader();
      console.log(file)
      reader.onload = function (e) {
      const img = document.createElement('img');
      img.src = e.target.result;

      img.classList.add('previewContainer1');
      previewContainer.appendChild(img);
      };

      reader.readAsDataURL(file);
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

    let variantCount = @json(count($variant)); // Bắt đầu từ số lượng biến thể hiện tại
    const color = @json($color); // chuyển đổi dữ liệu sang json
    const size = @json($size);
    console.log(size, color);
    // let variantCount = 0;
    const divContainer = document.getElementById('divContainer');

    function addVariant() {
    console.log('Thêm biến thể mới');

    variantCount++;

    let sizeOptions = `<option>--- Chọn Size ---</option>`;
    size.forEach((size) => {
      sizeOptions += `<option value="${size.id}">${size.name}</option>`;
    }) // duyệt các phần tử mảng json
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
        <select class="form-select" name="variants[${variantCount}][size_id]" id="size_${variantCount}">
        ${sizeOptions}
        </select>
      </div>
      <div class="col-3">
        <label class="form-label" for="color_id">màu</label>
        <select class="form-select" name="variants[${variantCount}][color_id]" id="color_${variantCount}">
        ${colorOptions}
        </select>
      </div>
      <div class="col-3">
        <label class="form-label" for="	quantity">số lượng</label>
        <input class="form-control" id="quantity_${variantCount}" name="variants[${variantCount}][quantity]" type="text" placeholder="30">
      </div>
      <div class="col-3">
        <label class="form-label" for="price">giá</label>
        <input class="form-control" id="price_${variantCount}" name="variants[${variantCount}][price]" type="text" placeholder="120,000">
      </div>
      </div>
      `;
    divContainer.insertAdjacentHTML('beforeend', variantHtml);
    }
    function deleteVariant11(variantIndex) {
    const variantElement = document.getElementById(`variant-${variantIndex}`);

    if (variantElement) {
      const variantId = variantElement.querySelector("input[name^='variants']").value; // Lấy ID biến thể

      // Xóa trên giao diện trước
      variantElement.remove();

      // Gửi request để xóa trong database
      fetch(`/variant/${variantId}`, { // Gửi ID thực tế thay vì variantIndex
      method: 'DELETE',
      headers: {
        'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
        'Content-Type': 'application/json',
      }
      })
      .then(response => response.json())
      .then(data => {
        if (!data.success) {
        console.error('Lỗi khi xóa biến thể:', data.message);
        }
      })
      .catch(error => console.error('Lỗi kết nối:', error));
    }

    function deleteVariant(variantIndex) {
      const variantElement = document.getElementById(`variant-${variantIndex}`);
      variantElement.remove();
    }
    }

  </script>
@endsection