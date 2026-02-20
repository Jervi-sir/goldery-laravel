<?php

namespace App\Http\Controllers\Subscription;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Services\SubscriptionService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class WebhookController extends Controller
{
    public function __construct(protected SubscriptionService $subscriptionService) {}

    /**
     * Handle Chargily webhook.
     */
    public function handle(Request $request)
    {
        $payload = $request->getContent();
        $signature = $request->header('signature');
        $secret = config('services.chargily.secret', 'test_sk_wP99cXZB7kQY6yQhGyp95y0KuRhCMG0CLUrdfmD4');

        // Verify signature
        $computedSignature = hash_hmac('sha256', $payload, $secret);

        if (! hash_equals($computedSignature, $signature)) {
            Log::warning('Chargily Webhook Signature Verification Failed');

            return response()->json(['message' => 'Invalid signature'], 400);
        }

        $event = json_decode($payload, true);
        $type = $event['type'] ?? null;

        Log::info('Chargily Webhook Received', ['type' => $type, 'event' => $event]);

        if ($type === 'checkout.paid') {
            $data = $event['data'] ?? [];
            $metadata = $data['metadata'] ?? [];
            $userId = $metadata['user_id'] ?? null;
            $user = User::find($userId);

            if ($user && isset($data['status']) && $data['status'] === 'paid') {
                $this->subscriptionService->activateSubscription($user, $data);
            } else {
                Log::warning('Chargily Webhook Process Failed: User not found or status not paid', [
                    'user_found' => (bool) $user,
                    'status' => $data['status'] ?? 'unknown',
                    'data' => $data,
                ]);
            }
        }

        return response()->json(['message' => 'Webhook handled']);
    }
}
