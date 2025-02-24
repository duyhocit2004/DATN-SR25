@extends('admin.layout.app')

@section('content')
    <div class="container">
        <h2>Create New Size</h2>

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
                <label for="name" class="form-label">Size Name</label>
                <input type="text" name="name" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-success">Create</button>
        </form>
    </div>
@endsection
