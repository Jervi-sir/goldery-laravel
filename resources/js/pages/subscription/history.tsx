import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Clock, CreditCard, LayoutGrid } from 'lucide-react';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Subscription',
        href: '/subscription',
    },
    {
        title: 'History',
        href: '/subscription/history',
    },
];

interface Subscription {
    id: number;
    plan_name: string;
    status: string;
    starts_at: string;
    ends_at: string;
    created_at: string;
}

interface Payment {
    id: number;
    amount: number;
    currency: string;
    status: string;
    payment_method: string;
    transaction_id: string;
    created_at: string;
}

interface Props {
    subscriptions: Subscription[];
    payments: Payment[];
}

export default function SubscriptionHistory({ subscriptions, payments }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
            case 'succeeded':
                return <Badge className="bg-emerald-500 hover:bg-emerald-600">Active</Badge>;
            case 'cancelled':
            case 'failed':
                return <Badge variant="destructive">Cancelled</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Subscription History" />

            <div className="flex flex-1 flex-col gap-8 p-4 md:p-8 max-w-7xl mx-auto w-full">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-black tracking-tight text-neutral-900 dark:text-neutral-100 uppercase">
                        Billing & History
                    </h1>
                    <p className="text-neutral-500">
                        Manage your subscriptions and view your transaction history.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Subscriptions Table */}
                    <Card className="border-neutral-200 dark:border-neutral-800 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                            <div className="space-y-1">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-amber-500" />
                                    Subscription Plans
                                </CardTitle>
                                <CardDescription>Your active and past subscription plans</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead>Plan</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Started</TableHead>
                                        <TableHead className="text-right">Ends At</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {subscriptions.length > 0 ? (
                                        subscriptions.map((sub) => (
                                            <TableRow key={sub.id} className="group transition-colors">
                                                <TableCell className="font-bold py-4">{sub.plan_name}</TableCell>
                                                <TableCell>{getStatusBadge(sub.status)}</TableCell>
                                                <TableCell className="text-neutral-500 text-xs">{formatDate(sub.starts_at)}</TableCell>
                                                <TableCell className="text-right text-neutral-500 text-xs font-mono">
                                                    {sub.ends_at ? formatDate(sub.ends_at) : 'Never'}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-24 text-center text-neutral-400 italic">
                                                No subscription history found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Payments Table */}
                    <Card className="border-neutral-200 dark:border-neutral-800 shadow-sm">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                            <div className="space-y-1">
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <CreditCard className="h-5 w-5 text-neutral-500" />
                                    Payment History
                                </CardTitle>
                                <CardDescription>Recent transactions and invoices</CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead>Date</TableHead>
                                        <TableHead>Method</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Amount</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {payments.length > 0 ? (
                                        payments.map((payment) => (
                                            <TableRow key={payment.id} className="group transition-colors">
                                                <TableCell className="text-neutral-500 text-xs py-4">{formatDate(payment.created_at)}</TableCell>
                                                <TableCell className="capitalize text-xs font-medium">{payment.payment_method}</TableCell>
                                                <TableCell>{getStatusBadge(payment.status)}</TableCell>
                                                <TableCell className="text-right font-black">
                                                    {formatCurrency(payment.amount, payment.currency)}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4} className="h-24 text-center text-neutral-400 italic">
                                                No payment history found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
