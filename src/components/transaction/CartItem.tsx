
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
    <Card>
      <CardContent className="p-3 md:p-4">
        <h4 className="font-medium mb-2 text-sm md:text-base line-clamp-2">{item.name}</h4>
        <div className="flex items-center justify-between mb-2">
          <span className="text-base md:text-lg font-bold">
            Rp {item.price.toLocaleString('id-ID')}
          </span>
          <div className="flex items-center space-x-1 md:space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              className="h-8 w-8 p-0"
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center text-sm md:text-base">{item.quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              disabled={item.quantity >= item.stock}
              className="h-8 w-8 p-0"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs md:text-sm text-muted-foreground">
            Subtotal: Rp {(item.price * item.quantity).toLocaleString('id-ID')}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(item.id)}
            className="h-8 w-8 p-0"
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;
