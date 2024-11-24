import { useState } from 'react';
import { toast } from "@/hooks/use-toast";

export const useProductForm = (initialData = {}) => {
    const [formData, setFormData] = useState({
        name: initialData.name || '',
        sku: initialData.sku || '',
        quantity: initialData.quantity || '',
        description: initialData.description || '',
        price: initialData.price || ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const validateForm = () => {
        if (!formData.name.trim()) {
            toast({
                title: (
                    <span className="text-red-500 dark:text-red-300">
                        Error
                    </span>
                ),
                description: (
                    <span className="text-red-500 dark:text-red-300">
                        Product name is required
                    </span>
                ),
                variant: "destructive",
            });
            return false;
        }
        if (!formData.sku.trim()) {
            toast({
                title: (
                    <span className="text-red-500 dark:text-red-300">
                        Error
                    </span>
                ),
                description: (
                    <span className="text-red-500 dark:text-red-300">
                        SKU is required
                    </span>
                ),
                variant: "destructive",
            });
            return false;
        }
        if (!formData.quantity || formData.quantity < 0) {
            toast({
                title: (
                    <span className="text-red-500 dark:text-red-300">
                        Error
                    </span>
                ),
                description: (
                    <span className="text-red-500 dark:text-red-300">
                        Valid quantity is required
                    </span>
                ),
                variant: "destructive",
            });
            return false;
        }
        return true;
    };

    return {
        formData,
        setFormData,
        handleChange,
        validateForm
    };
};