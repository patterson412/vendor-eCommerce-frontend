'use client';

import { Input } from "@/components/ui/input";
import { Upload, Trash2, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB in bytes
const MAX_IMAGES = 3;

export const validateFile = (file) => {
    if (!file.type.startsWith('image/')) {
        toast({
            title: (
                <span className="text-red-500 dark:text-red-300">
                    Invalid File Type
                </span>
            ),
            description: (
                <span className="text-red-500 dark:text-red-300">
                    Please upload only image files
                </span>
            ),
            variant: "destructive",
        });
        return false;
    }

    if (file.size > MAX_FILE_SIZE) {
        toast({
            title: (
                <span className="text-red-500 dark:text-red-300">
                    File Too Large
                </span>
            ),
            description: (
                <span className="text-red-500 dark:text-red-300">
                    Image size should be less than 50MB
                </span>
            ),
            variant: "destructive",
        });
        return false;
    }

    return true;
};

export default function ImageUploader({
    selectedImages,
    newImages,
    primaryImageIndex,
    onImageUpload,
    onImageDelete,
    onPrimarySelect,
}) {
    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        const totalImages = selectedImages.length + newImages.length;

        if (totalImages + files.length > MAX_IMAGES) {
            toast({
                title: (
                    <span className="text-red-500 dark:text-red-300">
                        Error
                    </span>
                ),
                description: (
                    <span className="text-red-500 dark:text-red-300">
                        You can only have up to {MAX_IMAGES} images. You can select {MAX_IMAGES - totalImages} more.
                    </span>
                ),
                variant: "destructive",
            });
            return;
        }

        const validFiles = files.filter(validateFile);

        // If this is the first image being uploaded, automatically set it as primary
        if (totalImages === 0 && validFiles.length > 0) {
            onImageUpload(validFiles);
            onPrimarySelect(0);
        } else {
            onImageUpload(validFiles);
        }
    };

    // Helper function to determine if an image is primary
    const isPrimaryImage = (index, isNewImage) => {
        if (isNewImage) {
            return selectedImages.length + index === primaryImageIndex;
        }
        return index === primaryImageIndex;
    };

    // Helper function to get the absolute index for an image
    const getAbsoluteIndex = (index, isNewImage) => {
        return isNewImage ? selectedImages.length + index : index;
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-2">
                <div>
                    <label className="block text-sm text-dark">Product Images</label>
                    <p className="text-sm text-gray-500">JPEG, PNG</p>
                    <p className="text-sm text-gray-500">(Maximum file size 50MB)</p>
                    <p className="text-sm text-blue mt-1">
                        * Click on an image to set it as primary
                    </p>
                </div>
                {(selectedImages.length + newImages.length) < MAX_IMAGES && (
                    <label className="cursor-pointer">
                        <Input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            multiple
                            onChange={handleImageUpload}
                            onClick={(e) => e.target.value = null}
                        />
                        <div className="flex items-center gap-2 text-blue hover:text-blue/90">
                            <Upload className="w-4 h-4" />
                            Upload Images
                        </div>
                    </label>
                )}
            </div>

            <div className="flex gap-4 mt-4 flex-wrap">
                {selectedImages.length + newImages.length === 0 ? (
                    <div className="text-gray-500 text-center py-8 border-2 border-dashed rounded-lg w-full">
                        No images uploaded yet
                    </div>
                ) : (
                    <>
                        {selectedImages.map((image, index) => (
                            <div
                                key={`existing-${index}`}
                                className={`
                                    relative w-24 h-24 group
                                    ${isPrimaryImage(index, false) ? 'ring-2 ring-blue ring-offset-2' : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'}
                                    rounded-lg transition-all duration-200
                                `}
                            >
                                <img
                                    src={`${process.env.API_URL}${image.imageUrl}`}
                                    alt={`Product image ${index + 1}`}
                                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                                    onClick={() => onPrimarySelect(getAbsoluteIndex(index, false))}
                                />
                                {isPrimaryImage(index, false) && (
                                    <div className="absolute -top-2 -right-2 bg-blue text-white text-xs px-2 py-1 rounded-full">
                                        Primary
                                    </div>
                                )}
                                <button
                                    onClick={() => {
                                        onImageDelete(image._id, index);
                                        // If deleting primary image, select the first available image as primary
                                        if (isPrimaryImage(index, false)) {
                                            const remainingImagesCount = selectedImages.length + newImages.length - 1;
                                            if (remainingImagesCount > 0) {
                                                const nextPrimaryIndex = index === 0 ? 0 : index - 1;
                                                onPrimarySelect(nextPrimaryIndex);
                                            }
                                        }
                                    }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))}

                        {newImages.map((image, index) => (
                            <div
                                key={`new-${index}`}
                                className={`
                                    relative w-24 h-24 group
                                    ${isPrimaryImage(index, true) ? 'ring-2 ring-blue ring-offset-2' : 'hover:ring-2 hover:ring-gray-300 hover:ring-offset-2'}
                                    rounded-lg transition-all duration-200
                                `}
                            >
                                <img
                                    src={image.preview}
                                    alt={`New image ${index + 1}`}
                                    className="w-full h-full object-cover rounded-lg cursor-pointer"
                                    onClick={() => onPrimarySelect(getAbsoluteIndex(index, true))}
                                />
                                {isPrimaryImage(index, true) && (
                                    <div className="absolute -top-2 -right-2 bg-blue text-white text-xs px-2 py-1 rounded-full">
                                        Primary
                                    </div>
                                )}
                                <button
                                    onClick={() => {
                                        onImageDelete(null, index);
                                        // If deleting primary image, select the first available image as primary
                                        if (isPrimaryImage(index, true)) {
                                            const remainingImagesCount = selectedImages.length + newImages.length - 1;
                                            if (remainingImagesCount > 0) {
                                                const nextPrimaryIndex = selectedImages.length > 0 ? 0 : 0;
                                                onPrimarySelect(nextPrimaryIndex);
                                            }
                                        }
                                    }}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        ))}
                    </>
                )}
            </div>
            <div className="mt-2 text-sm text-gray-500">
                {`${selectedImages.length + newImages.length}/${MAX_IMAGES} images used`}
            </div>
        </div>
    );
}