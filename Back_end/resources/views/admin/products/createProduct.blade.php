@extends('admin.index')
@section('main')
<div class="container">
    <form action="{{route('postProduct')}}" method="POST" enctype="multipart/form-data">
    @csrf
    <div class="col-xl-7">
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
                  <div class="mb-3 mx-1" >
                    <label class="form-label" for="category">Thể loại</label>
                    <select class="form-select" id="category" name="category">
                      <option>5</option>

                    </select>
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <div class="mb-3 mx-1" >
                    <label class="form-label" for="quanlity">Số lượng</label>
                    <input class="form-control" id="quanlity" type="text" placeholder="200">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <div class="mb-3 mx-1" >
                    <label class="form-label" for="price_regular">giá sản phẩm</label>
                    <input class="form-control" id="price_regular" name="price_regular" type="text" placeholder="200,000">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <div class="mb-3 mx-1" >
                    <label class="form-label" for="price_sale">Giảm giá sản phẩm(không bắt buộc)</label>
                    <input class="form-control" id="price_sale" name="price_sale" type="text" placeholder="180,000">
                  </div>
                </div>
              </div>

              <div class="row">
                <div class="col">
                  <div class="mb-3 mx-1" >
                    <label class="form-label" for="description">miêu tả</label>
                    <textarea class="form-control" id="description"></textarea>
                  </div>
                </div>
              </div>
           
          </div>
        </div>
    </div>
    <button>thêm</button>
</form> 
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
</script>
@endsection