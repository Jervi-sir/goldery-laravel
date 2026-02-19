import { Link } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import AppLogoIcon from '@/components/app-logo-icon';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { home } from '@/routes';

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
        <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-[#fafafa] dark:bg-zinc-950 p-6 md:p-10 relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
                <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-amber-500/5 blur-[120px] rounded-full" />
                <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-amber-600/5 blur-[120px] rounded-full" />
            </div>

            <div className="flex w-full max-w-md flex-col gap-8 relative z-10">
                <Link
                    href={home()}
                    className="flex flex-col items-center gap-3 self-center group transition-all duration-300"
                >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-zinc-900 shadow-sm border border-zinc-200 dark:border-zinc-800 group-hover:shadow-md group-hover:scale-105 transition-all">
                        <AppLogoIcon className="size-8 fill-amber-600" />
                    </div>
                </Link>

                <div className="flex flex-col gap-6">
                    <Card className="rounded-2xl border-zinc-200/60 dark:border-zinc-800/60 shadow-xl shadow-zinc-200/20 dark:shadow-none overflow-hidden">
                        <div className="h-1.5 bg-gradient-to-r from-amber-400 via-amber-600 to-amber-400 w-full" />
                        <CardHeader className="px-8 pt-8 pb-0 text-center">
                            <CardTitle className="text-2xl font-bold tracking-tight">{title}</CardTitle>
                            <CardDescription className="text-zinc-500 text-balance mt-2">{description}</CardDescription>
                        </CardHeader>
                        <CardContent className="px-8 py-8">
                            {children}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
