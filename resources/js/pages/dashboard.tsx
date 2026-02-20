import { Head, useForm, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { dashboard } from '@/routes';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Calculator,
    TrendingUp,
    DollarSign,
    Euro,
    RefreshCw,
    Gem,
    ArrowUpRight,
    Clock,
    Lock,
    Coins
} from 'lucide-react';
import { useState } from 'react';
import SubscriptionController from '@/actions/App/Http/Controllers/SubscriptionController';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface DashboardProps {
    data: {
        spot: {
            gold: number;
            silver: number;
            copper: number;
            last_updated: string;
        };
        rates: {
            usd_dzd: number;
            eur_dzd: number;
        };
        gold_dzd: Record<string, {
            raw: number;
            local: number;
            italian: number;
        }>;
        silver_dzd: {
            gram: number;
        };
    };
    isSubscribed: boolean;
}

export default function Dashboard({ data, isSubscribed }: DashboardProps) {
    const [processing, setProcessing] = useState(false);
    const [weight, setWeight] = useState<string>('');
    const [karat, setKarat] = useState<string>('18k');
    const [origin, setOrigin] = useState<'local' | 'italian'>('local');

    const handleRefresh = () => {
        setProcessing(true);
        // Just reload the data from the database, the backend handles the hourly sync.
        router.reload({
            only: ['data'],
            onFinish: () => setProcessing(false)
        });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('fr-DZ', {
            style: 'currency',
            currency: 'DZD',
            maximumFractionDigits: 0
        }).format(amount);
    };

    const currentPricePerGram = data.gold_dzd[karat]?.[origin] || 0;
    const totalCalcPrice = weight ? parseFloat(weight) * currentPricePerGram : 0;

    if (!isSubscribed) {
        return (
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Subscription Required" />
                <div className="flex flex-1 items-center justify-center p-4">
                    <Card className="max-w-md w-full border-dashed border-2">
                        <CardHeader className="text-center">
                            <div className="mx-auto bg-amber-100 p-3 rounded-full w-fit mb-4">
                                <Lock className="h-8 w-8 text-amber-600" />
                            </div>
                            <CardTitle className="text-2xl">Premium Access Required</CardTitle>
                            <CardDescription>
                                Subscribe to Goldery to access real-time market prices, currency rates, and the professional calculator.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="flex justify-center pb-8">
                            <Button asChild className="bg-amber-600 hover:bg-amber-700 text-white px-8">
                                <Link href={SubscriptionController.checkout().url}>
                                    Upgrade to Subscribed
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Live Gold Tracker" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto w-full">

                {/* Top Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <Card className="bg-gradient-to-br from-amber-500 to-amber-600 text-white border-none shadow-lg">
                        <CardHeader className="pb-2">
                            <CardDescription className="text-amber-100 font-medium">Gold Spot Price</CardDescription>
                            <CardTitle className="text-3xl font-bold flex items-center justify-between">
                                ${data.spot.gold.toLocaleString()}
                                <Gem className="h-6 w-6 text-amber-200 opacity-50" />
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-amber-100/80 flex items-center gap-1">
                                <Clock className="h-3 w-3" /> Updated {data.spot.last_updated}
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <CardHeader className="pb-2 text-slate-500">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">USD / DZD</span>
                                <DollarSign className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data.rates.usd_dzd} DA</div>
                            <div className="text-xs text-emerald-500 flex items-center mt-1">
                                <ArrowUpRight className="h-3 w-3 mr-1" /> Parallel Market
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <CardHeader className="pb-2 text-slate-500">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">EUR / DZD</span>
                                <Euro className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{data.rates.eur_dzd} DA</div>
                            <div className="text-xs text-emerald-500 flex items-center mt-1">
                                <ArrowUpRight className="h-3 w-3 mr-1" /> Parallel Market
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 shadow-sm">
                        <CardHeader className="pb-2 text-slate-500">
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-medium">Silver Gram</span>
                                <Coins className="h-4 w-4" />
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{formatCurrency(data.silver_dzd.gram)}</div>
                            <div className="text-xs text-zinc-400 mt-1">
                                Spot Price: ${data.spot.silver}/oz
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                    {/* Calculator Section */}
                    <Card className="lg:col-span-12 border-zinc-200 dark:border-zinc-800 shadow-md overflow-hidden">
                        <div className="h-1 bg-gradient-to-r from-amber-400 to-amber-600 w-full" />
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle className="text-xl flex items-center gap-2">
                                    <Calculator className="h-5 w-5 text-amber-500" />
                                    Smart Sales Calculator
                                </CardTitle>
                                <CardDescription>Instant gold price calculations for clients</CardDescription>
                            </div>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={handleRefresh}
                                disabled={processing}
                                className="gap-2"
                            >
                                {processing ? <RefreshCw className="h-4 w-4 animate-spin" /> : <RefreshCw className="h-4 w-4" />}
                                Refresh Prices
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label>Metal Weight (Grams)</Label>
                                        <Input
                                            type="number"
                                            placeholder="0.00"
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                            className="h-12 text-lg font-bold"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label>Karat</Label>
                                            <select
                                                className="w-full h-10 px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm"
                                                value={karat}
                                                onChange={(e) => setKarat(e.target.value)}
                                            >
                                                <option value="18k">18 Karat</option>
                                                <option value="19k">19 Karat</option>
                                                <option value="21k">21 Karat</option>
                                                <option value="24k">24 Karat</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label>Quality</Label>
                                            <select
                                                className="w-full h-10 px-3 py-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent text-sm"
                                                value={origin}
                                                onChange={(e) => setOrigin(e.target.value as any)}
                                            >
                                                <option value="local">Local</option>
                                                <option value="italian">Italian (Import)</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>

                                <div className="md:col-span-2 flex flex-col items-center justify-center p-6 bg-zinc-50 dark:bg-zinc-800/20 rounded-xl border border-dashed border-zinc-200 dark:border-zinc-800">
                                    <span className="text-zinc-500 uppercase tracking-widest text-xs font-bold mb-2">Estimated Total Price</span>
                                    <div className="text-5xl font-black text-zinc-900 dark:text-white tracking-tighter">
                                        {formatCurrency(totalCalcPrice)}
                                    </div>
                                    <div className="mt-4 flex gap-4 text-sm text-zinc-400">
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-zinc-500">Rate:</span>
                                            {formatCurrency(currentPricePerGram)}/g
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <span className="font-bold text-zinc-500">Origin:</span>
                                            {origin === 'local' ? '🇩🇿 Local' : '🇮🇹 Italian'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Reference Table */}
                    <Card className="lg:col-span-12 border-zinc-200 dark:border-zinc-800">
                        <CardHeader className="pb-0">
                            <CardTitle className="text-lg flex items-center gap-2">
                                <TrendingUp className="h-5 w-5 text-zinc-500" />
                                Reference Prices (DZD per Gram)
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-zinc-100 dark:border-zinc-800">
                                            <th className="pb-4 font-bold text-zinc-500 text-sm">KARAT TYPE</th>
                                            <th className="pb-4 font-bold text-zinc-500 text-sm text-right">RAW VALUE</th>
                                            <th className="pb-4 font-bold text-emerald-600 text-sm text-right">LOCAL MARKET</th>
                                            <th className="pb-4 font-bold text-amber-600 text-sm text-right">ITALIAN GOLD</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-zinc-50 dark:divide-zinc-900">
                                        {Object.entries(data.gold_dzd).map(([k, values]) => (
                                            <tr key={k} className="group hover:bg-zinc-50 dark:hover:bg-zinc-800/30 transition-colors">
                                                <td className="py-4 font-black text-xl uppercase text-zinc-900 dark:text-zinc-100">{k}</td>
                                                <td className="py-4 text-right font-mono text-zinc-400 text-sm">{formatCurrency(values.raw)}</td>
                                                <td className="py-4 text-right font-bold text-emerald-700 dark:text-emerald-500 text-lg">{formatCurrency(values.local)}</td>
                                                <td className="py-4 text-right font-bold text-amber-900 dark:text-amber-500 text-lg">{formatCurrency(values.italian)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
