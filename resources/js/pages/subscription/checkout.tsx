import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, Lock, ShieldCheck } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';
import { useEffect } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Subscription',
        href: '/subscription',
    },
    {
        title: 'Checkout',
        href: '/subscription/checkout',
    },
];

interface CheckoutProps {
    plan: string;
}

export default function Checkout({ plan }: CheckoutProps) {
    const { post, processing } = useForm({
        plan: plan,
    });

    const submit = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        post('/subscription/checkout');
    };

    // Listen for Enter key
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'Enter' && !processing) {
                submit();
            }
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [processing]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Secure Checkout" />

            <div className="flex flex-1 items-center justify-center p-4 md:p-8 max-w-xl mx-auto w-full">
                <Card className="w-full border-none shadow-2xl overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800">
                    <div className="h-2 bg-amber-500 w-full" />
                    <CardHeader className="bg-neutral-50/50 dark:bg-neutral-900/50 pb-8">
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                                <CreditCard className="h-6 w-6 text-amber-600" />
                            </div>
                            <div className="flex items-center gap-1 text-xs font-bold text-neutral-400 uppercase tracking-widest">
                                <Lock className="h-3 w-3" />
                                Secure Checkout
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">Complete Subscription</CardTitle>
                        <CardDescription>Review your plan details and confirm your payment</CardDescription>
                    </CardHeader>

                    <CardContent className="pt-8 space-y-6">
                        <div className="bg-neutral-50 dark:bg-neutral-900 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-sm font-medium text-neutral-500 uppercase">Selected Plan</span>
                                <span className="px-2 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 text-[10px] font-bold rounded uppercase tracking-wider">Professional</span>
                            </div>
                            <div className="flex justify-between items-end">
                                <span className="text-xl font-bold text-neutral-900 dark:text-neutral-100 capitalize">{plan} Plan</span>
                                <div className="text-right">
                                    <div className="text-2xl font-black text-neutral-900 dark:text-neutral-100">$19.99</div>
                                    <div className="text-[10px] text-neutral-400 font-bold uppercase">Per Month</div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                                <div className="h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                    <ShieldCheck className="h-3 w-3 text-emerald-600" />
                                </div>
                                <span>No hidden fees. Cancel anytime.</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                                <div className="h-5 w-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                    <ShieldCheck className="h-3 w-3 text-emerald-600" />
                                </div>
                                <span>Instant access to professional tools.</span>
                            </div>
                        </div>

                        <div className="text-center p-4 bg-neutral-100/50 dark:bg-neutral-800/30 rounded-lg border border-dashed border-neutral-300 dark:border-neutral-700">
                            <p className="text-xs text-neutral-500 font-medium">
                                Press <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 font-mono shadow-sm">Enter</kbd> to confirm subscription
                            </p>
                        </div>
                    </CardContent>

                    <CardFooter className="pb-8">
                        <Button
                            onClick={() => submit()}
                            disabled={processing}
                            className="w-full h-12 bg-neutral-900 hover:bg-black text-white dark:bg-amber-600 dark:hover:bg-amber-700 font-bold text-lg rounded-xl transition-all active:scale-95"
                        >
                            {processing ? 'Processing...' : 'Activate Subscription'}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
