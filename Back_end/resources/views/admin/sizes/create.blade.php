@extends('admin.index')
@section('main')
    <div class="container mt-3">
        <div class="row">
            <div class="">
                <div class="card-body">
                    <h2 class="mb-3">Thêm Size</h2>
                    <div class="card-wrapper border rounded-3">
                        @if ($errors->any())
                            <div class="alert alert-danger">
                                <ul>
                                    @foreach ($errors->all() as $error)
                                        <li>{{ $error }}</li>
                                    @endforeach
                                </ul>
                            </div>
                        @endif
                        <form action="{{ route('sizes.store') }}" method="POST">
                            @csrf
                            <div class="mb-3">
                                <label for="name" class="form-label">Tên Size</label>
                                <input type="text" name="name" class="form-control">
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
