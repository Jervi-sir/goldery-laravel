<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChargilyService
{
    protected string $baseUrl;

    protected string $secretKey;

    public function __construct()
    {
        // For /checkouts API, you MUST use the Secret Key (starts with test_sk_)
        $this->baseUrl = config('services.chargily.url', 'https://pay.chargily.net/test/api/v2');
        $this->secretKey = 'test_sk_wP99cXZB7kQY6yQhGyp95y0KuRhCMG0CLUrdfmD4';
    }

    /**
     * Create a checkout for a subscription plan.
     */
    public function createPaymentLink(string $name, $price, array $metadata = []): ?array
    {
        try {
            $amount = (float) $price;

            $response = Http::withHeaders([
                'Authorization' => 'Bearer '.$this->secretKey,
                'Content-Type' => 'application/json',
            ])->post($this->baseUrl.'/checkouts', [
                'amount' => $amount, // Chargily v2 uses the actual value, not cents.
                'currency' => 'dzd',
                'success_url' => url('/subscription/success'),
                'failure_url' => url('/subscription/failure'),
                // 'webhook_url' => url('/chargily/webhook'),
                'description' => $name,
                'metadata' => (array) $metadata,
            ]);

            if ($response->successful()) {
                $data = $response->json();

                return [
                    'url' => $data['checkout_url'] ?? null,
                    'id' => $data['id'] ?? null,
                ];
            }

            Log::error('Chargily Checkout Creation Failed', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);

            return null;
        } catch (\Exception $e) {
            Log::error('Chargily Service Error', [
                'message' => $e->getMessage(),
            ]);

            return null;
        }
    }

    /**
     * Fetch checkout details by ID.
     */
    public function getCheckout(string $checkoutId): ?array
    {
        try {
            $response = Http::withHeaders([
                'Authorization' => 'Bearer '.$this->secretKey,
                'Content-Type' => 'application/json',
            ])->get($this->baseUrl.'/checkouts/'.$checkoutId);

            if ($response->successful()) {
                return $response->json();
            }

            return null;
        } catch (\Exception $e) {
            Log::error('Chargily Get Checkout Error', ['message' => $e->getMessage()]);

            return null;
        }
    }
}
