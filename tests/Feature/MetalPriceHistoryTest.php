<?php

use App\Models\MetalPrice;
use App\Models\User;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;

test('guests are redirected to the login page from metals history', function () {
    get('/metals/history')->assertRedirect(route('login'));
});

test('authenticated users can visit the metals history page', function () {
    $user = User::factory()->create();

    MetalPrice::create([
        'type' => 'gold',
        'price' => 2500.50,
        'currency' => 'USD',
        'unit' => 'ounce',
    ]);

    actingAs($user)
        ->get('/metals/history')
        ->assertOk();
});
