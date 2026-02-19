import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { register } from '@/routes';
import { store } from '@/routes/login';
import { request } from '@/routes/password';
import { Mail, Lock, LogIn } from 'lucide-react';

type Props = {
    status?: string;
    canResetPassword: boolean;
    canRegister: boolean;
};

export default function Login({
    status,
    canResetPassword,
    canRegister,
}: Props) {
    return (
        <AuthLayout
            title="Log in to your account"
            description="Enter your email and password below to log in"
        >
            <Head title="Log in" />

            {status && (
                <div className="mb-6 rounded-lg bg-emerald-50 p-4 text-center text-sm font-medium text-emerald-600 dark:bg-emerald-950/30 dark:text-emerald-400">
                    {status}
                </div>
            )}

            <Form
                {...store.form()}
                resetOnSuccess={['password']}
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        name="email"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="email"
                                        placeholder="email@example.com"
                                        className="pl-10"
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {canResetPassword && (
                                        <TextLink
                                            href={request()}
                                            className="ml-auto text-xs font-medium text-amber-600 hover:text-amber-700"
                                            tabIndex={5}
                                        >
                                            Forgot password?
                                        </TextLink>
                                    )}
                                </div>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        tabIndex={2}
                                        autoComplete="current-password"
                                        placeholder="Enter your password"
                                        className="pl-10"
                                    />
                                </div>
                                <InputError message={errors.password} />
                            </div>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="remember"
                                    name="remember"
                                    tabIndex={3}
                                    className="data-[state=checked]:bg-amber-600 data-[state=checked]:border-amber-600"
                                />
                                <Label htmlFor="remember" className="text-sm font-normal text-muted-foreground cursor-pointer select-none">
                                    Keep me logged in
                                </Label>
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold h-11"
                                tabIndex={4}
                                disabled={processing}
                                data-test="login-button"
                            >
                                {processing ? (
                                    <Spinner className="mr-2 h-4 w-4" />
                                ) : (
                                    <LogIn className="mr-2 h-4 w-4" />
                                )}
                                Sign in to Goldery
                            </Button>
                        </div>

                        {canRegister && (
                            <div className="text-center text-sm text-zinc-500">
                                Don't have an account?{' '}
                                <TextLink
                                    href={register()}
                                    tabIndex={5}
                                    className="font-semibold text-amber-600 hover:text-amber-700 hover:underline"
                                >
                                    Create one for free
                                </TextLink>
                            </div>
                        )}
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
