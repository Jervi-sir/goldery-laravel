<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

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

    public function store(Request $request, \App\Services\ChargilyService $chargilyService): \Symfony\Component\HttpFoundation\Response
    {
        $user = Auth::user();
        $plan = $request->input('plan', 'professional');
        $planName = ucfirst($plan);
        $price = 1000; // $plan === 'enterprise' ? '99.00' : '19.99';

        $paymentLink = $chargilyService->createPaymentLink(
            "Goldery {$planName} Subscription",
            $price,
            [
                'user_id' => $user->id,
                'plan_name' => $planName,
            ]
        );

        if (! $paymentLink || ! isset($paymentLink['url'])) {
            return back()->withErrors(['message' => 'Failed to initiate payment. Please try again later.']);
        }

        return Inertia::location($paymentLink['url']);
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
