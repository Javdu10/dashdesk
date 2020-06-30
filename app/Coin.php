<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Coin extends Model
{
    public $timestamps = false;

    public function lastPrice()
    {
        return Price::where('coin_id', $this->id)->orderBy('id', 'DESC')->first()->value;
    }

    public function lastVolume()
    {
        return Volume::where('coin_id', $this->id)->orderBy('id', 'DESC')->first()->value;
    }

    public function lastMarketCap()
    {
        return Marketcap::where('coin_id', $this->id)->orderBy('id', 'DESC')->first()->value;
    }

    public function prices()
    {
        return $this->hasMany(Price::class);
    }

    public function volumes()
    {
        return $this->hasMany(Volume::class);
    }

    public function marketcaps()
    {
        return $this->hasMany(Marketcap::class);
    }
}
