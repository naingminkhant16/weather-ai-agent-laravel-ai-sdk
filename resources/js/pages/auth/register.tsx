import { Button } from '@/components/ui/button';
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/AppLayout';
import { Link, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

export default function Register() {
    const { data, setData, post, errors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });
    const register = (e: FormEvent) => {
        e.preventDefault();
        post('register');
    };
    return (
        <AppLayout>
            <Card className="w-full max-w-sm">
                <CardHeader>
                    <CardTitle>Register With Your Email</CardTitle>
                    <CardDescription>Fill Your email and password.</CardDescription>
                    <CardAction>
                        <Button variant="link" className={'cursor-pointer'}>
                            <Link href={'/login'}>Login</Link>
                        </Button>
                    </CardAction>
                </CardHeader>
                <CardContent>
                    <form onSubmit={register} id="register-form">
                        <div className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Your Name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                {errors.name && <div className={'text-sm text-red-500'}>{errors.name}</div>}
                            </div>
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
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="confirm_password">Confirm Password</Label>
                                </div>
                                <Input
                                    id="confirm_password"
                                    type="password"
                                    value={data.password_confirmation}
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                    required
                                    placeholder="Confirm Password"
                                />
                            </div>
                        </div>
                    </form>
                </CardContent>
                <CardFooter className="flex-col gap-2">
                    <Button form={'register-form'} type="submit" variant={'outline'} className="w-full cursor-pointer">
                        Register
                    </Button>
                </CardFooter>
            </Card>
        </AppLayout>
    );
}
