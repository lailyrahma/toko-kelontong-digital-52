
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Package } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  barcode: string;
  image?: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const getStockBadge = (stock: number) => {
    if (stock === 0) return <Badge variant="destructive" className="stock-empty">Habis</Badge>;
    if (stock < 10) return <Badge variant="secondary" className="stock-low">Sedikit</Badge>;
    if (stock <= 50) return <Badge variant="secondary" className="stock-normal">Normal</Badge>;
    return <Badge variant="secondary" className="stock-abundant">Banyak</Badge>;
  };

  return (
    <Card className="cursor-pointer hover:shadow-lg transition-shadow">
      <CardContent className="p-4">
        <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
          <Package className="h-12 w-12 text-muted-foreground" />
        </div>
        <h3 className="font-medium mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
        <div className="flex items-center justify-between mb-2">
          <span className="font-bold text-lg">
            Rp {product.price.toLocaleString('id-ID')}
          </span>
          {getStockBadge(product.stock)}
        </div>
        <p className="text-xs text-muted-foreground mb-3">
          Stok: {product.stock} | Barcode: {product.barcode}
        </p>
        <Button 
          onClick={() => onAddToCart(product)}
          disabled={product.stock === 0}
          className="w-full"
          size="sm"
        >
          <Plus className="mr-2 h-4 w-4" />
          Tambah
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
