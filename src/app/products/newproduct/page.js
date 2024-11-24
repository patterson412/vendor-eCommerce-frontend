'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft } from "lucide-react";
import { createProduct } from '@/utils/helper';
import { toast } from "@/hooks/use-toast";
import ProductForm from '@/components/products/ProductForm';
import ImageUploader from '@/components/products/ImageUploader';
import { useProductForm } from '@/utils/hooks/useProductForm';
import { useProductImages } from '@/utils/hooks/useProductImages';

export default function CreateProductPage() {
    const router = useRouter();
    const { user } = useSelector((state) => state.user);
    const [saving, setSaving] = useState(false);

    const {
        formData,
        handleChange,
        validateForm
    } = useProductForm();

    const {
        selectedImages,
        newImages,
        primaryImageIndex,
        handleImageUpload,
        handleImageDelete,
        handlePrimarySelect
    } = useProductImages();

    useEffect(() => {
        if (!user) {
            router.push('/login');
        }
    }, [user]);

    const handleCreate = async () => {
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

        if (newImages.length === 0) {
            toast({
                title: (
                    <span className="text-red-500 dark:text-red-300">
                        Error
                    </span>
                ),
                description: (
                    <span className="text-red-500 dark:text-red-300">
                        Please upload at least one image
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

            // Append images
            newImages.forEach((image, index) => {
                formDataToSend.append('images', image.file);
            });

            await createProduct(formDataToSend);
            toast({
                title: (
                    <span className="text-green-500 dark:text-green-300">
                        Success
                    </span>
                ),
                description: (
                    <span className="text-green-500 dark:text-green-300">
                        Product created successfully
                    </span>
                ),
            });
            router.push('/products');
        } catch (error) {
            console.error('Error creating product:', error);
            toast({
                title: (
                    <span className="text-red-500 dark:text-red-300">
                        Error
                    </span>
                ),
                description: (
                    <span className="text-red-500 dark:text-red-300">
                        Failed to create product
                    </span>
                ),
                variant: "destructive",
            });
        } finally {
            setSaving(false);
        }
    };

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
                    <span className="text-blue text-lg">New product</span>
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
                        onClick={handleCreate}
                        disabled={saving || primaryImageIndex === null}
                    >
                        {saving ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Creating...
                            </>
                        ) : (
                            'Create product'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}