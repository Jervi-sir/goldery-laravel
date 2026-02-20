import { Head, Link } from '@inertiajs/react';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Abonnement',
        href: '/subscription',
    },
    {
        title: 'Statut',
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
            <Head title={isSuccess ? 'Paiement réussi' : 'Paiement échoué'} />

            <div className="mx-auto flex w-full max-w-xl flex-1 items-center justify-center p-4 md:p-8">
                <Card className="w-full overflow-hidden border-none shadow-2xl ring-1 ring-neutral-200 dark:ring-neutral-800">
                    <div
                        className={`h-2 ${isSuccess ? 'bg-emerald-500' : 'bg-destructive'} w-full`}
                    />
                    <CardHeader className="pt-10 pb-8 text-center">
                        <div className="mb-6 flex justify-center">
                            {isSuccess ? (
                                <div className="animate-in rounded-full bg-emerald-100 p-4 duration-500 zoom-in dark:bg-emerald-900/30">
                                    <CheckCircle2 className="h-12 w-12 text-emerald-600" />
                                </div>
                            ) : (
                                <div className="animate-in rounded-full bg-red-100 p-4 duration-500 zoom-in dark:bg-red-900/30">
                                    <XCircle className="h-12 w-12 text-red-600" />
                                </div>
                            )}
                        </div>
                        <CardTitle className="text-3xl font-black tracking-tight text-neutral-900 uppercase dark:text-neutral-100">
                            {isSuccess ? 'Paiement envoyé !' : 'Paiement échoué'}
                        </CardTitle>
                    </CardHeader>

                    <CardContent className="pb-10 text-center">
                        <p className="text-lg text-neutral-500 dark:text-neutral-400">
                            {message}
                        </p>
                        {isSuccess && (
                            <p className="mt-4 text-sm text-neutral-400">
                                Quelques minutes peuvent être nécessaires pour que votre compte
                                reflète les changements. Nous vous enverrons un e-mail une fois
                                l'activation terminée.
                            </p>
                        )}
                    </CardContent>

                    <CardFooter className="flex-col gap-4 pb-8 sm:flex-row">
                        <Button
                            asChild
                            variant={isSuccess ? 'outline' : 'default'}
                            className="w-full rounded-xl py-6 font-bold"
                        >
                            <Link href="/dashboard">Retour au tableau de bord</Link>
                        </Button>
                        {!isSuccess && (
                            <Button
                                asChild
                                className="w-full rounded-xl bg-amber-500 py-6 font-bold hover:bg-amber-600"
                            >
                                <Link href="/subscription/checkout">
                                    Réessayer{' '}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Link>
                            </Button>
                        )}
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
