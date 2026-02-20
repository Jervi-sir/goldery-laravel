import { Head } from '@inertiajs/react';
import { Clock, CreditCard, LayoutGrid } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Abonnement',
        href: '/subscription',
    },
    {
        title: 'Historique',
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

export default function SubscriptionHistory({
    subscriptions,
    payments,
}: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const formatCurrency = (amount: number, currency: string) => {
        return new Intl.NumberFormat('fr-FR', {
            style: 'currency',
            currency: currency,
        }).format(amount);
    };

    const getStatusBadge = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
            case 'succeeded':
                return (
                    <Badge className="bg-emerald-500 hover:bg-emerald-600">
                        Actif
                    </Badge>
                );
            case 'cancelled':
            case 'failed':
                return <Badge variant="destructive">Annulé</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    return (
        <AppLayout>
            <Head title="Historique d'abonnement" />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-8 p-4 md:p-8">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-black tracking-tight text-neutral-900 uppercase dark:text-neutral-100">
                        Facturation et historique
                    </h1>
                    <p className="text-neutral-500">
                        Gérez vos abonnements et consultez votre historique de transactions.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Subscriptions Table */}
                    <Card className="border-neutral-200 shadow-sm dark:border-neutral-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                            <div className="space-y-1">
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <Clock className="h-5 w-5 text-amber-500" />
                                    Forfaits d'abonnement
                                </CardTitle>
                                <CardDescription>
                                    Vos forfaits d'abonnement actifs et passés
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead>Forfait</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead>Commencé</TableHead>
                                        <TableHead className="text-right">
                                            Finit le
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {subscriptions.length > 0 ? (
                                        subscriptions.map((sub) => (
                                            <TableRow
                                                key={sub.id}
                                                className="group transition-colors"
                                            >
                                                <TableCell className="py-4 font-bold">
                                                    {sub.plan_name}
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(sub.status)}
                                                </TableCell>
                                                <TableCell className="text-xs text-neutral-500">
                                                    {formatDate(sub.starts_at)}
                                                </TableCell>
                                                <TableCell className="text-right font-mono text-xs text-neutral-500">
                                                    {sub.ends_at
                                                        ? formatDate(
                                                            sub.ends_at,
                                                        )
                                                        : 'Jamais'}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="h-24 text-center text-neutral-400 italic"
                                            >
                                                Aucun historique d'abonnement trouvé.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>

                    {/* Payments Table */}
                    <Card className="border-neutral-200 shadow-sm dark:border-neutral-800">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                            <div className="space-y-1">
                                <CardTitle className="flex items-center gap-2 text-xl">
                                    <CreditCard className="h-5 w-5 text-neutral-500" />
                                    Historique des paiements
                                </CardTitle>
                                <CardDescription>
                                    Transactions et factures récentes
                                </CardDescription>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-transparent">
                                        <TableHead>Date</TableHead>
                                        <TableHead>Méthode</TableHead>
                                        <TableHead>Statut</TableHead>
                                        <TableHead className="text-right">
                                            Montant
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {payments.length > 0 ? (
                                        payments.map((payment) => (
                                            <TableRow
                                                key={payment.id}
                                                className="group transition-colors"
                                            >
                                                <TableCell className="py-4 text-xs text-neutral-500">
                                                    {formatDate(
                                                        payment.created_at,
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-xs font-medium capitalize">
                                                    {payment.payment_method}
                                                </TableCell>
                                                <TableCell>
                                                    {getStatusBadge(
                                                        payment.status,
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right font-black">
                                                    {formatCurrency(
                                                        payment.amount,
                                                        payment.currency,
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell
                                                colSpan={4}
                                                className="h-24 text-center text-neutral-400 italic"
                                            >
                                                Aucun historique de paiement trouvé.
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
