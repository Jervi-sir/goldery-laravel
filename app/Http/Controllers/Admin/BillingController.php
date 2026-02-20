<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BillingController extends Controller
{
    /**
     * Display a listing of all payments across the platform.
     */
    public function index(Request $request)
    {
        $payments = Payment::with('user')->latest()->paginate(20);

        return Inertia::render('admin/billing/index', [
            'payments' => $payments,
        ]);
    }
}
