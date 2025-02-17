<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Giỏ hàng</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body>
    <div class="container mt-5">
        <h2>Giỏ hàng</h2>

            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>Sản phẩm</th>
                        <th>Số lượng</th>
                        <th>Giá</th>
                        <th>Tổng</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach($carts as $item)
                        <tr>
                            <td>{{ $item->productVariant->name }}</td>
                            <td>{{ $item->quantity }}</td>
                            <td>{{ number_format($item->productVariant->price, 0, ',', '.') }} VNĐ</td>
                            <td>{{ number_format($item->sub_total, 0, ',', '.') }} VNĐ</td>
                            <td>
                                {{-- <form action="{{ route('cart.destroy', $item->id) }}" method="POST">
                                    @csrf
                                    @method('DELETE')
                                    <button type="submit" class="btn btn-danger">Xóa</button>
                                </form> --}}
                            </td>
                        </tr>
                    @endforeach
                </tbody>
            </table>
            {{-- <form action="{{ route('cart.clear') }}" method="POST">
                @csrf
                <button type="submit" class="btn btn-warning">Xóa toàn bộ giỏ hàng</button>
            </form> --}}

    </div>
</body>
</html>
