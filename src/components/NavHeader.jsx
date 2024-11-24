'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut } from "lucide-react";
import { logout, getUser } from "@/utils/helper";
import { useRouter } from "next/navigation";
import { setUser, clearUser, setLoading } from '../../store/slices/userSlice';
import { ThemeToggle } from './theme-toggle';

function NavHeader() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.user);

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        try {
            dispatch(setLoading(true));
            const userData = await getUser();
            dispatch(setUser(userData));
        } catch (error) {
            console.error('Error fetching user:', error);
            dispatch(clearUser());
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            dispatch(clearUser());
            router.push('/login');
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    if (loading) return null;

    return (
        <div className="w-full flex justify-end p-4 z-50 dark:bg-dark">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                        <div className="flex items-center gap-2">
                            <span className="text-dark dark:text-white font-medium">{user?.name || 'CODE94LABS'}</span>
                            <ChevronDown className="w-4 h-4 dark:text-white" />
                        </div>
                        <div className="relative w-10 h-10 rounded-full bg-blue ml-2 flex items-center justify-center text-white font-medium">
                            {user?.name ? user.name.charAt(0).toUpperCase() : '94'}
                        </div>
                    </Button>
                </DropdownMenuTrigger>
                {user ? (
                    <DropdownMenuContent align="end" className="w-56 dark:bg-dark bg-white">
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm dark:text-white font-medium leading-none">{user?.name}</p>
                                <p className="text-xs dark:text-gray-400 leading-none">{user?.email}</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            className="text-red-500 dark:text-red-500 cursor-pointer"
                            onClick={handleLogout}
                        >
                            <LogOut className="w-4 h-4 mr-2" />
                            Logout
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="flex justify-between items-center">
                            <span className="dark:text-white">Theme</span>
                            <ThemeToggle />
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                ) :
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel className="font-normal">
                            <div className="flex flex-col space-y-1">
                                <p className="text-sm font-medium leading-none dark:text-white">Please Login</p>
                                <p className="text-xs leading-none text-gray-500 dark:text-gray-300">Code94Labs</p>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuItem className="flex justify-between items-center">
                            <span className="dark:text-white">Theme</span>
                            <ThemeToggle />
                        </DropdownMenuItem>
                    </DropdownMenuContent>}
            </DropdownMenu>
        </div>
    );
}

export default NavHeader;
