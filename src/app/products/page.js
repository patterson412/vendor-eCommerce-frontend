'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getAllProducts, deleteProduct, toggleFavorite } from "@/utils/helper";
import ProductTable from '@/components/ProductTable';
import ProductSearch from '@/components/ProductSearch';
import ProductList from '@/components/ProductList';
import { toast } from "@/hooks/use-toast";

export default function ProductsPage() {
    const router = useRouter();
    const { user } = useSelector((state) => state.user);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }
        fetchProducts();
    }, [user]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const data = await getAllProducts();
            setProducts(data?.products || []);
            setError(null);
        } catch (err) {
            setError('Failed to fetch products');
            console.log('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        await deleteProduct(id);
        toast({
            title: (
                <span className="text-red-500 dark:text-red-300">
                    Product deleted
                </span>
            ),
            description: (
                <span className="text-red-500 dark:text-red-300">
                    Product has been deleted successfully
                </span>
            ),
        });

        fetchProducts();
    };

    const handleEdit = (id) => {
        router.push(`/products/edit/${id}`);
    };

    const handleToggleFavorite = async (id) => {
        await toggleFavorite(id);
        toast({
            title: (
                <span className="text-green-500 dark:text-green-300">
                    Product favorite toggled
                </span>
            ),
            description: (
                <span className="text-green-500 dark:text-green-300">
                    "Product has been favorited or unfavorited"
                </span>
            )
        });
        fetchProducts();
    };

    const filteredProducts = (products || []).filter(product => {
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
                    <h2 className="text-2xl font-bold mb-2">Error Loading Products</h2>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
                    <Button
                        onClick={fetchProducts}
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
                    <h1 className="text-[28px] font-bold tracking-tight text-dark dark:text-white">PRODUCTS</h1>
                </div>

                <div className="flex justify-between items-center gap-4">
                    <div className="flex-1 max-w-2xl">
                        <ProductSearch
                            searchTerm={searchTerm}
                            onSearchChange={(e) => setSearchTerm(e.target.value)}
                            loading={loading}
                        />
                    </div>

                    <div className="flex items-center gap-3">
                        <Button
                            className="bg-blue hover:bg-blue/90 text-white h-12 px-8 rounded-2xl"
                            disabled={loading}
                            onClick={() => router.push('/products/newproduct')}
                        >
                            New Product
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="border-blue w-12 h-12 rounded-xl"
                            disabled={loading}
                            onClick={() => router.push('/products/favourites')}
                        >
                            <svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.6381 5.02031L11.1491 10.0644L5.58032 10.8738L9.60923 14.8025L8.65737 20.3476L13.6381 17.7293L18.6189 20.3449L17.667 14.7999L21.6959 10.8738L16.1272 10.0644L13.6381 5.02031Z" fill="#001EB9" />
                                <path d="M24.0823 9.30234L17.3876 8.32939L14.395 2.2623C14.3132 2.09619 14.1788 1.96171 14.0126 1.87997C13.596 1.67431 13.0898 1.8457 12.8815 2.2623L9.88881 8.32939L3.19418 9.30234C3.00961 9.3287 2.84086 9.41572 2.71166 9.54755C2.55547 9.70809 2.4694 9.92408 2.47236 10.148C2.47533 10.372 2.56709 10.5856 2.72748 10.742L7.57114 15.4643L6.4268 22.1326C6.39996 22.2877 6.41713 22.4473 6.47635 22.5931C6.53557 22.739 6.63447 22.8653 6.76184 22.9578C6.88922 23.0503 7.03996 23.1053 7.19698 23.1165C7.35401 23.1277 7.51103 23.0947 7.65024 23.0212L13.6382 19.8729L19.6262 23.0212C19.7897 23.1082 19.9795 23.1372 20.1615 23.1056C20.6203 23.0265 20.9288 22.5914 20.8497 22.1326L19.7053 15.4643L24.549 10.742C24.6808 10.6128 24.7678 10.444 24.7942 10.2595C24.8654 9.79804 24.5437 9.37089 24.0823 9.30234ZM17.6671 14.7999L18.619 20.3449L13.6382 17.7293L8.65746 20.3476L9.60932 14.8025L5.58041 10.8738L11.1492 10.0643L13.6382 5.02031L16.1273 10.0643L21.696 10.8738L17.6671 14.7999Z" fill="#001EB9" />
                            </svg>
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
                        {filteredProducts.length} results found for '{searchTerm}'
                    </div>
                    <ProductList products={filteredProducts} />
                </>
            ) : (
                <ProductTable
                    products={products}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                    onToggleFavorite={handleToggleFavorite}
                />
            )}
        </div>
    );
}