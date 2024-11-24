import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import DeleteConfirmationDialog from "@/components/DeleteConfirmationDialog";

const ProductTable = ({ products, onDelete, onEdit, onToggleFavorite, showFavoriteToggle = true }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow key="header" className="hover:bg-transparent">
                    <TableHead className="text-blue font-bold">SKU</TableHead>
                    <TableHead className="text-blue font-bold">IMAGE</TableHead>
                    <TableHead className="text-blue font-bold">PRODUCT NAME</TableHead>
                    <TableHead className="text-blue font-bold">PRICE</TableHead>
                    <TableHead className="text-right text-blue font-bold">ACTIONS</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((product) => (
                    <TableRow
                        key={product._id}
                        className="border-gray-500/50 dark:border-gray-500/20 hover:bg-gray-50/50 dark:hover:bg-gray-500/5"
                    >
                        <TableCell className="text-gray-500 py-4">{product.sku}</TableCell>
                        <TableCell className="py-4">
                            <img
                                src={product.images && product.images.length > 0 ? `${process.env.API_URL}${product.images.filter(image => image.isPrimary === true)[0]?.imageUrl}` : '/placeholder.png'}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-xl bg-gray-50"
                            />
                        </TableCell>
                        <TableCell className="text-dark dark:text-white py-4">{product.name}</TableCell>
                        <TableCell className="text-dark dark:text-white py-4">${product.price}</TableCell>
                        <TableCell className="text-right py-4">
                            <div className="flex justify-end gap-2">
                                <DeleteConfirmationDialog
                                    onConfirm={() => onDelete(product._id)}
                                    trigger={
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="hover:bg-transparent"
                                        >
                                            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M21.0938 6.25H17.9688V4.29688C17.9688 3.43506 17.2681 2.73438 16.4062 2.73438H8.59375C7.73193 2.73438 7.03125 3.43506 7.03125 4.29688V6.25H3.90625C3.47412 6.25 3.125 6.59912 3.125 7.03125V7.8125C3.125 7.91992 3.21289 8.00781 3.32031 8.00781H4.79492L5.39795 20.7764C5.43701 21.6089 6.12549 22.2656 6.95801 22.2656H18.042C18.877 22.2656 19.563 21.6113 19.6021 20.7764L20.2051 8.00781H21.6797C21.7871 8.00781 21.875 7.91992 21.875 7.8125V7.03125C21.875 6.59912 21.5259 6.25 21.0938 6.25ZM16.2109 6.25H8.78906V4.49219H16.2109V6.25Z" fill="#001EB9" />
                                            </svg>
                                        </Button>
                                    }
                                />
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="hover:bg-transparent"
                                    onClick={() => onEdit(product._id)}
                                >
                                    <svg width="27" height="27" viewBox="0 0 27 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M3.375 19.4063V23.625H7.59375L20.0362 11.1825L15.8175 6.96378L3.375 19.4063ZM23.2987 7.92003C23.403 7.81596 23.4858 7.69233 23.5422 7.55624C23.5987 7.42014 23.6277 7.27425 23.6277 7.12691C23.6277 6.97957 23.5987 6.83368 23.5422 6.69758C23.4858 6.56149 23.403 6.43786 23.2987 6.33378L20.6663 3.70128C20.5622 3.59699 20.4385 3.51425 20.3025 3.4578C20.1664 3.40134 20.0205 3.37228 19.8731 3.37228C19.7258 3.37228 19.5799 3.40134 19.4438 3.4578C19.3077 3.51425 19.1841 3.59699 19.08 3.70128L17.0212 5.76003L21.24 9.97878L23.2987 7.92003Z" fill="#001EB9" />
                                    </svg>
                                </Button>
                                {showFavoriteToggle && (
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="hover:bg-transparent"
                                        onClick={() => onToggleFavorite(product._id)}
                                    >
                                        <Star
                                            className={`w-4 h-4 ${product.favourite ? 'fill-blue text-blue' : 'text-blue'}`}
                                        />
                                    </Button>
                                )}
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
                {products.length === 0 && (
                    <TableRow>
                        <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                            No products found
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default ProductTable;