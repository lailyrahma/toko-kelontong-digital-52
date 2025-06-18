
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Trash2 } from 'lucide-react';

interface CartItemData {
  id: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
}

interface CartItemProps {
  item: CartItemData;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  return (
    <Card className="shadow-sm">
      <CardContent className="p-2 sm:p-3 md:p-4">
        <h4 className="font-medium mb-1 sm:mb-2 text-xs sm:text-sm md:text-base line-clamp-2">{item.name}</h4>
        <div className="flex items-center justify-between mb-1 sm:mb-2">
          <span className="text-sm sm:text-base md:text-lg font-bold text-blue-900">
            Rp {item.price.toLocaleString('id-ID')}
          </span>
          <div className="flex items-center space-x-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="h-6 w-6 sm:h-8 sm:w-8 p-0"
            >
              <Minus className="h-2 w-2 sm:h-3 sm:w-3" />
            </Button>
            <span className="w-6 sm:w-8 text-center text-xs sm:text-sm md:text-base font-semibold">{item.quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              disabled={item.quantity >= item.stock}
              className="h-6 w-6 sm:h-8 sm:w-8 p-0"
            >
              <Plus className="h-2 w-2 sm:h-3 sm:w-3" />
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs sm:text-sm text-muted-foreground">
            Subtotal: <span className="font-semibold text-blue-800">Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(item.id)}
            className="h-6 w-6 sm:h-8 sm:w-8 p-0 text-red-500 hover:text-red-700"
          >
            <Trash2 className="h-2 w-2 sm:h-3 sm:w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;
