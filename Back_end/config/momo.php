<?php

return [
    'partner_code' => env('MOMO_PARTNER_CODE', 'MOMOBKUN20180529'),
    'access_key' => env('MOMO_ACCESS_KEY', 'klm05TvNBzhg7h7j'),
    'secret_key' => env('MOMO_SECRET_KEY', 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa'),
    'endpoint' => env('MOMO_ENDPOINT', 'https://test-payment.momo.vn/v2/gateway/api/create'),
    'return_url' => env('MOMO_RETURN_URL', 'http://localhost:8000/api/momo/return'),
    'notify_url' => env('MOMO_NOTIFY_URL', 'http://localhost:8000/api/momo/notify'),
    'lang' => 'vi',
    'request_type' => 'captureWallet',
]; 