<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoinsMarketcapTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coins_marketcap', function (Blueprint $table) {
            $table->id();
            $table->decimal('marketcap', 20, 2);
            $table->datetime('time');
            $table->unique(['marketcap', 'time']);
            $table->foreignId('coin_id')->constrained();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('coins_marketcap');
    }
}
