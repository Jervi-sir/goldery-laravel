import { Head, useForm, Link } from '@inertiajs/react';
import { Users, CreditCard, Activity, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardDescription,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
];

interface AdminDashboardProps {
    stats: {
        total_users: number;
        subscribed_users: number;
        total_revenue: number;
        active_subscriptions: number;
    };
    latestPrices: {
        gold: number;
        silver: number;
        copper: number;
    };
    latestRates: {
        usd_dzd: number;
        eur_dzd: number;
    };
}

export default function AdminDashboard({
    stats,
    latestPrices,
    latestRates,
}: AdminDashboardProps) {
    const formatCurrency = (amount: number, currency: string = 'DZD') => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

    const metalForm = useForm({
        type: 'gold',
        price: '',
        currency: 'USD',
        unit: 'ounce',
    });

    const currencyForm = useForm({
        pair: 'USD/DZD',
        rate: '',
    });

    const submitMetal = (e: React.FormEvent) => {
        e.preventDefault();
        metalForm.post('/admin/prices/metal', {
            preserveScroll: true,
            onSuccess: () => metalForm.reset('price'),
        });
    };

    const submitCurrency = (e: React.FormEvent) => {
        e.preventDefault();
        currencyForm.post('/admin/prices/currency', {
            preserveScroll: true,
            onSuccess: () => currencyForm.reset('rate'),
        });
    };

    return (
        <AppLayout>
            <Head title="Admin Dashboard" />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 md:p-8">
                {/* Stats Section */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Users
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.total_users}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Subscribed Users
                            </CardTitle>
                            <CreditCard className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.subscribed_users}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Active Subscriptions
                            </CardTitle>
                            <Activity className="h-4 w-4 text-emerald-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {stats.active_subscriptions}
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Total Revenue
                            </CardTitle>
                            <DollarSign className="h-4 w-4 text-amber-500" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">
                                {formatCurrency(stats.total_revenue)}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {/* Manual Metal Price Setup */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Propose Metal Price</CardTitle>
                            <CardDescription>
                                Manually update the spot price in the system.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submitMetal} className="space-y-4">
                                <div className="space-y-2">
                                    <Label>Metal Type</Label>
                                    <Select
                                        value={metalForm.data.type}
                                        onValueChange={(val) =>
                                            metalForm.setData('type', val)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="gold">
                                                Gold
                                            </SelectItem>
                                            <SelectItem value="silver">
                                                Silver
                                            </SelectItem>
                                            <SelectItem value="copper">
                                                Copper
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Price</Label>
                                        <span className="text-xs text-muted-foreground">
                                            Current: $
                                            {latestPrices[
                                                metalForm.data
                                                    .type as keyof typeof latestPrices
                                            ] || 0}
                                        </span>
                                    </div>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        placeholder="Enter new price..."
                                        value={metalForm.data.price}
                                        onChange={(e) =>
                                            metalForm.setData(
                                                'price',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                    {metalForm.errors.price && (
                                        <div className="text-sm text-red-500">
                                            {metalForm.errors.price}
                                        </div>
                                    )}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label>Currency</Label>
                                        <Input
                                            type="text"
                                            value={metalForm.data.currency}
                                            onChange={(e) =>
                                                metalForm.setData(
                                                    'currency',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Unit</Label>
                                        <Input
                                            type="text"
                                            value={metalForm.data.unit}
                                            onChange={(e) =>
                                                metalForm.setData(
                                                    'unit',
                                                    e.target.value,
                                                )
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                                <Button
                                    type="submit"
                                    disabled={metalForm.processing}
                                    className="w-full"
                                >
                                    Update Metal Price
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Manual Currency Setup */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Propose Currency Rate</CardTitle>
                            <CardDescription>
                                Manually update currency exchange rates for
                                local conversions.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form
                                onSubmit={submitCurrency}
                                className="space-y-4"
                            >
                                <div className="space-y-2">
                                    <Label>Currency Pair</Label>
                                    <Select
                                        value={currencyForm.data.pair}
                                        onValueChange={(val) =>
                                            currencyForm.setData('pair', val)
                                        }
                                    >
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="USD/DZD">
                                                USD / DZD
                                            </SelectItem>
                                            <SelectItem value="EUR/DZD">
                                                EUR / DZD
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <Label>Exchange Rate</Label>
                                        <span className="text-xs text-muted-foreground">
                                            Current:{' '}
                                            {currencyForm.data.pair ===
                                            'USD/DZD'
                                                ? latestRates.usd_dzd
                                                : latestRates.eur_dzd}{' '}
                                            DA
                                        </span>
                                    </div>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        placeholder="Enter new rate..."
                                        value={currencyForm.data.rate}
                                        onChange={(e) =>
                                            currencyForm.setData(
                                                'rate',
                                                e.target.value,
                                            )
                                        }
                                        required
                                    />
                                    {currencyForm.errors.rate && (
                                        <div className="text-sm text-red-500">
                                            {currencyForm.errors.rate}
                                        </div>
                                    )}
                                </div>
                                <Button
                                    type="submit"
                                    disabled={currencyForm.processing}
                                    className="w-full"
                                >
                                    Update Exchange Rate
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
