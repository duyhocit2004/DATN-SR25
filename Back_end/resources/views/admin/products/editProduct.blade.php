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
            <form action="{{ route('postProduct') }}" method="POST" enctype="multipart/form-data">
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
                                        <input class="form-control" id="product" type="text"
                                            value="{{ $idproduct->name_product }}" name="product"
                                            placeholder="áo dài nam/nữ">
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <div class="mb-3 mx-1">
                                        <label class="form-label" for="categories_id">Thể loại</label>
                                        <select class="form-select" id="categories_id" name="categories_id">
                                            @foreach ($categori as $as)
                                                <option value="{{ $as->id }}"
                                                    {{ $as->id == $idproduct->categories_id ? 'selected' : '' }}>
                                                    {{ $as->name }}{{ $as->type }}</option>
                                            @endforeach
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <div class="mb-3 mx-1">
                                        <label class="form-label" for="quanlity">Số lượng</label>
                                        <input class="form-control" id="quanlity" value="{{ $idproduct->quanlity }}"
                                            name="quanlity" type="text" placeholder="200">
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <div class="mb-3 mx-1">
                                        <label class="form-label" for="price_regular">giá sản phẩm</label>
                                        <input class="form-control" id="price_regular"
                                            value="{{ $idproduct->price_regular }}" name="price_regular" type="text"
                                            placeholder="200,000">
                                    </div>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col">
                                    <div class="mb-3 mx-1">
                                        <label class="form-label" for="price_sale">Giảm giá sản phẩm(không bắt buộc)</label>
                                        <input class="form-control" id="price_sale" value="{{ $idproduct->price_sale }}"
                                            name="price_sale" type="text" placeholder="180,000">
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
                                    @foreach ($iamge as $amge)
                                        <div class="container" class="d-flex">
                                            <div class="col-3">
                                                <img id="image" src="{{ Storage::url($amge->image_link) }}"
                                                    id="imagevariant" width="120px" height="120px" alt="">
                                            </div>
                                            <div class="mb-3">
                                                <input class="form-control" id="image_product" name="images[]"
                                                    type="file" accept="image/*">
                                                <div class="previewContainer" id="previewContainer"></div>
                                            </div>
                                        </div>
                                    @endforeach
                                </div>

                                <div class="d-flex justify-content-center align-items-center">
                                    <div id="button" onclick="previewimage(this,0)" class="btn btn-secondary mx-auto">
                                        thêm ảnh</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {{-- end thêm ảnh --}}
                </div>

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

        function previewimage(button, index) {
            const inputFile = document.querySelectorAll('input[type="file"]')[index]; // Lấy input file theo index
            const previewContainer = inputFile.nextElementSibling; // Lấy previewContainer ngay sau input file

            // Xóa nội dung cũ trong previewContainer
            previewContainer.innerHTML = '';

            // Kiểm tra xem có file nào được chọn không
            if (inputFile.files && inputFile.files[0]) {
                const reader = new FileReader();

                reader.onload = function(e) {
                    // Tạo thẻ img để hiển thị ảnh xem trước
                    const img = document.createElement('img');
                    img.src = e.target.result;
                    img.className = 'img-thumbnail'; // Thêm class để định dạng
                    img.style.width = '120px'; // Kích thước ảnh xem trước
                    img.style.height = '120px'; // Kích thước ảnh xem trước
                    previewContainer.appendChild(img); // Thêm ảnh vào previewContainer
                }

                reader.readAsDataURL(inputFile.files[0]); // Đọc file dưới định dạng Data URL
            }
        }
    </script>
@endsection

<style>
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
                <div class="col-md-7">
                    <div class="card">
                        <div class="card-header card-no-border">
                            <h3>Thêm sản phẩm</h3>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="mb-3 mx-1">
                                    <label class="form-label" for="product">Tên sản phẩm</label>
                                    <input class="form-control" id="product" type="text"
                                        value="{{ $idproduct->name_product }}" name="product"
                                        placeholder="áo dài nam/nữ">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="mb-3 mx-1">
                                    <label class="form-label" for="categories_id">Thể loại</label>
                                    <select class="form-select" id="categories_id" name="categories_id">
                                        @foreach ($categori as $as)
                                            <option value="{{ $as->id }}"
                                                {{ $as->id == $idproduct->categories_id ? 'selected' : '' }}>
                                                {{ $as->name }}{{ $as->type }}</option>
                                        @endforeach
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="mb-3 mx-1">
                                    <label class="form-label" for="quanlity">Số lượng</label>
                                    <input class="form-control" id="quanlity" value="{{ $idproduct->quanlity }}"
                                        name="quanlity" type="text" placeholder="200">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="mb-3 mx-1">
                                    <label class="form-label" for="price_regular">giá sản phẩm</label>
                                    <input class="form-control" id="price_regular"
                                        value="{{ $idproduct->price_regular }}" name="price_regular" type="text"
                                        placeholder="200,000">
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col">
                                <div class="mb-3 mx-1">
                                    <label class="form-label" for="price_sale">Giảm giá sản phẩm(không bắt
                                        buộc)</label>
                                    <input class="form-control" id="price_sale" value="{{ $idproduct->price_sale }}"
                                        name="price_sale" type="text" placeholder="180,000">
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
                                @foreach ($iamge as $amge)
                                    <div class="container" class="d-flex">
                                        <div class="col-3">
                                            <img id="image" src="{{ Storage::url($amge->image_link) }}"
                                                id="imagevariant" width="120px" height="120px" alt="">
                                        </div>
                                        <div class="mb-3">
                                            <input class="form-control" id="image_product" name="images[]"
                                                type="file" accept="image/*">
                                            <div class="previewContainer" id="previewContainer"></div>
                                        </div>
                                    </div>
                                @endforeach
                            </div>

                            <div class="d-flex justify-content-center align-items-center">
                                <div id="button" onclick="previewimage(this,0)" class="btn btn-secondary mx-auto">
                                    thêm ảnh</div>
                            </div>
                        </div>
                    </div>
                </div>
                {{-- end thêm ảnh --}}
            </div>

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

    function previewimage(button, index) {
        const inputFile = document.querySelectorAll('input[type="file"]')[index]; // Lấy input file theo index
        const previewContainer = inputFile.nextElementSibling; // Lấy previewContainer ngay sau input file

        // Xóa nội dung cũ trong previewContainer
        previewContainer.innerHTML = '';

        // Kiểm tra xem có file nào được chọn không
        if (inputFile.files && inputFile.files[0]) {
            const reader = new FileReader();

            reader.onload = function(e) {
                // Tạo thẻ img để hiển thị ảnh xem trước
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'img-thumbnail'; // Thêm class để định dạng
                img.style.width = '120px'; // Kích thước ảnh xem trước
                img.style.height = '120px'; // Kích thước ảnh xem trước
                previewContainer.appendChild(img); // Thêm ảnh vào previewContainer
            }

            reader.readAsDataURL(inputFile.files[0]); // Đọc file dưới định dạng Data URL
        }
    }
</script>
@endsection
