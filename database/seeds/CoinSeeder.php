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
            'logo' => 'https://assets.coingecko.com/coins/images/756/thumb/nano-coin-logo.png',
            'description' => 'Launched in 2015, Nano describes itself as an open source, sustainable, and secure next-generation digital currency focused on removing perceived inefficiencies present in existing cryptocurrencies. Designed to solve peer to peer transfer of value, Nano aims to revolutionize the world economy through an ultrafast and fee-less network that is open and accessible to everyone.',
        ]);

        DB::table('coins')->insert([
            'id_coingecko' => 'ethereum',
            'name' => 'Ethereum',
            'symbol' => 'ETH',
            'logo' => 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png',
            'description' => 'Ethereum is a smart contract platform that enables developers to build decentralized applications (DApps) on its blockchain. Ether (ETH) is the native digital currency of the Ethereum platform.

            Ethereum is supported in part by the Ethereum Foundation, a non-profit that is part of the larger Ethereum ecosystem including enterprise Ethereum consortiums like the Ethereum Enterprise Alliance.',
        ]);

        DB::table('coins')->insert([
            'id_coingecko' => 'monero',
            'name' => 'Monero',
            'symbol' => 'XMR',
            'logo' => 'https://assets.coingecko.com/coins/images/69/thumb/monero_logo.png',
            'description' => 'Monero (XMR) is a private, secure and untraceable cryptocurrency that was launched April 18, 2014 as a fork of ByteCoin. It is an open-source, privacy-oriented digital currency built on a blockchain that is designed to be opaque. With Monero, it is said you are in complete control of your funds and privacy, as no one else can see anyone else\'s balances or transactions.',
        ]);
    }
}
