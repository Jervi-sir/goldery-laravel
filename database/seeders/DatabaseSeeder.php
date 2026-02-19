<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {

        \App\Models\Role::firstOrCreate(['name' => 'admin'], [
            'description' => 'Administrator with full access'
        ]);

        \App\Models\Role::firstOrCreate(['name' => 'user'], [
            'description' => 'Regular user'
        ]);

        $adminRole = \App\Models\Role::where('name', 'admin')->first();

        $user = User::factory()->create([
            'name' => 'Gold Tracker Admin',
            'email' => 'admin@goldery.com',
            'is_subscribed' => true,
            'role_id' => $adminRole->id
        ]);

        \App\Models\MetalPrice::create(['type' => 'gold', 'price' => 2030.50, 'currency' => 'USD', 'unit' => 'ounce']);
        \App\Models\MetalPrice::create(['type' => 'silver', 'price' => 23.00, 'currency' => 'USD', 'unit' => 'ounce']);
        \App\Models\MetalPrice::create(['type' => 'copper', 'price' => 3.80, 'currency' => 'USD', 'unit' => 'pound']);

        \App\Models\CurrencyRate::create(['pair' => 'USD/DZD', 'rate' => 220.00]);
        \App\Models\CurrencyRate::create(['pair' => 'EUR/DZD', 'rate' => 242.00]);
    }
}
