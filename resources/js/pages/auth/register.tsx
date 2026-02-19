import { Form, Head } from '@inertiajs/react';
import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import AuthLayout from '@/layouts/auth-layout';
import { login } from '@/routes';
import { store } from '@/routes/register';
import { User, Mail, Lock, UserPlus } from 'lucide-react';

export default function Register() {
    return (
        <AuthLayout
            title="Create your account"
            description="Join Goldery to start tracking market prices today"
        >
            <Head title="Register" />
            <Form
                {...store.form()}
                resetOnSuccess={['password', 'password_confirmation']}
                disableWhileProcessing
                className="flex flex-col gap-6"
            >
                {({ processing, errors }) => (
                    <>
                        <div className="grid gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Full Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        tabIndex={1}
                                        autoComplete="name"
                                        name="name"
                                        placeholder="Enter your full name"
                                        className="pl-10"
                                    />
                                </div>
                                <InputError
                                    message={errors.name}
                                />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="email">Email Address</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        id="email"
                                        type="email"
                                        required
                                        tabIndex={2}
                                        autoComplete="email"
                                        name="email"
                                        placeholder="email@example.com"
                                        className="pl-10"
                                    />
                                </div>
                                <InputError message={errors.email} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="password">Password</Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="password"
                                            type="password"
                                            required
                                            tabIndex={3}
                                            autoComplete="new-password"
                                            name="password"
                                            placeholder="••••••••"
                                            className="pl-10"
                                        />
                                    </div>
                                    <InputError message={errors.password} />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="password_confirmation">
                                        Confirm
                                    </Label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                        <Input
                                            id="password_confirmation"
                                            type="password"
                                            required
                                            tabIndex={4}
                                            autoComplete="new-password"
                                            name="password_confirmation"
                                            placeholder="••••••••"
                                            className="pl-10"
                                        />
                                    </div>
                                    <InputError
                                        message={errors.password_confirmation}
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="mt-2 w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold h-11 transition-all duration-200"
                                tabIndex={5}
                                data-test="register-user-button"
                            >
                                {processing ? (
                                    <Spinner className="mr-2 h-4 w-4" />
                                ) : (
                                    <UserPlus className="mr-2 h-4 w-4" />
                                )}
                                Start Your Journey
                            </Button>
                        </div>

                        <div className="text-center text-sm text-zinc-500">
                            Already have an account?{' '}
                            <TextLink
                                href={login()}
                                tabIndex={6}
                                className="font-semibold text-amber-600 hover:text-amber-700 hover:underline"
                            >
                                Sign in instead
                            </TextLink>
                        </div>
                    </>
                )}
            </Form>
        </AuthLayout>
    );
}
