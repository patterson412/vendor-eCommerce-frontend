'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { getUser } from '@/utils/helper';
import { setUser, setLoading } from '../../store/slices/userSlice';
import { Loader2 } from "lucide-react";

export default function Home() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user, loading } = useSelector((state) => state.user);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      dispatch(setLoading(true));
      const userData = await getUser();
      if (userData) {
        dispatch(setUser(userData));
        router.push('/products');
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      router.push('/login');
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-dark flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue" />
      </div>
    );
  }

  return null;
}