import AppLogoIcon from './app-logo-icon';

export default function AppLogo() {
    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md bg-amber-500 text-white dark:bg-amber-600">
                <AppLogoIcon className="size-5 fill-current" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-tight font-extrabold tracking-tight text-neutral-900 dark:text-neutral-100">
                    Goldery
                </span>
            </div>
        </>
    );
}
