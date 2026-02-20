import { Head, Link } from '@inertiajs/react';
import { Check, Gem, ShieldCheck, Zap } from 'lucide-react';
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
];

interface SubscriptionData {
    id: number;
    plan_name: string;
    status: string;
    starts_at: string;
    ends_at: string;
    cancelled_at: string | null;
}

interface SubscriptionProps {
    currentSubscription: SubscriptionData | null;
}

export default function Subscription({
    currentSubscription,
}: SubscriptionProps) {
    const isProfessional =
        currentSubscription?.plan_name?.toLowerCase() === 'professional' ||
        currentSubscription?.plan_name?.toLowerCase() === 'premium plan';
    const isFree = !currentSubscription;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Forfaits d'abonnement" />

            <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center p-4 md:p-8">
                <div className="mb-12 text-center">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
                        {currentSubscription
                            ? 'Votre abonnement'
                            : 'Choisissez votre forfait'}
                    </h1>
                    <p className="mx-auto max-w-2xl text-lg text-neutral-500">
                        {currentSubscription
                            ? `Vous êtes actuellement sur le forfait ${currentSubscription.plan_name}. Gérez votre abonnement ci-dessous.`
                            : 'Bénéficiez d\'un accès exclusif aux données du marché en temps réel, aux taux de change du marché parallèle et à notre calculateur d\'or professionnel.'}
                    </p>

                    {currentSubscription && (
                        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-100 px-4 py-2 text-sm font-bold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400">
                            <ShieldCheck className="h-4 w-4" />
                            Actif jusqu'au{' '}
                            {new Date(
                                currentSubscription.ends_at,
                            ).toLocaleDateString()}
                        </div>
                    )}
                </div>

                <div className="grid w-full max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {/* Free Plan */}
                    <Card
                        className={`flex flex-col border-neutral-200 dark:border-neutral-800 ${isFree ? 'ring-2 ring-neutral-900 dark:ring-neutral-100' : ''}`}
                    >
                        <CardHeader>
                            <CardTitle>Gratuit</CardTitle>
                            <CardDescription>
                                Accès de base aux cours au comptant
                            </CardDescription>
                            <div className="mt-4 text-4xl font-bold">
                                $0
                                <span className="text-sm font-normal text-neutral-500">
                                    /mois
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <ul className="space-y-4">
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    <span>Cours de l'or de base</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm text-neutral-400">
                                    <Check className="h-4 w-4" />
                                    <span>Taux DZD en temps réel</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm text-neutral-400">
                                    <Check className="h-4 w-4" />
                                    <span>Calculateur professionnel</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                variant="outline"
                                className="w-full"
                                disabled={isFree}
                            >
                                {isFree ? 'Forfait actuel' : 'Accès standard'}
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Premium Plan */}
                    <Card
                        className={`relative flex flex-col overflow-hidden border-amber-500 shadow-xl shadow-amber-500/10 ${isProfessional ? 'ring-4 ring-amber-500' : 'ring-2 ring-amber-500/30'}`}
                    >
                        {isProfessional && (
                            <div className="absolute top-0 right-0 rounded-bl-lg bg-amber-500 px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                                Forfait actuel
                            </div>
                        )}
                        {!isProfessional && (
                            <div className="absolute top-0 right-0 rounded-bl-lg bg-amber-500 px-3 py-1 text-[10px] font-bold tracking-wider text-white uppercase">
                                Populaire
                            </div>
                        )}
                        <CardHeader>
                            <div className="mb-1 flex items-center gap-2 text-amber-500">
                                <Zap className="h-4 w-4" fill="currentColor" />
                                <span className="text-xs font-bold tracking-widest uppercase">
                                    Le plus pratique
                                </span>
                            </div>
                            <CardTitle>Professionnel</CardTitle>
                            <CardDescription>
                                Accès complet pour les professionnels de la bijouterie
                            </CardDescription>
                            <div className="mt-4 text-4xl font-extrabold">
                                $19.99
                                <span className="text-sm font-normal text-neutral-500">
                                    /mois
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <ul className="space-y-4">
                                <li className="flex items-center gap-2 text-sm font-medium">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    <span>
                                        Tous les cours (Or, Argent, Cuivre)
                                    </span>
                                </li>
                                <li className="flex items-center gap-2 text-sm font-medium">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    <span>Taux DZD du marché parallèle</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm font-medium">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    <span>Calculateur de vente avancé</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm font-medium">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    <span>Calculs de carats multiples</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button
                                asChild
                                className="w-full bg-amber-600 text-white hover:bg-amber-700"
                                disabled={isProfessional}
                            >
                                {isProfessional ? (
                                    <span>Forfait actif</span>
                                ) : (
                                    <Link href="/subscription/checkout?plan=professional">
                                        Mettre à jour maintenant
                                    </Link>
                                )}
                            </Button>
                        </CardFooter>
                    </Card>

                    {/* Enterprise Plan */}
                    <Card className="flex flex-col border-neutral-200 dark:border-neutral-800">
                        <CardHeader>
                            <CardTitle>Entreprise</CardTitle>
                            <CardDescription>
                                Solutions personnalisées pour les grandes boutiques
                            </CardDescription>
                            <div className="mt-4 text-4xl font-bold">
                                $99
                                <span className="text-sm font-normal text-neutral-500">
                                    /mois
                                </span>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <ul className="space-y-4">
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    <span>Accès multi-utilisateurs</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    <span>Intégration de l'inventaire</span>
                                </li>
                                <li className="flex items-center gap-2 text-sm">
                                    <Check className="h-4 w-4 text-emerald-500" />
                                    <span>Support Premium</span>
                                </li>
                            </ul>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full">
                                Contacter le service commercial
                            </Button>
                        </CardFooter>
                    </Card>
                </div>

                <div className="mt-20 grid grid-cols-1 gap-8 text-neutral-500 md:grid-cols-3">
                    <div className="flex flex-col items-center text-center">
                        <ShieldCheck className="mb-4 h-10 w-10 text-neutral-400" />
                        <h3 className="mb-2 font-bold text-neutral-900 dark:text-neutral-100">
                            Paiements sécurisés
                        </h3>
                        <p className="text-sm text-neutral-500 italic">
                            "Transactions vérifiées pour votre tranquillité d'esprit."
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Gem className="mb-4 h-10 w-10 text-neutral-400" />
                        <h3 className="mb-2 font-bold text-neutral-900 dark:text-neutral-100">
                            Support Premium
                        </h3>
                        <p className="text-sm text-neutral-500 italic">
                            "Assistance experte pour tous les abonnés."
                        </p>
                    </div>
                    <div className="flex flex-col items-center text-center">
                        <Check className="mb-4 h-10 w-10 text-neutral-400" />
                        <h3 className="mb-2 font-bold text-neutral-900 dark:text-neutral-100">
                            Activation instantanée
                        </h3>
                        <p className="text-sm text-neutral-500 italic">
                            "Accédez à toutes les fonctionnalités immédiatement après le paiement."
                        </p>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
