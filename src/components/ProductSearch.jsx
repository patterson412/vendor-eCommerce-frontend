import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const ProductSearch = ({ searchTerm, onSearchChange, loading, placeholder = "Search for products" }) => {
    return (
        <div className="relative">
            <Input
                placeholder={placeholder}
                className="bg-[#F8F8F8] border-0 h-12 pr-32 pl-4 text-base rounded-2xl"
                value={searchTerm}
                onChange={onSearchChange}
                disabled={loading}
            />
            <Button
                className="absolute right-1 top-1 bottom-1 bg-blue hover:bg-blue/90 text-white px-6 rounded-xl"
                disabled={loading}
            >
                <Search className="w-4 h-4 mr-2" />
                Search
            </Button>
        </div>
    );
};

export default ProductSearch;