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
            'isSubscribed' => (bool) $user->is_subscribed
        ]);
    }

    public function fetch(MetalService $service)
    {
        $service->updatePrices();
        return back()->with('success', 'Prices updated manually.');
    }
}
