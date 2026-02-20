<?php

namespace App\Jobs;

use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;

class CheckExpiredSubscriptions implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $expiredSubscriptions = \App\Models\Subscription::with('user')
            ->where('status', 'active')
            ->where('ends_at', '<', now())
            ->get();

        foreach ($expiredSubscriptions as $subscription) {
            $subscription->update(['status' => 'expired']);

            $user = $subscription->user;
            if ($user && ! $user->subscriptions()->where('status', 'active')->where('ends_at', '>', now())->exists()) {
                $user->update(['is_subscribed' => false]);
            }
        }

        \Illuminate\Support\Facades\Log::info('Checked and updated expired subscriptions.', [
            'count' => $expiredSubscriptions->count(),
        ]);
    }
}
