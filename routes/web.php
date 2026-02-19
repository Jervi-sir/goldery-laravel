<?php

use App\Http\Controllers\MetalPriceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [MetalPriceController::class, 'dashboard'])->name('dashboard');
    Route::post('prices/fetch', [MetalPriceController::class, 'fetch'])->name('prices.fetch');

    // Subscription routes
    Route::get('subscription', [\App\Http\Controllers\SubscriptionController::class, 'index'])->name('subscription.index');
    Route::get('subscription/checkout', [\App\Http\Controllers\SubscriptionController::class, 'checkout'])->name('subscription.checkout');
    Route::post('subscription/checkout', [\App\Http\Controllers\SubscriptionController::class, 'store'])->name('subscription.store');
    Route::get('subscription/history', [\App\Http\Controllers\SubscriptionController::class, 'history'])->name('subscription.history');
});

require __DIR__ . '/settings.php';
