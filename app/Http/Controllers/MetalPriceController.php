<?php

namespace App\Http\Controllers;

use App\Services\MetalService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MetalPriceController extends Controller
{
    public function dashboard(Request $request, MetalService $service)
    {
        $user = $request->user();

        return Inertia::render('dashboard', [
            'data' => $service->getDashboardData(),
            'isSubscribed' => (bool) $user->is_subscribed,
        ]);
    }

    public function history(Request $request)
    {
        $type = $request->query('type');

        $query = \App\Models\MetalPrice::latest();

        if ($type && in_array($type, ['gold', 'silver', 'copper'])) {
            $query->where('type', $type);
        }

        $prices = $query->paginate(20)->withQueryString();

        return Inertia::render('metals/history', [
            'prices' => $prices,
            'filters' => [
                'type' => $type ?? 'all',
            ],
        ]);
    }
}
