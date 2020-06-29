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
        ]);

        DB::table('coins')->insert([
            'id_coingecko' => 'ethereum',
            'name' => 'Ethereum',
            'symbol' => 'ETH',
        ]);

        DB::table('coins')->insert([
            'id_coingecko' => 'monero',
            'name' => 'Monero',
            'symbol' => 'XMR',
        ]);
    }
}
