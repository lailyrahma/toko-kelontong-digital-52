
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard, Smartphone, Banknote } from 'lucide-react';

interface PaymentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  totalAmount: number;
  paymentMethod: 'cash' | 'qris' | 'debit';
  amountPaid: string;
  onPaymentMethodChange: (method: 'cash' | 'qris' | 'debit') => void;
  onAmountPaidChange: (amount: string) => void;
  onProcessPayment: () => void;
}

const PaymentDialog = ({
  isOpen,
  onClose,
  totalAmount,
  paymentMethod,
  amountPaid,
  onPaymentMethodChange,
  onAmountPaidChange,
  onProcessPayment
}: PaymentDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Pembayaran</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="text-center">
            <p className="text-2xl font-bold">
              Total: Rp {totalAmount.toLocaleString('id-ID')}
            </p>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-2 block">Metode Pembayaran</label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                onClick={() => onPaymentMethodChange('cash')}
                className="flex flex-col h-16"
              >
                <Banknote className="h-5 w-5 mb-1" />
                Tunai
              </Button>
              <Button
                variant={paymentMethod === 'qris' ? 'default' : 'outline'}
                onClick={() => onPaymentMethodChange('qris')}
                className="flex flex-col h-16"
              >
                <Smartphone className="h-5 w-5 mb-1" />
                QRIS
              </Button>
              <Button
                variant={paymentMethod === 'debit' ? 'default' : 'outline'}
                onClick={() => onPaymentMethodChange('debit')}
                className="flex flex-col h-16"
              >
                <CreditCard className="h-5 w-5 mb-1" />
                Debit
              </Button>
            </div>
          </div>

          {paymentMethod === 'cash' && (
            <div>
              <label className="text-sm font-medium mb-2 block">Jumlah Dibayar</label>
              <Input
                type="number"
                placeholder="Masukkan jumlah"
                value={amountPaid}
                onChange={(e) => onAmountPaidChange(e.target.value)}
              />
              {amountPaid && parseFloat(amountPaid) >= totalAmount && (
                <p className="text-sm text-green-600 mt-2">
                  Kembalian: Rp {(parseFloat(amountPaid) - totalAmount).toLocaleString('id-ID')}
                </p>
              )}
            </div>
          )}

          <Button onClick={onProcessPayment} className="w-full">
            Proses Pembayaran
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
