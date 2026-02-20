import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Users, ChevronLeft, ChevronRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin',
    },
    {
        title: 'User Management',
        href: '/admin/users',
    },
];

interface User {
    id: number;
    name: string;
    email: string;
    is_subscribed: boolean;
    created_at: string;
    role: {
        name: string;
    } | null;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface AdminUsersProps {
    users: {
        data: User[];
        links: PaginationLink[];
        current_page: number;
        last_page: number;
        total: number;
    };
}

export default function AdminUsers({ users }: AdminUsersProps) {
    const updateForm = useForm({
        is_subscribed: false,
    });

    const [updatingId, setUpdatingId] = useState<number | null>(null);

    const toggleSubscription = (user: User) => {
        setUpdatingId(user.id);
        updateForm.data.is_subscribed = !user.is_subscribed;
        updateForm.put(`/admin/users/${user.id}`, {
            preserveScroll: true,
            onFinish: () => setUpdatingId(null),
        });
    };

    const formatDate = (dateString: string) => {
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        }).format(new Date(dateString));
    };

    return (
        <AppLayout >
            <Head title="Admin Users" />

            <div className="flex flex-1 flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto w-full">
                <Card className="border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-xl">
                            <Users className="h-5 w-5 text-indigo-500" />
                            User Management
                        </CardTitle>
                        <CardDescription>
                            List of all registered users and their current subscription stat. Manually prove users.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-md border border-zinc-100 dark:border-zinc-800">
                            <Table>
                                <TableHeader>
                                    <TableRow className="bg-zinc-50 dark:bg-zinc-900/50">
                                        <TableHead className="w-[80px]">ID</TableHead>
                                        <TableHead>User details</TableHead>
                                        <TableHead>Joined</TableHead>
                                        <TableHead>Role</TableHead>
                                        <TableHead className="text-right">Subscription Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {users.data.length > 0 ? (
                                        users.data.map((user) => (
                                            <TableRow key={user.id} className={user.role?.name === 'admin' ? "bg-amber-50/50 dark:bg-amber-900/10" : ""}>
                                                <TableCell className="font-mono text-zinc-500">#{user.id}</TableCell>
                                                <TableCell>
                                                    <div className="font-bold text-zinc-900 dark:text-zinc-100">{user.name}</div>
                                                    <div className="text-xs text-muted-foreground">{user.email}</div>
                                                </TableCell>
                                                <TableCell className="text-zinc-500">
                                                    {formatDate(user.created_at)}
                                                </TableCell>
                                                <TableCell>
                                                    {user.role?.name === 'admin' ? (
                                                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-md bg-amber-100 text-amber-800 text-xs font-medium dark:bg-amber-900 dark:text-amber-200">
                                                            <ShieldAlert className="h-3 w-3" />
                                                            Admin
                                                        </span>
                                                    ) : (
                                                        <span className="text-muted-foreground text-sm capitalize">User</span>
                                                    )}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex items-center justify-end gap-3 text-sm">
                                                        <span className={user.is_subscribed ? "text-emerald-600 font-medium flex items-center gap-1" : "text-zinc-400"}>
                                                            {user.is_subscribed ? <><CheckCircle2 className="h-4 w-4" /> Active Pro</> : 'Free'}
                                                        </span>
                                                        <Checkbox
                                                            checked={user.is_subscribed}
                                                            disabled={updatingId === user.id || user.role?.name === 'admin'}
                                                            onCheckedChange={(checked) => {
                                                                if (checked !== 'indeterminate') {
                                                                    toggleSubscription(user);
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={5} className="h-24 text-center">
                                                No users found.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </div>

                        {/* Pagination */}
                        {users.last_page > 1 && (
                            <div className="flex items-center justify-between mt-6">
                                <span className="text-sm text-zinc-500">
                                    Showing page {users.current_page} of {users.last_page} ({users.total} total)
                                </span>
                                <div className="flex gap-2 relative z-10">
                                    {users.links.map((link, i) => {
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
