<?php

namespace Tests\Browser;

use Tests\Browser\Pages\HomePage;
use Laravel\Dusk\Browser;
use Tests\DuskTestCase;

class ExampleTest extends DuskTestCase
{
    /**
     * A basic browser test example.
     *
     * @return void
     */
    public function testBasicExample()
    {
        $this->browse(function (Browser $browser) {
            $browser->visit(new HomePage)->click('#nav-ethereum')->assertSeeIn('#title', 'ETHEREUM');
        });
    }
}
