import { Transition } from '@headlessui/react';
import { Form, Head, Link, usePage } from '@inertiajs/react';
import ProfileController from '@/actions/App/Http/Controllers/Settings/ProfileController';
import DeleteUser from '@/components/delete-user';
import Heading from '@/components/heading';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit } from '@/routes/profile';
import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Paramètres du profil',
        href: edit().url,
    },
];

export default function Profile({
    mustVerifyEmail,
    status,
}: {
    mustVerifyEmail: boolean;
    status?: string;
}) {
    const { auth } = usePage().props;

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Paramètres du profil" />

            <h1 className="sr-only">Paramètres du profil</h1>

            <SettingsLayout>
                <div className="space-y-6">
                    <Heading
                        variant="small"
                        title="Informations du profil"
                        description="Mettez à jour votre nom et votre adresse e-mail"
                    />

                    <Form
                        {...ProfileController.update.form()}
                        options={{
                            preserveScroll: true,
                        }}
                        className="space-y-6"
                        encType="multipart/form-data"
                    >
                        {({ processing, recentlySuccessful, errors }) => (
                            <>
                                <div className="flex items-center gap-4">
                                    <div className="group relative">
                                        <div className="size-20 overflow-hidden rounded-full border-2 border-zinc-100 dark:border-zinc-800">
                                            {auth.user.profile_photo_path ? (
                                                <img
                                                    src={`/storage/${auth.user.profile_photo_path}`}
                                                    alt={auth.user.name}
                                                    className="size-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex size-full items-center justify-center bg-zinc-100 text-2xl font-bold text-zinc-400 dark:bg-zinc-800">
                                                    {auth.user.name.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="grid flex-1 gap-1.5">
                                        <Label htmlFor="profile_photo">
                                            Photo de profil
                                        </Label>
                                        <Input
                                            id="profile_photo"
                                            name="profile_photo"
                                            type="file"
                                            accept="image/*"
                                            className="mt-1 block w-full text-sm"
                                        />
                                        <p className="text-xs text-muted-foreground">
                                            JPG, PNG ou GIF. Max 2 Mo.
                                        </p>
                                        <InputError
                                            message={errors.profile_photo}
                                        />
                                    </div>
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="name">Nom</Label>

                                    <Input
                                        id="name"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.name}
                                        name="name"
                                        required
                                        autoComplete="name"
                                        placeholder="Nom complet"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div className="grid gap-2">
                                    <Label htmlFor="email">Adresse e-mail</Label>

                                    <Input
                                        id="email"
                                        type="email"
                                        className="mt-1 block w-full"
                                        defaultValue={auth.user.email}
                                        name="email"
                                        required
                                        autoComplete="username"
                                        placeholder="Email address"
                                    />

                                    <InputError
                                        className="mt-2"
                                        message={errors.email}
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <Button
                                        disabled={processing}
                                        data-test="update-profile-button"
                                    >
                                        Enregistrer
                                    </Button>

                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-neutral-600">
                                            Enregistré
                                        </p>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Form>
                </div>

                <DeleteUser />
            </SettingsLayout>
        </AppLayout>
    );
}
