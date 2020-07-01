<?php

use App\Coin;
use App\Marketcap;
use App\Price;
use App\Volume;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class StatsSeeder extends Seeder
{
    /**
     * Run the database seeds for coins stats.
     * As the CoinGecko docs :.
     * 
     * 
     * "daily data will be used for duration more than 90 days"
     *
     * @return void
     */
    public function run()
    {
        $coins = Coin::all();
        $first_of_january_2017 = '1483228800';
        $now = now()->timestamp;

        foreach ($coins as $coin) {
            $result = Http::get("api.coingecko.com/api/v3/coins/{$coin->id_coingecko}/market_chart/range?vs_currency=eur&from=$first_of_january_2017&to=$now")->json();
            foreach ($result['prices'] as $key => $price) {
                $result['prices'][$key] = [
                    'time' => Carbon::createFromTimeStampMs($price[0]),
                    'value' => $price[1],
                    'coin_id' => $coin->id,
                ];
            }
            Price::insert($result['prices']);

            foreach ($result['market_caps'] as $key => $marketcap) {
                $result['market_caps'][$key] = [
                    'time' => Carbon::createFromTimeStampMs($marketcap[0]),
                    'value' => $marketcap[1],
                    'coin_id' => $coin->id,
                ];
            }

            Marketcap::insert($result['market_caps']);

            foreach ($result['total_volumes'] as $key => $volume) {
                $result['total_volumes'][$key] = [
                    'time' => Carbon::createFromTimeStampMs($volume[0]),
                    'value' => $volume[1],
                    'coin_id' => $coin->id,
                ];
            }
            Volume::insert($result['total_volumes']);
        }
    }
}
