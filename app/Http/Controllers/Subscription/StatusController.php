<?php

namespace App\Http\Controllers\Subscription;

use App\Http\Controllers\Controller;
use App\Services\ChargilyService;
use App\Services\SubscriptionService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StatusController extends Controller
{
    public function __construct(
        protected ChargilyService $chargilyService,
        protected SubscriptionService $subscriptionService
    ) {}

    /**
     * Handle successful payment redirect.
     */
    public function success(Request $request): Response
    {
        $checkoutId = $request->query('checkout_id');
        $user = $request->user();

        if ($checkoutId && $user) {
            // Verify checkout status directly with Chargily as a fallback to the webhook
            $checkout = $this->chargilyService->getCheckout($checkoutId);

            if ($checkout && $checkout['status'] === 'paid') {
                $this->subscriptionService->activateSubscription($user, $checkout);
            }
        }

        return Inertia::render('subscription/status', [
            'status' => 'success',
            'message' => 'Thank you! Your payment has been processed successfully.',
        ]);
    }

    /**
     * Handle failed/cancelled payment redirect.
     */
    public function failure(Request $request): Response
    {
        return Inertia::render('subscription/status', [
            'status' => 'failure',
            'message' => 'Payment failed or was cancelled.',
        ]);
    }
}
