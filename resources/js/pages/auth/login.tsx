import { Button } from '@/components/ui/button';
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function Login() {
    const { data, setData, post, errors } = useForm({
        email: '',
        password: '',
    });
    const login = (e: FormEvent) => {
        e.preventDefault();

        post('login-attempt');
    };
    return (
        <AppLayout>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>Enter your email below to login</CardDescription>
                    <CardAction>
                        <Button variant="link" className={'cursor-pointer'}>
                            <Link href={'/register'}>Sign Up</Link>
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={login} id={'login-form'}>
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Your email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                {errors.email && <div className={'text-sm text-red-500'}>{errors.email}</div>}
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                </div>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                    placeholder="Your Password"
                                />
                                {errors.password && <div className={'text-sm text-red-500'}>{errors.password}</div>}
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button form={'login-form'} type="submit" variant={'outline'} className="w-full cursor-pointer">
                        Login
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
