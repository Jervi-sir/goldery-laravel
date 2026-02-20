<?php

use App\Http\Controllers\AuthenticationController;
use App\Http\Controllers\MetalPriceController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware('guest')->group(function () {
    Route::get('login', [AuthenticationController::class, 'login'])->name('login');
    Route::post('login', [AuthenticationController::class, 'authenticate'])->name('login.store');

    Route::get('register', [AuthenticationController::class, 'register'])->name('register');
    Route::post('register', [AuthenticationController::class, 'storeRegister'])->name('register.store');
});

Route::middleware('auth')->group(function () {
    Route::post('logout', [AuthenticationController::class, 'logout'])->name('logout');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [MetalPriceController::class, 'dashboard'])->name('dashboard');
    Route::get('metals/history', [MetalPriceController::class, 'history'])->name('metals.history');

    // Subscription routes
    Route::get('subscription', [\App\Http\Controllers\SubscriptionController::class, 'index'])->name('subscription.index');
    Route::get('subscription/checkout', [\App\Http\Controllers\SubscriptionController::class, 'checkout'])->name('subscription.checkout');
    Route::post('subscription/checkout', [\App\Http\Controllers\SubscriptionController::class, 'store'])->name('subscription.store');
    Route::get('subscription/history', [\App\Http\Controllers\SubscriptionController::class, 'history'])->name('subscription.history');
    Route::get('subscription/success', [\App\Http\Controllers\Subscription\StatusController::class, 'success'])->name('subscription.success');
    Route::get('subscription/failure', [\App\Http\Controllers\Subscription\StatusController::class, 'failure'])->name('subscription.failure');
});

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', \App\Http\Controllers\Admin\AdminDashboardController::class)->name('dashboard');
    Route::get('users', [\App\Http\Controllers\Admin\UserController::class, 'index'])->name('users.index');
    Route::put('users/{user}', [\App\Http\Controllers\Admin\UserController::class, 'update'])->name('users.update');
    Route::get('billing', [\App\Http\Controllers\Admin\BillingController::class, 'index'])->name('billing.index');
    Route::post('prices/metal', [\App\Http\Controllers\Admin\PriceProposalController::class, 'storeMetal'])->name('prices.metal.store');
    Route::post('prices/currency', [\App\Http\Controllers\Admin\PriceProposalController::class, 'storeCurrency'])->name('prices.currency.store');
});

Route::post('chargily/webhook', [\App\Http\Controllers\Subscription\WebhookController::class, 'handle'])->name('chargily.webhook');

require __DIR__.'/settings.php';
