import { useState, useEffect } from 'react';
import { toast } from "@/hooks/use-toast";

export const useProductImages = (initialImages = []) => {
    const [selectedImages, setSelectedImages] = useState(initialImages);
    const [newImages, setNewImages] = useState([]);
    const [imagesToDelete, setImagesToDelete] = useState([]);
    const [primaryImageIndex, setPrimaryImageIndex] = useState(null);

    useEffect(() => {
        // Cleanup function for image previews
        return () => {
            newImages.forEach((image, index) => {
                if (image && image.preview) {
                    URL.revokeObjectURL(image.preview);
                }
            });
        };
    }, []);

    const handleImageUpload = (validFiles) => {
        // Create preview URLs for new images
        const newImagePreviews = validFiles.map(file => ({
            file,
            preview: URL.createObjectURL(file)
        }));

        setNewImages(prev => [...prev, ...newImagePreviews]);

        if (validFiles.length > 0) {
            toast({
                title: (
                    <span className="text-green-500 dark:text-green-300">
                        Images Added
                    </span>
                ),
                description: (
                    <span className="text-green-500 dark:text-green-300">
                        Successfully added {validFiles.length} image{validFiles.length > 1 ? 's' : ''}
                    </span>
                ),
            });
        }
    };

    const handleImageDelete = (imageId, index) => {
        if (imageId) {
            setImagesToDelete(prev => [...prev, imageId]);
            setSelectedImages(prev => prev.filter((_, i) => i !== index));
            if (primaryImageIndex === index) {
                setPrimaryImageIndex(null);
            } else if (primaryImageIndex > index) {
                setPrimaryImageIndex(prev => prev - 1);
            }
        } else {
            setNewImages(prev => {
                const imageToDelete = prev[index];
                const newList = prev.filter((_, i) => i !== index);
                if (imageToDelete && imageToDelete.preview) {
                    URL.revokeObjectURL(imageToDelete.preview);
                }
                return newList;
            });
            const totalExistingImages = selectedImages.length;
            if (primaryImageIndex === totalExistingImages + index) {
                setPrimaryImageIndex(null);
            } else if (primaryImageIndex > totalExistingImages + index) {
                setPrimaryImageIndex(prev => prev - 1);
            }
        }

        toast({
            title: (
                <span className="text-green-500 dark:text-green-300">
                    Image Removed
                </span>
            ),
            description: (
                <span className="text-green-500 dark:text-green-300">
                    The image has been removed
                </span>
            ),
        });
    };

    const handlePrimarySelect = (index) => {
        setPrimaryImageIndex(index);
        toast({
            title: (
                <span className="text-green-500 dark:text-green-300">
                    Primary Image Selected
                </span>
            ),
            description: (
                <span className="text-green-500 dark:text-green-300">
                    Image has been set as primary
                </span>
            ),
        });
    };

    return {
        selectedImages,
        setSelectedImages,
        newImages,
        setNewImages,
        imagesToDelete,
        setImagesToDelete,
        primaryImageIndex,
        setPrimaryImageIndex,
        handleImageUpload,
        handleImageDelete,
        handlePrimarySelect
    };
};