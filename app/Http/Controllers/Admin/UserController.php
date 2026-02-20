<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $users = User::with('role')->latest()->paginate(20);

        return Inertia::render('admin/users/index', [
            'users' => $users,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'is_subscribed' => 'required|boolean',
        ]);

        $user->update([
            'is_subscribed' => $validated['is_subscribed'],
        ]);

        return back()->with('success', 'User subscription status updated.');
    }
}
