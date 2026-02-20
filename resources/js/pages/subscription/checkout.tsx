import { Head, useForm } from '@inertiajs/react';
import { CreditCard, Lock, ShieldCheck } from 'lucide-react';
import { useEffect } from 'react';
import SubscriptionController from '@/actions/App/Http/Controllers/SubscriptionController';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
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
        title: 'Paiement',
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
        post(SubscriptionController.store().url);
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
            <Head title="Paiement sécurisé" />

            <div className="mx-auto flex w-full max-w-xl flex-1 items-center justify-center p-4 md:p-8">
                <Card className="w-full overflow-hidden border-none shadow-2xl ring-1 ring-neutral-200 dark:ring-neutral-800">
                    <div className="h-2 w-full bg-amber-500" />
                    <CardHeader className="bg-neutral-50/50 pb-8 dark:bg-neutral-900/50">
                        <div className="mb-4 flex items-center justify-between">
                            <div className="rounded-lg bg-amber-100 p-2 dark:bg-amber-900/30">
                                <CreditCard className="h-6 w-6 text-amber-600" />
                            </div>
                            <div className="flex items-center gap-1 text-xs font-bold tracking-widest text-neutral-400 uppercase">
                                <Lock className="h-3 w-3" />
                                Paiement sécurisé
                            </div>
                        </div>
                        <CardTitle className="text-2xl font-black tracking-tight text-neutral-900 uppercase dark:text-neutral-100">
                            Finaliser l'abonnement
                        </CardTitle>
                        <CardDescription>
                            Vérifiez les détails de votre forfait et confirmez votre paiement
                        </CardDescription>
                    </CardHeader>

                    <CardContent className="space-y-6 pt-8">
                        <div className="rounded-xl border border-neutral-100 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
                            <div className="mb-2 flex items-center justify-between">
                                <span className="text-sm font-medium text-neutral-500 uppercase">
                                    Forfait sélectionné
                                </span>
                                <span className="rounded bg-amber-100 px-2 py-1 text-[10px] font-bold tracking-wider text-amber-700 uppercase dark:bg-amber-900/30 dark:text-amber-400">
                                    Professionnel
                                </span>
                            </div>
                            <div className="flex items-end justify-between">
                                <span className="text-xl font-bold text-neutral-900 capitalize dark:text-neutral-100">
                                    Forfait {plan}
                                </span>
                                <div className="text-right">
                                    <div className="text-2xl font-black text-neutral-900 dark:text-neutral-100">
                                        $19.99
                                    </div>
                                    <div className="text-[10px] font-bold text-neutral-400 uppercase">
                                        Par mois
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                                    <ShieldCheck className="h-3 w-3 text-emerald-600" />
                                </div>
                                <span>Pas de frais cachés. Annulez à tout moment.</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
                                    <ShieldCheck className="h-3 w-3 text-emerald-600" />
                                </div>
                                <span>
                                    Accès instantané aux outils professionnels.
                                </span>
                            </div>
                        </div>

                        <div className="rounded-lg border border-dashed border-neutral-300 bg-neutral-100/50 p-4 text-center dark:border-neutral-700 dark:bg-neutral-800/30">
                            <p className="text-xs font-medium text-neutral-500">
                                Appuyez sur{' '}
                                <kbd className="rounded border border-neutral-300 bg-white px-1.5 py-0.5 font-mono shadow-sm dark:border-neutral-700 dark:bg-neutral-900">
                                    Entrée
                                </kbd>{' '}
                                pour confirmer l'abonnement
                            </p>
                        </div>
                    </CardContent>

                    <CardFooter className="pb-8">
                        <Button
                            onClick={() => submit()}
                            disabled={processing}
                            className="h-12 w-full rounded-xl bg-neutral-900 text-lg font-bold text-white transition-all hover:bg-black active:scale-95 dark:bg-amber-600 dark:hover:bg-amber-700"
                        >
                            {processing
                                ? 'Traitement en cours...'
                                : 'Activer l\'abonnement'}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout>
    );
}
