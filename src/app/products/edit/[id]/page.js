'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft } from "lucide-react";
import { getProductById, updateProduct } from '@/utils/helper';
import { toast } from "@/hooks/use-toast";
import ProductForm from '@/components/products/ProductForm';
import ImageUploader from '@/components/products/ImageUploader';
import { useProductForm } from '@/utils/hooks/useProductForm';
import { useProductImages } from '@/utils/hooks/useProductImages';

export default function EditProductPage() {
    const { id } = useParams();
    const router = useRouter();
    const { user } = useSelector((state) => state.user);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);

    const {
        formData,
        setFormData,
        handleChange,
        validateForm
    } = useProductForm();

    const {
        selectedImages,
        newImages,
        imagesToDelete,
        primaryImageIndex,
        handleImageUpload,
        handleImageDelete,
        handlePrimarySelect,
        setSelectedImages,
        setPrimaryImageIndex
    } = useProductImages();

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }
        fetchProduct();
    }, [id, user]);

    const fetchProduct = async () => {
        try {
            const data = await getProductById(id);
            if (!data) {
                setError('Product not found');
                return;
            }

            setFormData({
                name: data.product.name || '',
                sku: data.product.sku || '',
                quantity: data.product.quantity || '',
                description: data.product.description || '',
                price: data.product.price || ''
            });

            setSelectedImages(data.product.images || []);
            const primaryIndex = data.product.images?.findIndex(img => img.isPrimary) ?? null;
            setPrimaryImageIndex(primaryIndex);
            setError(null);
        } catch (err) {
            setError('Failed to fetch product');
            console.error('Error fetching product:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        if (!validateForm()) return;
        if (primaryImageIndex === null) {
            toast({
                title: (
                    <span className="text-red-500 dark:text-red-300">
                        Error
                    </span>
                ),
                description: (
                    <span className="text-red-500 dark:text-red-300">
                        Please select a primary image
                    </span>
                ),
                variant: "destructive",
            });
            return;
        }

        setSaving(true);
        try {
            const formDataToSend = new FormData();

            // Append form fields
            Object.keys(formData).forEach(key => {
                formDataToSend.append(key, formData[key]);
            });

            formDataToSend.append('primaryImageIndex', primaryImageIndex);

            console.log(imagesToDelete);

            formDataToSend.append('imagesToDelete', JSON.stringify(imagesToDelete));

            // Append new images if any
            newImages.forEach((image, index) => {
                formDataToSend.append('images', image.file);
            });

            await updateProduct(id, formDataToSend);
            toast({
                title: (
                    <span className="text-green-500 dark:text-green-300">
                        Success
                    </span>
                ),
                description: (
                    <span className="text-green-500 dark:text-green-300">
                        Product updated successfully
                    </span>
                ),
            });
            router.push('/products');
        } catch (error) {
            setError('Failed to update product');
            console.error('Error updating product:', error);
            toast({
                title: (
                    <span className="text-red-500 dark:text-red-300">
                        Error
                    </span>
                ),
                description: (
                    <span className="text-red-500 dark:text-red-300">
                        Failed to update product
                    </span>
                ),
                variant: "destructive",
            });
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 animate-spin text-blue" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Error Loading Product</h2>
                    <p className="text-gray-500 mb-4">{error}</p>
                    <Button
                        onClick={fetchProduct}
                        className="bg-blue hover:bg-blue/90 text-white rounded-2xl"
                    >
                        Try Again
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-8 max-w-6xl mx-auto bg-white">
            <div className="mb-8">
                <Button
                    variant="ghost"
                    className="mb-4 text-blue hover:text-blue/90 pl-0"
                    onClick={() => router.push('/products')}
                >
                    <ChevronLeft className="w-4 h-4 mr-2" />
                    Back to Products
                </Button>
                <div className="flex items-center gap-3">
                    <h1 className="text-[28px] font-bold text-dark">PRODUCTS</h1>
                    <span className="text-blue text-lg">Edit product</span>
                </div>
            </div>

            <div className="space-y-8">
                <ProductForm
                    formData={formData}
                    onChange={handleChange}
                    disabled={saving}
                />

                <ImageUploader
                    selectedImages={selectedImages}
                    newImages={newImages}
                    primaryImageIndex={primaryImageIndex}
                    onImageUpload={handleImageUpload}
                    onImageDelete={handleImageDelete}
                    onPrimarySelect={handlePrimarySelect}
                />

                <div className="flex justify-end gap-4 mt-8">
                    <Button
                        variant="outline"
                        className="h-12 px-6 rounded-2xl"
                        onClick={() => router.push('/products')}
                        disabled={saving}
                    >
                        Cancel
                    </Button>
                    <Button
                        className="bg-blue hover:bg-blue/90 text-white h-12 px-8 rounded-2xl"
                        onClick={handleSave}
                        disabled={saving || primaryImageIndex === null}
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Saving...
                            </>
                        ) : (
                            'Save changes'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}