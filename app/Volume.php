<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Volume extends Model
{
    public $timestamps = false;

    protected $table = 'coins_volumes';

    public function coin()
    {
        return $this->belongsTo(Coin::class);
    }
}
