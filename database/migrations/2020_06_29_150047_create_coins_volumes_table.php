<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoinsVolumesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('coins_volumes', function (Blueprint $table) {
            $table->id();
            $table->decimal('value', 20, 2);
            $table->datetime('time');
            $table->unique(['value', 'time']);
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
        Schema::dropIfExists('coins_volumes');
    }
}
