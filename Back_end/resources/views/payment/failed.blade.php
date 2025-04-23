<!DOCTYPE html>
<html>
<head>
    <title>Payment Failed</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card">
                    <div class="card-body text-center">
                        <i class="fas fa-times-circle fa-5x text-danger mb-4"></i>
                        <h1 class="text-danger">Payment Failed</h1>
                        <div class="mt-4">
                            <p class="lead">Sorry, your payment could not be processed.</p>
                            <div class="payment-details">
                                @if(isset($orderId))
                                    <p><strong>Order ID:</strong> {{ $orderId }}</p>
                                @endif
                                <p><strong>Error Message:</strong> {{ $message }}</p>
                            </div>
                        </div>
                        <div class="mt-4">
                            <a href="/" class="btn btn-primary">Return to Home</a>
                            <a href="{{ route('payment.create') }}" class="btn btn-secondary">Try Again</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>
</html> 