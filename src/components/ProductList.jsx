import { ChevronRight } from "lucide-react";
import { useRouter } from "next/navigation";

const ProductList = ({ products }) => {
    const router = useRouter();
    return (
        <div className="space-y-6">
            {products.map((product) => (
                <div
                    key={product._id}
                    className="border border-gray-100/50 dark:border-gray-500/20 rounded-2xl p-6 hover:bg-gray-50/50 dark:hover:bg-gray-500/5 transition-colors cursor-pointer"
                    onClick={() => router.push(`/products/edit/${product._id}`)}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                            <img
                                src={product.images && product.images.length > 0 ? `${process.env.API_URL}${product.images.filter(image => image.isPrimary === true)[0].imageUrl}` : '/placeholder.png'}
                                alt={product.name}
                                className="w-16 h-16 object-cover rounded-xl bg-gray-50"
                            />
                            <div>
                                <div className="text-blue text-sm mb-2">#{product.sku}</div>
                                <h3 className="text-dark dark:text-white font-medium mb-2">{product.name}</h3>
                                <p className="text-gray-500 text-sm line-clamp-1">
                                    {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit."}
                                </p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-blue dark:text-white" />
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductList;