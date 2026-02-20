import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Subscription',
        href: '/subscription',
    },
    {
        title: 'Status',
        href: '#',
    },
];

interface StatusProps {
    status: 'success' | 'failure';
    message: string;
}

export default function Status({ status, message }: StatusProps) {
    const isSuccess = status === 'success';

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isSuccess ? 'Payment Successful' : 'Payment Failed'} />

            <div className="flex flex-1 items-center justify-center p-4 md:p-8 max-w-xl mx-auto w-full">
                <Card className="w-full border-none shadow-2xl overflow-hidden ring-1 ring-neutral-200 dark:ring-neutral-800">
                    <div className={`h-2 ${isSuccess ? 'bg-emerald-500' : 'bg-destructive'} w-full`} />
                    <CardHeader className="text-center pb-8 pt-10">
                        <div className="flex justify-center mb-6">
                            {isSuccess ? (
                                <div className="p-4 bg-emerald-100 dark:bg-emerald-900/30 rounded-full animate-in zoom-in duration-500">
                                    <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                                </div>
                            ) : (
                                <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-full animate-in zoom-in duration-500">
                                    <XCircle className="h-12 w-12 text-red-600" />
                                </div>
                            )}
                        </div>
                        <CardTitle className="text-3xl font-black text-neutral-900 dark:text-neutral-100 uppercase tracking-tight">
                            {isSuccess ? 'Payment Sent!' : 'Payment Failed'}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="text-center pb-10">
                        <p className="text-neutral-500 dark:text-neutral-400 text-lg">
                            {message}
                        </p>
                        {isSuccess && (
                            <p className="mt-4 text-sm text-neutral-400">
                                It may take a few minutes for your account to reflect the changes. We'll email you once the activation is complete.
                            </p>
                        )}
                    </CardContent>

                    <CardFooter className="pb-8 gap-4 flex-col sm:flex-row">
                        <Button asChild variant={isSuccess ? 'outline' : 'default'} className="w-full py-6 rounded-xl font-bold">
                            <Link href="/dashboard">Return to Dashboard</Link>
                        </Button>
                        {!isSuccess && (
                            <Button asChild className="w-full py-6 rounded-xl font-bold bg-amber-500 hover:bg-amber-600">
                                <Link href="/subscription/checkout">Try Again <ArrowRight className="ml-2 h-4 w-4" /></Link>
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
