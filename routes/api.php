<?php

use App\Coin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/coin/{coin_gecko}', function (Request $request, $coin_gecko) {
    $coin = Coin::where('id_coingecko', $coin_gecko)->firstOrFail();

    $data = [];
    $data['prices'] = $coin->prices()->orderBy('id', 'DESC')->take(24)->get();
    return response()->json($data);
});
