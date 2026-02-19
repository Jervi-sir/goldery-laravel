import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Gem, ShieldCheck, Zap } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Subscription',
        href: '/subscription',
    },
];

interface SubscriptionData {
    id: number;
    plan_name: string;
    status: string;
    starts_at: string;
    ends_at: string;
    cancelled_at: string | null;
}

interface SubscriptionProps {
    currentSubscription: SubscriptionData | null;
}

export default function Subscription({ currentSubscription }: SubscriptionProps) {
    const isProfessional = currentSubscription?.plan_name?.toLowerCase() === 'professional' || currentSubscription?.plan_name?.toLowerCase() === 'premium plan';
    const isFree = !currentSubscription;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subscription Plans" />

            <div className="flex flex-1 flex-col items-center justify-center p-4 md:p-8 max-w-7xl mx-auto w-full">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100 mb-4">
                        {currentSubscription ? 'Your Subscription' : 'Choose Your Plan'}
                    </h1>
                    <p className="text-neutral-500 text-lg max-w-2xl mx-auto">
                        {currentSubscription
                            ? `You are currently on the ${currentSubscription.plan_name} plan. Manage your subscription below.`
                            : 'Get exclusive access to real-time market data, parallel market currency rates, and our professional gold calculator.'}
                    </p>

                    {currentSubscription && (
                        <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-sm font-bold">
                            <ShieldCheck className="h-4 w-4" />
                            Active until {new Date(currentSubscription.ends_at).toLocaleDateString()}
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
                    {/* Free Plan */}
                    <Card className={`flex flex-col border-neutral-200 dark:border-neutral-800 ${isFree ? 'ring-2 ring-neutral-900 dark:ring-neutral-100' : ''}`}>
                        <CardHeader>
                            <CardTitle>Free</CardTitle>
                            <CardDescription>Basic access to spot prices</CardDescription>
                            <div className="mt-4 text-4xl font-bold">$0<span className="text-sm font-normal text-neutral-500">/mo</span></div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <ul className="space-y-4">
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    <span>Basic Gold Spot Price</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm text-neutral-400">
                                    <Check className="h-4 w-4" />
                                    <span>Real-time DZD Rates</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm text-neutral-400">
                                    <Check className="h-4 w-4" />
                                    <span>Professional Calculator</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full" disabled={isFree}>
                                {isFree ? 'Current Plan' : 'Standard Access'}
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Premium Plan */}
                    <Card className={`flex flex-col border-amber-500 shadow-xl shadow-amber-500/10 relative overflow-hidden ${isProfessional ? 'ring-4 ring-amber-500' : 'ring-2 ring-amber-500/30'}`}>
                        {isProfessional && (
                            <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                                Current Plan
                            </div>
                        )}
                        {!isProfessional && (
                            <div className="absolute top-0 right-0 bg-amber-500 text-white text-[10px] font-bold px-3 py-1 rounded-bl-lg uppercase tracking-wider">
                                Popular
                            </div>
                        )}
                        <CardHeader>
                            <div className="flex items-center gap-2 text-amber-500 mb-1">
                                <Zap className="h-4 w-4" fill="currentColor" />
                                <span className="text-xs font-bold uppercase tracking-widest">Most Practical</span>
                            </div>
                            <CardTitle>Professional</CardTitle>
                            <CardDescription>Full access for jewelry professionals</CardDescription>
                            <div className="mt-4 text-4xl font-extrabold">$19.99<span className="text-sm font-normal text-neutral-500">/mo</span></div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <ul className="space-y-4">
                                <li className="flex items-center gap-2 text-sm font-medium">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    <span>All Spot Prices (Gold, Silver, Copper)</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm font-medium">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    <span>Parallel Market DZD Rates</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm font-medium">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    <span>Advanced Sales Calculator</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm font-medium">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    <span>Multiple Karat Calculations</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button asChild className="w-full bg-amber-600 hover:bg-amber-700 text-white" disabled={isProfessional}>
                                {isProfessional ? (
                                    <span>Active Plan</span>
                                ) : (
                                    <Link href="/subscription/checkout?plan=professional">Upgrade Now</Link>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Enterprise Plan */}
                    <Card className="flex flex-col border-neutral-200 dark:border-neutral-800">
                        <CardHeader>
                            <CardTitle>Enterprise</CardTitle>
                            <CardDescription>Custom solutions for large shops</CardDescription>
                            <div className="mt-4 text-4xl font-bold">$99<span className="text-sm font-normal text-neutral-500">/mo</span></div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <ul className="space-y-4">
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    <span>Multi-user Access</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    <span>Inventory Integration</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    <span>Premium Support</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">Contact Sales</Button>
                        </CardFooter>
                    </Card>
                </div>

                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-neutral-500">
                    <div className="flex flex-col items-center text-center">
                        <ShieldCheck className="h-10 w-10 mb-4 text-neutral-400" />
                        <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">Secure Payments</h3>
                        <p className="text-sm italic text-neutral-500">"Verified transactions for your peace of mind."</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Gem className="h-10 w-10 mb-4 text-neutral-400" />
                        <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">Premium Support</h3>
                        <p className="text-sm italic text-neutral-500">"Expert assistance for all subscribers."</p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Check className="h-10 w-10 mb-4 text-neutral-400" />
                        <h3 className="font-bold text-neutral-900 dark:text-neutral-100 mb-2">Instant Activation</h3>
                        <p className="text-sm italic text-neutral-500">"Access all features immediately after checkout."</p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
