import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { dashboard } from '@/routes';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Metal Prices History',
        href: '/metals/history',
    },
];

interface MetalPrice {
    id: number;
    type: string;
    price: number;
    currency: string;
    unit: string;
    created_at: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface HistoryProps {
    prices: {
        data: MetalPrice[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
        total: number;
    };
    filters: {
        type: string;
    };
}

export default function History({ prices, filters }: HistoryProps) {
    const handleTypeChange = (value: string) => {
        router.get('/metals/history', { type: value !== 'all' ? value : undefined }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

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
        <AppLayout>
            <Head title="Metal Prices History" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto w-full">
                <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <CardHeader className="flex flex-row items-center justify-between pb-4">
                        <div className="space-y-1.5">
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Clock className="h-5 w-5 text-amber-500" />
                                Metal Prices History
                            </CardTitle>
                            <CardDescription>
                                Historical log of scraped metal prices from the database.
                            </CardDescription>
                        </div>
                        <div className="w-[180px]">
                            <Select value={filters?.type || 'all'} onValueChange={handleTypeChange}>
                                <SelectTrigger>
                                    <SelectValue placeholder="All Metals" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Metals</SelectItem>
                                    <SelectItem value="gold">Gold</SelectItem>
                                    <SelectItem value="silver">Silver</SelectItem>
                                    <SelectItem value="copper">Copper</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border border-zinc-100 dark:border-zinc-800">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-zinc-50 dark:bg-zinc-900/50">
                                        <TableHead className="w-[100px]">ID</TableHead>
                                        <TableHead>Metal Type</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Unit</TableHead>
                                        <TableHead className="text-right">Recorded At</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {prices.data.length > 0 ? (
                                        prices.data.map((price) => (
                                            <TableRow key={price.id}>
                                                <TableCell className="font-medium text-zinc-500">#{price.id}</TableCell>
                                                <TableCell className="capitalize font-bold text-zinc-900 dark:text-zinc-100">
                                                    {price.type}
                                                </TableCell>
                                                <TableCell className="font-mono">
                                                    {formatCurrency(price.price, price.currency)}
                                                </TableCell>
                                                <TableCell className="text-zinc-500 capitalize">{price.unit}</TableCell>
                                                <TableCell className="text-right text-zinc-500">
                                                    {formatDate(price.created_at)}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-24 text-center">
                                                No price history found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {prices.last_page > 1 && (
                            <div className="flex items-center justify-between mt-6">
                                <span className="text-sm text-zinc-500">
                                    Showing page {prices.current_page} of {prices.last_page} ({prices.total} total records)
                                </span>
                                <div className="flex gap-2 relative z-10">
                                    {prices.links.map((link, i) => {
                                        // Skip Next/Prev string labels for a cleaner look
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
