import SideBarLayout from '@/layouts/SideBarLayout';
import { Head } from '@inertiajs/react';

export default function Home() {
    return (
        <SideBarLayout>
            <Head title="Home" />
            <div className="flex flex-col items-center justify-center min-h-full">
                <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
                    Welcome to AI Weather Agent
                </h1>
                <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
                    Select a conversation or start a new one.
                </p>
            </div>
        </SideBarLayout>
    );
}
