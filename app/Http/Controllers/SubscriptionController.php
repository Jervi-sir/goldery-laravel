<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use App\Models\Subscription;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;

class SubscriptionController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        $currentSubscription = $user->subscriptions()
            ->where('status', 'active')
            ->where('ends_at', '>', now())
            ->latest()
            ->first();

        return Inertia::render('subscription/index', [
            'currentSubscription' => $currentSubscription,
        ]);
    }

    public function checkout(Request $request): Response
    {
        $plan = $request->query('plan', 'premium');
        return Inertia::render('subscription/checkout', [
            'plan' => $plan,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $user = Auth::user();
        $planName = $request->input('plan', 'Premium Plan');

        // Create subscription
        $subscription = Subscription::create([
            'user_id' => $user->id,
            'plan_name' => $planName,
            'status' => 'active',
            'starts_at' => now(),
            'ends_at' => now()->addMonth(),
        ]);

        // Create payment
        Payment::create([
            'user_id' => $user->id,
            'subscription_id' => $subscription->id,
            'amount' => 19.99,
            'currency' => 'USD',
            'status' => 'succeeded',
            'payment_method' => 'card',
            'transaction_id' => 'fake_' . bin2hex(random_bytes(8)),
        ]);

        // Update user
        $user->update([
            'is_subscribed' => true,
        ]);

        return redirect()->route('dashboard')->with('success', 'Subscription successful!');
    }

    public function history(Request $request): Response
    {
        $user = Auth::user();
        $subscriptions = $user->subscriptions()->latest()->get();
        $payments = $user->payments()->latest()->get();

        return Inertia::render('subscription/history', [
            'subscriptions' => $subscriptions,
            'payments' => $payments,
        ]);
    }
}
