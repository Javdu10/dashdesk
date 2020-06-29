<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Marketcap extends Model
{
    public $timestamps = false;

    protected $table = 'coins_marketcap';
}
