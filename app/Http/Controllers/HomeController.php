<?php

namespace App\Http\Controllers;

use App\Coin;
use Illuminate\Http\Request;

class HomeController extends Controller
{
    public function index()
    {
        $coins = Coin::all();

        return view('welcome', ['coins' => $coins]);
    }
}
