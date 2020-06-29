<?php

use App\Coin;
use App\Price;
use App\Volume;
use App\Marketcap;
use Illuminate\Support\Carbon;
use Illuminate\Database\Seeder;

class StatsSeeder extends Seeder
{
    /**
     * Run the database seeds for coins stats.
     * As the CoinGecko docs : 
     * 
     * "Hourly data will be used for duration between 1 day and 90 days"
     *
     * @return void
     */
    public function run()
    {
        $coins = Coin::all();
        $first_of_may = '1588291200';
        $now = now()->timestamp;

        foreach ($coins as $coin) {
            $result = Http::get("api.coingecko.com/api/v3/coins/{$coin->id_coingecko}/market_chart/range?vs_currency=eur&from=$first_of_may&to=$now")->json();
            foreach ($result['prices'] as $key => $price) {
                $result['prices'][$key] = [
                    'time' => Carbon::createFromTimeStampMs($price[0]),
                    'price' => $price[1],
                    'coin_id' => $coin->id,
                ];
            }
            Price::insert($result['prices']);

            foreach ($result['market_caps'] as $key => $marketcap) {
                $result['market_caps'][$key] = [
                    'time' => Carbon::createFromTimeStampMs($marketcap[0]),
                    'marketcap' => $marketcap[1],
                    'coin_id' => $coin->id,
                ];
            }

            Marketcap::insert($result['market_caps']);

            foreach ($result['total_volumes'] as $key => $volume) {
                $result['total_volumes'][$key] = [
                    'time' => Carbon::createFromTimeStampMs($volume[0]),
                    'volume' => $volume[1],
                    'coin_id' => $coin->id,
                ];
                
            }
            Volume::insert($result['total_volumes']);
        }
    }
}
