'use client';

import { useState, useEffect } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../../store/slices/userSlice';
import { login } from '@/utils/helper';
import { useRouter } from 'next/navigation';
import { Loader2 } from "lucide-react";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useDispatch();
    const router = useRouter();

    const user = useSelector((state) => state.user.user);

    useEffect(() => {
        if (user) {
            router.push('/products');
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const userData = await login(email, password);
            if (userData) {
                dispatch(setUser(userData));
                router.push('/products');
            } else {
                setError('Invalid credentials');
            }
        } catch (error) {
            setError('Login failed. Please try again.');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white dark:bg-dark flex items-center justify-center p-4">
            <div className="w-full max-w-md space-y-8">
                <div className="text-center">
                    <h1 className="text-2xl font-bold tracking-tight text-dark dark:text-white mb-2">
                        Welcome Back
                    </h1>
                    <p className="text-gray-500">
                        Please enter your details to sign in
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 mt-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-dark dark:text-white">
                                Email
                            </label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="h-12 bg-[#F8F8F8] border-0 rounded-2xl"
                                disabled={loading}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="password" className="text-sm font-medium text-dark dark:text-white">
                                Password
                            </label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="h-12 bg-[#F8F8F8] border-0 rounded-2xl"
                                disabled={loading}
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full h-12 bg-blue hover:bg-blue/90 text-white rounded-2xl"
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                        ) : null}
                        Sign In
                    </Button>

                    <div className="text-center text-sm">
                        <a
                            href="#"
                            className="text-blue hover:underline"
                            onClick={(e) => {
                                e.preventDefault();
                            }}
                        >
                            email: vendor@example.com<br />
                            password: vendor123
                        </a>
                    </div>

                </form>
            </div>
        </div>
    );
}

export default LoginPage;