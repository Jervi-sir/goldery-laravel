import AppLogoIcon from '@/components/app-logo-icon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { dashboard, login, register } from '@/routes';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    ArrowRight,
    Coins,
    TrendingUp,
    Clock,
    ShieldCheck,
    Globe,
    Calculator,
    Gem,
    LineChart,
    Building2,
    RefreshCw
} from 'lucide-react';

export default function Welcome({
    canRegister = true,
}: {
    canRegister?: boolean;
}) {
    const { auth } = usePage().props;

    return (
        <div className="min-h-screen bg-[#FDFDFC] text-[#1b1b18] selection:bg-amber-100 selection:text-amber-900 dark:bg-[#050505] dark:text-[#EDEDEC]">
            <Head title="Goldery | Real-time Gold & Currency Intelligence" />

            {/* Navigation */}
            <nav className="fixed top-0 z-50 w-full border-b border-neutral-200 bg-white/70 backdrop-blur-xl dark:border-neutral-800 dark:bg-[#050505]/70">
                <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex aspect-square size-10 items-center justify-center rounded-xl bg-amber-500 text-white shadow-lg shadow-amber-500/20 transition-transform group-hover:scale-105 dark:bg-amber-600">
                            <AppLogoIcon className="size-6 fill-current" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-black tracking-tighter uppercase leading-none">
                                Goldery
                            </span>
                            <span className="text-[10px] font-bold tracking-[0.2em] text-amber-600 dark:text-amber-500 uppercase leading-none mt-1">
                                Market Data
                            </span>
                        </div>
                    </Link>

                    <div className="flex items-center gap-6">
                        <div className="hidden lg:flex items-center gap-6">
                            <Link href="#features" className="text-sm font-semibold hover:text-amber-500 transition-colors">Features</Link>
                            <Link href="#solutions" className="text-sm font-semibold hover:text-amber-500 transition-colors">Jewelry Solutions</Link>
                        </div>

                        <div className="flex items-center gap-3">
                            {auth.user ? (
                                <Button asChild variant="outline" className="border-amber-200 dark:border-amber-900">
                                    <Link href={dashboard()}>Terminal Access</Link>
                                </Button>
                            ) : (
                                <>
                                    <Button asChild variant="ghost" className="hidden sm:inline-flex">
                                        <Link href={login()}>Log in</Link>
                                    </Button>
                                    {canRegister && (
                                        <Button asChild className="bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 font-bold">
                                            <Link href={register()}>Open Account</Link>
                                        </Button>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden lg:pt-48 lg:pb-40">
                <div className="container mx-auto px-4">
                    <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                        <div className="space-y-8">
                            <div className="inline-flex items-center rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 dark:bg-amber-900/20 dark:text-amber-400 border border-amber-200 dark:border-amber-900/30">
                                <RefreshCw className="mr-2 size-3 animate-spin-slow" />
                                Updated every 60 seconds
                            </div>
                            <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl leading-[1.05]">
                                Precise <span className="text-amber-500 underline decoration-amber-200 decoration-8 underline-offset-8">Gold Data</span> <br />
                                For Jewelry Stores.
                            </h1>
                            <p className="max-w-[540px] text-lg text-neutral-500 md:text-xl dark:text-neutral-400">
                                Streamline your retail pricing with real-time precious metal rates and global currency exchange. The professional's choice for jewelry market intelligence.
                            </p>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                <Button size="lg" className="h-14 px-10 text-lg bg-neutral-900 text-white hover:bg-neutral-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 shadow-xl" asChild>
                                    <Link href={register()}>Get Access Now</Link>
                                </Button>
                                <Button size="lg" variant="outline" className="h-14 px-10 text-lg border-neutral-200 dark:border-neutral-800" asChild>
                                    <Link href={login()}>Market Terminal</Link>
                                </Button>
                            </div>

                            <div className="flex items-center gap-8 pt-4">
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black">24kt</span>
                                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Real-time Spot</span>
                                </div>
                                <div className="size-px h-10 bg-neutral-200 dark:bg-neutral-800" />
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black">150+</span>
                                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Currencies</span>
                                </div>
                                <div className="size-px h-10 bg-neutral-200 dark:bg-neutral-800" />
                                <div className="flex flex-col">
                                    <span className="text-2xl font-black">0.01s</span>
                                    <span className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Precision</span>
                                </div>
                            </div>
                        </div>

                        <div className="relative group lg:block hidden">
                            <div className="relative z-10 rounded-3xl border border-neutral-200 bg-white p-6 shadow-2xl dark:border-neutral-800 dark:bg-[#0a0a0a]">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="flex items-center gap-3">
                                        <div className="size-10 rounded-xl bg-amber-500 flex items-center justify-center text-white shadow-lg shadow-amber-500/20">
                                            <Coins className="size-6" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold">Gold Spot Price</div>
                                            <div className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">XAU / USD</div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-black text-green-500 flex items-center gap-1">
                                            <TrendingUp className="size-5" /> +1.24%
                                        </div>
                                        <div className="text-xs text-neutral-400 font-bold">Today's Peak</div>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div className="h-32 w-full bg-neutral-50 dark:bg-[#0f0f0f] rounded-2xl flex items-end px-2 pb-2 gap-1 overflow-hidden">
                                        {[40, 60, 45, 80, 55, 90, 75, 95, 85, 100].map((h, i) => (
                                            <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-amber-500/20 rounded-t-sm group-hover:bg-amber-500/40 transition-all duration-700" />
                                        ))}
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#0f0f0f] border border-neutral-100 dark:border-neutral-800">
                                            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Buy Price</div>
                                            <div className="text-xl font-black">$2,412.50</div>
                                        </div>
                                        <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-[#0f0f0f] border border-neutral-100 dark:border-neutral-800">
                                            <div className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest mb-1">Sell Price</div>
                                            <div className="text-xl font-black">$2,398.20</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Decorative shadow */}
                            <div className="absolute top-1/2 left-1/2 -z-10 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-amber-500/10 blur-[120px]" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section id="features" className="py-24 bg-white dark:bg-[#050505]">
                <div className="container mx-auto px-4">
                    <div className="grid gap-12 md:grid-cols-3">
                        <div className="space-y-4">
                            <div className="size-12 rounded-2xl bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-amber-600">
                                <Clock className="size-6" />
                            </div>
                            <h3 className="text-xl font-bold">Instant Updates</h3>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                                Our engine syncs with London and New York spot markets 24/7. Never price your jewelry on outdated data again.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="size-12 rounded-2xl bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-amber-600">
                                <Globe className="size-6" />
                            </div>
                            <h3 className="text-xl font-bold">150+ Currencies</h3>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                                Serve international clients with confidence. Convert gold prices into any local currency instantly with mid-market rates.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <div className="size-12 rounded-2xl bg-amber-100 dark:bg-amber-900/20 flex items-center justify-center text-amber-600">
                                <ShieldCheck className="size-6" />
                            </div>
                            <h3 className="text-xl font-bold">Enterprise Trust</h3>
                            <p className="text-neutral-500 dark:text-neutral-400 text-sm leading-relaxed">
                                Used by premium jewelry retailers and gold traders for bank-grade accuracy and uptime reliability.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Highlight Section */}
            <section id="solutions" className="py-24 border-y border-neutral-100 dark:border-neutral-900">
                <div className="container mx-auto px-4">
                    <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
                        <div className="order-2 lg:order-1 relative">
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="bg-neutral-50 dark:bg-[#0a0a0a] border-none shadow-sm">
                                    <CardContent className="p-8 text-center space-y-4">
                                        <Calculator className="size-8 mx-auto text-amber-500" />
                                        <h4 className="font-bold">Price Calculator</h4>
                                        <p className="text-xs text-neutral-400">Calculate jewelry item costs based on weight and purity instantly.</p>
                                    </CardContent>
                                </Card>
                                <Card className="bg-neutral-900 text-white border-none shadow-xl transform translate-y-8">
                                    <CardContent className="p-8 text-center space-y-4">
                                        <LineChart className="size-8 mx-auto text-amber-500" />
                                        <h4 className="font-bold">Historical Data</h4>
                                        <p className="text-xs text-neutral-400">Analyze 10-year pricing trends for better inventory decisions.</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-8">
                            <div className="text-amber-500 font-bold uppercase tracking-widest text-xs">Built for Retail</div>
                            <h2 className="text-4xl font-extrabold tracking-tight">Powerful Tools for Your Showroom.</h2>
                            <p className="text-lg text-neutral-500 dark:text-neutral-400">
                                From individual gold weight calculations to store-wide pricing displays, Goldery provides the logic behind your profit margins.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    { icon: <Gem className="size-5" />, text: "Karat-specific calculation (14k, 18k, 21k, 22k, 24k)" },
                                    { icon: <Building2 className="size-5" />, text: "Multi-store dashboard for centralized pricing" },
                                    { icon: <RefreshCw className="size-5" />, text: "Automatic hourly price tags updates" }
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 font-semibold text-sm">
                                        <span className="text-amber-500">{item.icon}</span>
                                        {item.text}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 text-center">
                <div className="container mx-auto px-4 max-w-3xl space-y-8">
                    <h2 className="text-4xl font-black md:text-5xl">The Smart Way to Price Jewelry.</h2>
                    <p className="text-neutral-500 dark:text-neutral-400">Join the elite jewelry stores using Goldery today.</p>
                    <div className="pt-4 flex flex-col sm:flex-row justify-center gap-4">
                        <Button size="lg" className="h-14 px-12 text-lg bg-amber-500 hover:bg-amber-600 rounded-full" asChild>
                            <Link href={register()}>Start Your Trial</Link>
                        </Button>
                        <Button size="lg" variant="ghost" className="h-14 px-12 text-lg rounded-full" asChild>
                            <Link href={login()}>Contact Sales</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="py-12 border-t border-neutral-100 dark:border-neutral-900">
                <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-2">
                        <AppLogoIcon className="size-6 text-amber-500 fill-current" />
                        <span className="font-black uppercase tracking-tighter">Goldery</span>
                        <span className="text-neutral-400 text-xs font-bold uppercase tracking-widest">© {new Date().getFullYear()}</span>
                    </div>
                    <div className="flex gap-8 text-xs font-bold text-neutral-400 uppercase tracking-widest">
                        <Link href="#" className="hover:text-amber-500 transition-colors">Market Data API</Link>
                        <Link href="#" className="hover:text-amber-500 transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-amber-500 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
