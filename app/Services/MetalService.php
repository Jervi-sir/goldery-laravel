<?php

namespace App\Services;

use App\Models\CurrencyRate;
use App\Models\MetalPrice;

class MetalService
{
    /**
     * Get data for the dashboard.
     */
    public function getDashboardData(): array
    {
        $goldPrice = MetalPrice::where('type', 'gold')->latest()->first();
        $silverPrice = MetalPrice::where('type', 'silver')->latest()->first();
        $copperPrice = MetalPrice::where('type', 'copper')->latest()->first();

        $usdDzd = CurrencyRate::where('pair', 'USD/DZD')->latest()->first();
        $eurDzd = CurrencyRate::where('pair', 'EUR/DZD')->latest()->first();

        $goldVal = $goldPrice ? (float) $goldPrice->price : 2030.50;
        $silverVal = $silverPrice ? (float) $silverPrice->price : 23.00;
        $copperVal = $copperPrice ? (float) $copperPrice->price : 3.80;
        $usdRate = $usdDzd ? (float) $usdDzd->rate : 220.00; // Parallel market rate usually
        $eurRate = $eurDzd ? (float) $eurDzd->rate : 242.00;

        // Constants from inspiration
        $TROY_OZ_TO_GRAMS = 31.1035;

        // Calculation: (Spot / 31.1035) * USD_TO_DZD
        $pricePerGram24k = ($goldVal / $TROY_OZ_TO_GRAMS) * $usdRate;

        // Karat multiplier function
        $getKaratPrice = fn($k) => ($pricePerGram24k * $k) / 24;

        // Making charges (Labor) defaults
        $charges = [
            'local' => ['18k' => 200, '21k' => 300, '24k' => 0],
            'italian' => ['18k' => 800, '21k' => 900, '24k' => 1000],
        ];

        return [
            'spot' => [
                'gold' => $goldVal,
                'silver' => $silverVal,
                'copper' => $copperVal,
                'last_updated' => $goldPrice?->created_at?->diffForHumans() ?? 'No data',
            ],
            'rates' => [
                'usd_dzd' => $usdRate,
                'eur_dzd' => $eurRate,
            ],
            'gold_dzd' => [
                '24k' => [
                    'raw' => round($getKaratPrice(24), 2),
                    'local' => round($getKaratPrice(24) + $charges['local']['24k'], 2),
                    'italian' => round($getKaratPrice(24) + $charges['italian']['24k'], 2),
                ],
                '21k' => [
                    'raw' => round($getKaratPrice(21), 2),
                    'local' => round($getKaratPrice(21) + $charges['local']['21k'], 2),
                    'italian' => round($getKaratPrice(21) + $charges['italian']['21k'], 2),
                ],
                '19k' => [ // Added 19k as requested
                    'raw' => round($getKaratPrice(19), 2),
                    'local' => round($getKaratPrice(19) + 250, 2), // Estimated charge
                    'italian' => round($getKaratPrice(19) + 850, 2),
                ],
                '18k' => [
                    'raw' => round($getKaratPrice(18), 2),
                    'local' => round($getKaratPrice(18) + $charges['local']['18k'], 2),
                    'italian' => round($getKaratPrice(18) + $charges['italian']['18k'], 2),
                ],
            ],
            'silver_dzd' => [
                'gram' => round(($silverVal / $TROY_OZ_TO_GRAMS) * $usdRate, 2),
            ]
        ];
    }

    /**
     * Fetch external prices and update DB.
     * Uses gold-api.com as inspired.
     */
    public function updatePrices(): void
    {
        $metals = ['XAU' => 'gold', 'XAG' => 'silver', 'XCU' => 'copper'];

        foreach ($metals as $symbol => $type) {
            try {
                $response = \Illuminate\Support\Facades\Http::get("https://api.gold-api.com/price/{$symbol}");
                if ($response->successful()) {
                    $data = $response->json();
                    MetalPrice::create([
                        'type' => $type,
                        'price' => $data['price'],
                        'currency' => 'USD',
                        'unit' => 'ounce'
                    ]);
                }
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error("Failed to fetch {$type} price: " . $e->getMessage());
            }
        }

        // Parallel rates (Mocking updates for now as these often require different APIs or scraping)
        CurrencyRate::updateOrCreate(['pair' => 'USD/DZD'], ['rate' => 220.00 + (rand(-100, 100) / 100)]);
        CurrencyRate::updateOrCreate(['pair' => 'EUR/DZD'], ['rate' => 242.00 + (rand(-100, 100) / 100)]);
    }
}
