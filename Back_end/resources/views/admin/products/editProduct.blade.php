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
    max-height: 250x;
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
        <option value="{{ $as->id }}" {{ $as->id == $idproduct->categories_id ? 'selected' : '' }}>
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
            <label class="form-label" for="quanlity">Số lượng</label>
            <input class="form-control" id="quanlity" value="{{ $idproduct->base_stock }}" name="quanlity"
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
            <img src="{{Storage::url($idproduct->image)  }}" class="previewContainer" id="preview_0" width="200px"
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
        <img src="{{Storage::url($as->image_link)}}" class="previewContainer1" alt="">
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
      <div class="d-flex justify-content-center  align-items-center">
      <a class="btn btn-primary" href="{{route('product')}}">quay lại</a>
      <button type="reset" class="btn btn-danger mx-1">reset</button>
      <button class="btn btn-success mx-1">sửa</button>
      </div>
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


  </script>
@endsection