@extends('admin.index')
@section('css')
    <style>
        .previewContainer {
            max-width: 250px;
            /* You can adjust this size */
            max-height: 250x;
            /* You can adjust this size */
            margin: 5px;
            /* Space between images */
        }

        .previewContainer1 {
            max-width: 100px;
            max-height: 100px;
            margin: 5px;
        }

        #previewImage {
            display: flex;
            flex-wrap: wrap;
        }

        #ss {
            display: flex;
        }
    </style>
@endsection
@section('main')
    <div class="container">
        <div class="row">
            <form action="{{ route('postProduct') }}" method="POST" enctype="multipart/form-data">
                @csrf
                <div class="container" id="ss">
                    <div class="col-md-7 mt-2">
                        <div class="card">
                            <div class="card-header">
                                <h3>Thêm Sản Phẩm</h3>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <div class="mb-3 mx-1">
                                        <label class="form-label" for="product">Tên sản phẩm</label>
                                        <input class="form-control" id="product" type="text" value="{{old('product')}}" name="product" placeholder="Nhập tên sản phẩm">
                                        @error('product')
                                        <p class="text-danger">{{ $message }}</p>
                                        @enderror
                                    </div>
                                   
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <div class="mb-3 mx-1">
                                        <label class="form-label" for="categories_id">Thể loại</label>
                                        <select class="form-select" id="categories_id" name="categories_id">
                                            <option value="" disabled selected>-- Chọn thể loại --</option> <!-- Option mặc định -->
                                            @foreach ($categori as $as)
                                                <option value="{{ $as->id }}" {{ old('categories_id') }}>
                                                    {{ $as->name }}
                                                </option>
                                            @endforeach
                                        </select>
                                        @error('categories_id')
                                            <p class="text-danger">{{ $message }}</p>
                                        @enderror
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <div class="mb-3 mx-1">
                                        <label class="form-label" for="base_stock">Số lượng</label>
                                        <input class="form-control" id="base_stock"  value="{{old('base_stock')}}"name="base_stock" type="text" placeholder="Nhập số lượng">
                                        @error('base_stock')
                                        <p class="text-danger">{{ $message }}</p>
                                        @enderror
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <div class="mb-3 mx-1">
                                        <label class="form-label" for="price_regular">Giá sản phẩm</label>
                                        <input class="form-control" id="price_regular" value="{{old('price_regular')}}" name="price_regular" type="text"
                                            placeholder="Nhập giá sản phẩm">
                                        @error('price_regular')
                                        <p class="text-danger">{{ $message }}</p>
                                        @enderror
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <div class="mb-3 mx-1">
                                        <label class="form-label" for="price_sale">Giảm giá sản phẩm(không bắt buộc)</label>
                                        <input class="form-control" id="price_sale" value="{{old('price_sale')}}" name="price_sale" type="text"
                                            placeholder="Nhập giảm giá">
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <div class="mb-3 mx-1">
                                        <label class="form-label" for="description">Mô tả</label>
                                        <textarea class="form-control" name="description" value="{{old('description')}}" id="description"></textarea>
                                        @error('description')
                                        <p class="text-danger">{{ $message }}</p>
                                        @enderror
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
                                        <label class="form-label" for="file">Ảnh</label>
                                        <input class="form-control" onchange="previewImage(this, 0)" id="file"
                                            name="file" type="file" placeholder="200" value="{{old('file')}}">
                                        @error('file')
                                            <p class="text-danger">{{ $message }}</p>
                                        @enderror
                                    </div>
                                    <div class="d-flex justify-content-center align-items-center">
                                        <img src="" class="previewContainer"
                                            style ="max-width:250px;max-height: 250x;" id="preview_0" width="100px"
                                            alt="">
                                    </div>
                                </div>
                            </div>
                            <div class="card-wrapper border rounded-3">
                                <div class="card-header card-no-border">
                                    <h3>Album ảnh</h3>
                                </div>
                                <div id="imagediv">
                                    <div class="mb-3">
                                        <input class="form-control" id="image_product" onchange="onlickImage()"
                                            name="images[]" multiple type="file" accept="image/*">
                                        <div id="previewImage">

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


                {{-- biến thể --}}
                <div class="col" id="divContainer">

                </div>
                <div class="d-flex justify-content-center mb-3">
                    <button class="btn btn-success mx-1">Thêm sản phẩm</button>
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
            })
        // .CKEDITOR.config.autoParagraph = false
        length

        function onlickImage() {
            var previewContainer = document.getElementById('previewImage');
            previewContainer.innerHTML = '';
            const fileimage = document.getElementById('image_product').files;
            console.log(fileimage)

            for (let i = 0; i < fileimage.length; i++) {
                const file = fileimage[i];
                const reader = new FileReader();
                console.log(file)
                reader.onload = function(e) {
                    const img = document.createElement('img');
                    img.src = e.target.result;

                    img.classList.add('previewContainer1');
                    previewContainer.appendChild(img);
                };

                reader.readAsDataURL(file);
            }
        }
        // thêm ảnh
        // const imagediv = document.getElementById('imagediv')
        // var lengimage = 0
        // const lick = document.getElementById('button');
        // lick.addEventListener('click', () => {
        //   // console.log('hi');
        //   if (lengimage < 4) {
        //     lengimage++;
        //     const addimage = `
    //        <div class="mb-3">
    //             <input class="form-control"  id="image_product_${lengimage}" name="images[]"  type="file" accept="image/*">
    //             <div >
    //               <img src="" class="previewContainer" id="preview_0"  alt="">
    //           </div>
    //       `
        //     imagediv.insertAdjacentHTML('beforeend', addimage);

        //   }
        // })

        function previewImage(input, rowIndex) {
            if (input.files && input.files[0]) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    document.getElementById(`preview_${rowIndex}`).setAttribute('src', e.target.result);
                }
                reader.readAsDataURL(input.files[0]);
            }
        }

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
              <label class="form-label" for="quantity">số lượng</label>
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

        function deleteVariant(variantCount) {
            const variant = document.getElementById(`variant-${variantCount}`);
            if (variant) {
                variant.remove(); // Xóa biến thể khỏi DOM


            }
        }
    </script>
@endsection
