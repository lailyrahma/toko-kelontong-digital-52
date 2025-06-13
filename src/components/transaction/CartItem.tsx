
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
      <CardContent className="p-4">
        <h4 className="font-medium mb-2">{item.name}</h4>
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-bold">
            Rp {item.price.toLocaleString('id-ID')}
          </span>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              disabled={item.quantity >= item.stock}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">
            Subtotal: Rp {(item.price * item.quantity).toLocaleString('id-ID')}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(item.id)}
          >
            <Trash2 className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;
