<?php

namespace  App\Services\Cart;

use App\Models\products;
use SebastianBergmann\CodeCoverage\Report\Xml\Totals;

class Cart{
    public $products = null;
    public $totalPrice = 0;
    public $totalQuantity = 0;

    public function __constant($cart){
        if($cart){
            $this->products = $cart->products;
            $this->totalPrice = $cart->totalPrice;
            $this->totalQuantity = $cart->totalQuantity;
        }
    }

    public function addCart(){
        
    }
}
