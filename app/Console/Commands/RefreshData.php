<?php

namespace App\Console\Commands;

use App\Coin;
use App\Price;
use App\Volume;
use App\Marketcap;
use Illuminate\Support\Carbon;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class RefreshData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'dashdesk:refresh';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Refreshes the hourly data from coinGecko';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $coins = Coin::all();
        
        $before_yesterday = now()->subDay(91)->timestamp;
        $now = now()->timestamp;

        foreach ($coins as $coin) {
            $result = Http::get("api.coingecko.com/api/v3/coins/{$coin->id_coingecko}/market_chart/range?vs_currency=eur&from=$before_yesterday&to=$now")->json();
            foreach ($result['prices'] as $key => $price) {
                $result['prices'][$key] = [
                    'time' => Carbon::createFromTimeStampMs($price[0]),
                    'price' => $price[1],
                    'coin_id' => $coin->id,
                ];
            }
            collect($result['prices'])->each(function ($item) {
                try {
                    Price::insert($item);
                } catch (\Throwable $th) {
                    //throw $th;
                }
            });

            foreach ($result['market_caps'] as $key => $marketcap) {
                $result['market_caps'][$key] = [
                    'time' => Carbon::createFromTimeStampMs($marketcap[0]),
                    'marketcap' => $marketcap[1],
                    'coin_id' => $coin->id,
                ];
            }
            collect($result['market_caps'])->each(function ($item) {
                try {
                    Marketcap::insert($item);
                } catch (\Throwable $th) {
                    //throw $th;
                }
            });

            foreach ($result['total_volumes'] as $key => $volume) {
                $result['total_volumes'][$key] = [
                    'time' => Carbon::createFromTimeStampMs($volume[0]),
                    'volume' => $volume[1],
                    'coin_id' => $coin->id,
                ];
                
            }
            collect($result['total_volumes'])->each(function ($item) {
                try {
                    Volume::insert($item);
                } catch (\Throwable $th) {
                    //throw $th;
                }
                
            });
        }
    }
}
