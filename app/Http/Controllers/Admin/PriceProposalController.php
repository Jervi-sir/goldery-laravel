<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CurrencyRate;
use App\Models\MetalPrice;
use Illuminate\Http\Request;

class PriceProposalController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function storeMetal(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:gold,silver,copper',
            'price' => 'required|numeric|min:0',
            'currency' => 'required|string|max:10',
            'unit' => 'required|string|max:20',
        ]);

        MetalPrice::create($validated);

        return back()->with('success', 'Custom metal price stored successfully.');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function storeCurrency(Request $request)
    {
        $validated = $request->validate([
            'pair' => 'required|string|max:15',
            'rate' => 'required|numeric|min:0',
        ]);

        CurrencyRate::create($validated);

        return back()->with('success', 'Custom currency rate stored successfully.');
    }
}
