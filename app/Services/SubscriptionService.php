<?php

namespace App\Services;

use App\Models\Payment;
use App\Models\Subscription;
use App\Models\User;
use Illuminate\Support\Facades\Log;

class SubscriptionService
{
    /**
     * Activate a user's subscription based on checkout data.
     */
    public function activateSubscription(User $user, array $checkoutData): void
    {
        $transactionId = $checkoutData['id'] ?? null;

        if (! $transactionId) {
            Log::error('Subscription Activation Error: transaction_id missing');

            return;
        }

        // Check if this transaction has already been processed to avoid duplicates
        if (Payment::where('transaction_id', $transactionId)->exists()) {
            Log::info('Subscription already activated for transaction', ['transaction_id' => $transactionId]);

            return;
        }

        $metadata = $checkoutData['metadata'] ?? [];
        $planName = $metadata['plan_name'] ?? 'Professional';

        // Create the subscription record
        $subscription = Subscription::create([
            'user_id' => $user->id,
            'plan_name' => $planName,
            'status' => 'active',
            'starts_at' => now(),
            'ends_at' => now()->addMonth(),
        ]);

        // Record the payment
        Payment::create([
            'user_id' => $user->id,
            'subscription_id' => $subscription->id,
            'amount' => $checkoutData['amount'] ?? 0,
            'currency' => $checkoutData['currency'] ?? 'DZD',
            'status' => 'succeeded',
            'payment_method' => 'chargily',
            'transaction_id' => $transactionId,
        ]);

        // Upgrade user status
        $user->update([
            'is_subscribed' => true,
        ]);

        Log::info('Subscription Activated Successfully', [
            'user_id' => $user->id,
            'transaction_id' => $transactionId,
            'plan' => $planName,
        ]);
    }
}
