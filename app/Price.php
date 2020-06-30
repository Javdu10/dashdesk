<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Price extends Model
{
    public $timestamps = false;

    protected $table = 'coins_prices';

    public function coin()
    {
        return $this->belongsTo(Coin::class);
    }
}
