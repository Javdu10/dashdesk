<?php

use Illuminate\Database\Seeder;

class CoinSeeder extends Seeder
{
    /**
     * Run the database seeds for coins.
     *
     * @return void
     */
    public function run()
    {
        DB::table('coins')->insert([
            'id_coingecko' => 'nano',
            'name' => 'Nano',
            'symbol' => 'NANO',
            'logo' => 'https://assets.coingecko.com/coins/images/756/thumb/nano-coin-logo.png'
        ]);

        DB::table('coins')->insert([
            'id_coingecko' => 'ethereum',
            'name' => 'Ethereum',
            'symbol' => 'ETH',
            'logo' => 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png',
        ]);

        DB::table('coins')->insert([
            'id_coingecko' => 'monero',
            'name' => 'Monero',
            'symbol' => 'XMR',
            'logo' => 'https://assets.coingecko.com/coins/images/69/thumb/monero_logo.png',
        ]);
    }
}
