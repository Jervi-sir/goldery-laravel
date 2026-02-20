import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, ShieldAlert, Users, CreditCard } from 'lucide-react';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import type { NavItem } from '@/types';
import AppLogo from './app-logo';
import AdminDashboardController from '@/actions/App/Http/Controllers/Admin/AdminDashboardController';
import UserController from '@/actions/App/Http/Controllers/Admin/UserController';
import BillingController from '@/actions/App/Http/Controllers/Admin/BillingController';
import MetalPriceController from '@/actions/App/Http/Controllers/MetalPriceController';
import { dashboard } from '@/routes';

export function AppSidebar() {
    const { auth } = usePage<any>().props;
    const isAdmin = auth?.user?.role?.name === 'admin';

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Prices History',
            href: MetalPriceController.history(),
            icon: BookOpen,
        },
    ];

    if (isAdmin) {
        mainNavItems.push({
            title: 'Admin Dashboard',
            href: AdminDashboardController(),
            icon: ShieldAlert,
        });
        mainNavItems.push({
            title: 'User Management',
            href: UserController.index(),
            icon: Users,
        });
        mainNavItems.push({
            title: 'All Billing',
            href: BillingController.index(),
            icon: CreditCard,
        });
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
