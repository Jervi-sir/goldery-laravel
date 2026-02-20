<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CurrencyRate;
use App\Models\MetalPrice;
use App\Models\Payment;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $stats = [
            'total_users' => User::count(),
            'subscribed_users' => User::where('is_subscribed', true)->count(),
            'total_revenue' => Payment::where('status', 'succeeded')
                ->orWhere('status', 'paid')
                ->sum('amount'),
            'active_subscriptions' => Subscription::where('status', 'active')->count(),
        ];

        $latestPrices = [
            'gold' => MetalPrice::where('type', 'gold')->latest()->first()?->price ?? 0,
            'silver' => MetalPrice::where('type', 'silver')->latest()->first()?->price ?? 0,
            'copper' => MetalPrice::where('type', 'copper')->latest()->first()?->price ?? 0,
        ];

        $latestRates = [
            'usd_dzd' => CurrencyRate::where('pair', 'USD/DZD')->latest()->first()?->rate ?? 0,
            'eur_dzd' => CurrencyRate::where('pair', 'EUR/DZD')->latest()->first()?->rate ?? 0,
        ];

        return Inertia::render('admin/dashboard', [
            'stats' => $stats,
            'latestPrices' => $latestPrices,
            'latestRates' => $latestRates,
        ]);
    }
}
