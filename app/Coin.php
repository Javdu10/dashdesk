<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Coin extends Model
{
    public $timestamps = false;

    public function lastPrice()
    {
        return Price::where('coin_id', $this->id)->orderBy('id', 'DESC')->first()->price;
    }

    public function lastVolume()
    {
        return Volume::where('coin_id', $this->id)->orderBy('id', 'DESC')->first()->volume;
    }

    public function lastMarketCap()
    {
        return Marketcap::where('coin_id', $this->id)->orderBy('id', 'DESC')->first()->marketcap;
    }
}
