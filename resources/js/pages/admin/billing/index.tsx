import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { CreditCard, ChevronLeft, ChevronRight, Activity } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
    {
        title: 'All Billing History',
        href: '/admin/billing',
    },
];

interface Payment {
    id: number;
    amount: string; // From string/decimal casting
    currency: string;
    status: string;
    payment_method: string;
    transaction_id: string;
    created_at: string;
    user: {
        id: number;
        name: string;
        email: string;
    };
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface AdminBillingProps {
    payments: {
        data: Payment[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export default function AdminBilling({ payments }: AdminBillingProps) {
    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(new Date(dateString));
    };

    return (
        <AppLayout >
            <Head title="Admin - Global Billing" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto w-full">
                <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <CreditCard className="h-5 w-5 text-emerald-500" />
                            Global Billing History
                        </CardTitle>
                        <CardDescription>
                            All payment transactions recorded across the platform.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border border-zinc-100 dark:border-zinc-800">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-zinc-50 dark:bg-zinc-900/50">
                                        <TableHead className="w-[80px]">Tx ID</TableHead>
                                        <TableHead>User</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Method</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Date</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {payments.data.length > 0 ? (
                                        payments.data.map((payment) => (
                                            <TableRow key={payment.id}>
                                                <TableCell className="font-mono text-zinc-500 text-xs">
                                                    #{payment.transaction_id || payment.id}
                                                </TableCell>
                                                <TableCell>
                                                    <div className="font-bold text-zinc-900 dark:text-zinc-100">{payment.user.name}</div>
                                                    <div className="text-xs text-muted-foreground">{payment.user.email}</div>
                                                </TableCell>
                                                <TableCell className="font-mono font-medium">
                                                    {formatCurrency(parseFloat(payment.amount), payment.currency)}
                                                </TableCell>
                                                <TableCell className="text-zinc-500 capitalize">{payment.payment_method}</TableCell>
                                                <TableCell>
                                                    {payment.status === 'succeeded' || payment.status === 'paid' ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-emerald-100 text-emerald-800 text-xs font-medium dark:bg-emerald-900 dark:text-emerald-200">
                                                            <Activity className="h-3 w-3" /> Paid
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-medium dark:bg-amber-900 dark:text-amber-200">
                                                            {payment.status}
                                                        </span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right text-zinc-500 text-sm">
                                                    {formatDate(payment.created_at)}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={6} className="h-24 text-center">
                                                No payments have been recorded.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {payments.last_page > 1 && (
                            <div className="flex items-center justify-between mt-6">
                                <span className="text-sm text-zinc-500">
                                    Showing page {payments.current_page} of {payments.last_page} ({payments.total} total transactions)
                                </span>
                                <div className="flex gap-2 relative z-10">
                                    {payments.links.map((link, i) => {
                                        if (link.label.includes('Previous') || link.label.includes('Next')) {
                                            const isPrev = link.label.includes('Previous');
                                            return (
                                                <Button
                                                    key={i}
                                                    variant="outline"
                                                    size="icon"
                                                    asChild={!!link.url}
                                                    disabled={!link.url}
                                                    className={!link.url ? 'opacity-50 cursor-not-allowed' : ''}
                                                >
                                                    {link.url ? (
                                                        <Link href={link.url} preserveScroll>
                                                            {isPrev ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                                        </Link>
                                                    ) : (
                                                        <span>
                                                            {isPrev ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                                                        </span>
                                                    )}
                                                </Button>
                                            );
                                        }

                                        return (
                                            <Button
                                                key={i}
                                                variant={link.active ? "default" : "outline"}
                                                size="icon"
                                                asChild={!!link.url}
                                                disabled={!link.url}
                                                className={link.active ? "bg-amber-600 hover:bg-amber-700 text-white" : ""}
                                            >
                                                {link.url ? (
                                                    <Link href={link.url} preserveScroll>
                                                        <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                                    </Link>
                                                ) : (
                                                    <span dangerouslySetInnerHTML={{ __html: link.label }} />
                                                )}
                                            </Button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
