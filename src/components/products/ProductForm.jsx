'use client';

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ProductForm({
    formData,
    onChange,
    disabled = false,
}) {
    return (
        <div className="space-y-8">
            <div className="grid grid-cols-2 gap-8">
                <div>
                    <label className="block text-sm text-dark mb-2">SKU</label>
                    <Input
                        name="sku"
                        value={formData.sku}
                        onChange={onChange}
                        placeholder="#CA34"
                        className="h-12 bg-[#F8F8F8] border-0 rounded-lg"
                        disabled={disabled}
                    />
                </div>
                <div>
                    <label className="block text-sm text-dark mb-2">QTY</label>
                    <Input
                        name="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={onChange}
                        placeholder="25"
                        className="h-12 bg-[#F8F8F8] border-0 rounded-lg"
                        disabled={disabled}
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm text-dark mb-2">Name</label>
                <Input
                    name="name"
                    value={formData.name}
                    onChange={onChange}
                    placeholder="Product name"
                    className="h-12 bg-[#F8F8F8] border-0 rounded-lg"
                    disabled={disabled}
                />
            </div>

            <div>
                <label className="block text-sm text-dark mb-2">Product Description</label>
                <p className="text-sm text-gray-500 mb-2">A small description about the product</p>
                <Textarea
                    name="description"
                    value={formData.description}
                    onChange={onChange}
                    placeholder="Enter product description"
                    className="min-h-[100px] bg-[#F8F8F8] border-0 rounded-lg resize-none"
                    disabled={disabled}
                />
            </div>


            <div>
                <label className="block text-sm text-dark mb-2">Price</label>
                <Input
                    name="price"
                    type="number"
                    value={formData.price || ''}
                    onChange={onChange}
                    placeholder="0.00"
                    className="h-12 bg-[#F8F8F8] border-0 rounded-lg"
                    disabled={disabled}
                />
            </div>

        </div>
    );
}