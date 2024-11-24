'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getFavoriteProducts } from '@/utils/helper';
import ProductTable from '@/components/ProductTable';
import ProductSearch from '@/components/ProductSearch';
import ProductList from '@/components/ProductList';
import { ChevronLeft } from 'lucide-react';
import { toggleFavorite } from '@/utils/helper';
import { toast } from "@/hooks/use-toast";
export default function FavouritesPage() {
    const router = useRouter();
    const { user } = useSelector((state) => state.user);
    const [favourites, setFavourites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }
        fetchFavourites();
    }, [user]);

    const fetchFavourites = async () => {
        setLoading(true);
        try {
            const data = await getFavoriteProducts();
            setFavourites(data?.favourites || []);
            setError(null);
        } catch (err) {
            setError('Failed to fetch favourite products');
            console.log('Error fetching favourite products:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        await toggleFavorite(id);
        toast({
            title: (
                <span className="text-green-500 dark:text-green-300">
                    Removed
                </span>
            ),
            description: (
                <span className="text-green-500 dark:text-green-300">
                    Product removed from favourites
                </span>
            ),
        });
        fetchFavourites();
    };

    const handleEdit = (id) => {
        router.push(`/products/edit/${id}`);
    };

    const handleToggleFavorite = async (id) => {
        // Not used as in Favourites page all items are favorites, can use the delete functionality to remove from favorites
    };

    const filteredFavourites = (favourites || []).filter(product => {
        if (!searchTerm) return true;
        const searchRegex = new RegExp(searchTerm, 'i');
        return (
            searchRegex.test(product.name) ||
            searchRegex.test(product.sku) ||
            searchRegex.test(product.description) ||
            searchRegex.test(product.price?.toString()) ||
            searchRegex.test(`$${product.price}`)
        );
    });

    if (error) {
        return (
            <div className="flex items-center justify-center h-screen bg-white dark:bg-dark">
                <div className="text-center text-dark dark:text-white">
                    <h2 className="text-2xl font-bold mb-2">Error Loading Favourites</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
                    <Button
                        onClick={fetchFavourites}
                        className="bg-blue hover:bg-blue/90 text-white rounded-2xl"
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-6xl mx-auto bg-white dark:bg-dark font-satoshi">
            <div className="mb-12">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-[28px] font-bold tracking-tight text-dark dark:text-white">FAVOURITES</h1>
                </div>

                <div className="flex justify-between items-center gap-4">
                    <div className="flex-1 max-w-2xl">
                        <ProductSearch
                            searchTerm={searchTerm}
                            onSearchChange={(e) => setSearchTerm(e.target.value)}
                            loading={loading}
                            placeholder="Search in favourites"
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            className="bg-blue hover:bg-blue/90 text-white h-12 px-8 rounded-2xl"
                            onClick={() => router.push('/products/newproduct')}
                            disabled={loading}
                        >
                            New Product
                        </Button>
                        <Button
                            variant="outline"
                            className="border-blue h-12 px-6 rounded-xl flex items-center gap-2 hover:bg-blue/5"
                            disabled={loading}
                            onClick={() => router.push('/products')}
                        >
                            <ChevronLeft className="w-5 h-5 text-blue" />
                            <span className="text-blue font-medium">Go Back</span>
                        </Button>
                    </div>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center items-center min-h-[400px]">
                    <Loader2 className="w-8 h-8 animate-spin text-blue" />
                </div>
            ) : searchTerm ? (
                <>
                    <div className="text-gray-500 mb-8">
                        {filteredFavourites.length} results found for '{searchTerm}'
                    </div>
                    <ProductList products={filteredFavourites} />
                </>
            ) : (
                <ProductTable
                    products={favourites}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onToggleFavorite={handleToggleFavorite}
                    showFavoriteToggle={false} // Hide favorite toggle since all items are favorites
                />
            )}
        </div>
    );
}