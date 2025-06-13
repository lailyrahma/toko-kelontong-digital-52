
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Printer } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface ReceiptDialogProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalAmount: number;
  paymentMethod: 'cash' | 'qris' | 'debit';
  amountPaid: string;
  onFinishTransaction: () => void;
}

const ReceiptDialog = ({
  isOpen,
  onClose,
  cartItems,
  totalAmount,
  paymentMethod,
  amountPaid,
  onFinishTransaction
}: ReceiptDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Struk Pembayaran</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-center border-b pb-4">
            <h3 className="font-bold">Toko Kelontong Barokah</h3>
            <p className="text-sm text-muted-foreground">
              Jl. Mawar No. 123, Jakarta
            </p>
            <p className="text-sm text-muted-foreground">
              Telp: 021-12345678
            </p>
          </div>
          
          <div className="space-y-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.name} x{item.quantity}</span>
                <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-2 space-y-1">
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>Rp {totalAmount.toLocaleString('id-ID')}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Metode:</span>
              <span className="capitalize">{paymentMethod}</span>
            </div>
            {paymentMethod === 'cash' && amountPaid && (
              <>
                <div className="flex justify-between text-sm">
                  <span>Dibayar:</span>
                  <span>Rp {parseFloat(amountPaid).toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Kembalian:</span>
                  <span>Rp {(parseFloat(amountPaid) - totalAmount).toLocaleString('id-ID')}</span>
                </div>
              </>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" className="flex-1">
              <Printer className="mr-2 h-4 w-4" />
              Cetak
            </Button>
            <Button onClick={onFinishTransaction} className="flex-1">
              Selesai
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReceiptDialog;
