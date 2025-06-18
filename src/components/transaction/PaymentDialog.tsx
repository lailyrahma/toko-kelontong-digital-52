
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
  const canProcessPayment = () => {
    if (paymentMethod === 'cash') {
      const paid = parseFloat(amountPaid) || 0;
      return paid >= totalAmount;
    }
    return true; // For QRIS and debit, we assume payment can be processed
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-[95vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">Pembayaran</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 pb-4">
          <div className="text-center bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600 mb-1">Total Pembayaran</p>
            <p className="text-2xl font-bold text-blue-900">
              Rp {totalAmount.toLocaleString('id-ID')}
            </p>
          </div>
          
          <div>
            <label className="text-sm font-medium mb-3 block">Pilih Metode Pembayaran</label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                onClick={() => onPaymentMethodChange('cash')}
                className="flex flex-col h-20 text-xs"
              >
                <Banknote className="h-6 w-6 mb-1" />
                Tunai
              </Button>
              <Button
                variant={paymentMethod === 'qris' ? 'default' : 'outline'}
                onClick={() => onPaymentMethodChange('qris')}
                className="flex flex-col h-20 text-xs"
              >
                <Smartphone className="h-6 w-6 mb-1" />
                QRIS
              </Button>
              <Button
                variant={paymentMethod === 'debit' ? 'default' : 'outline'}
                onClick={() => onPaymentMethodChange('debit')}
                className="flex flex-col h-20 text-xs"
              >
                <CreditCard className="h-6 w-6 mb-1" />
                Debit
              </Button>
            </div>
          </div>

          {paymentMethod === 'cash' && (
            <div>
              <label className="text-sm font-medium mb-2 block">Jumlah Dibayar</label>
              <Input
                type="number"
                placeholder="Masukkan jumlah pembayaran"
                value={amountPaid}
                onChange={(e) => onAmountPaidChange(e.target.value)}
                className="text-lg h-12"
              />
              {amountPaid && parseFloat(amountPaid) >= totalAmount && (
                <div className="bg-green-50 p-3 rounded-lg mt-3">
                  <p className="text-sm font-medium text-green-800">
                    Kembalian: Rp {(parseFloat(amountPaid) - totalAmount).toLocaleString('id-ID')}
                  </p>
                </div>
              )}
              {amountPaid && parseFloat(amountPaid) < totalAmount && (
                <div className="bg-red-50 p-3 rounded-lg mt-3">
                  <p className="text-sm font-medium text-red-800">
                    Pembayaran kurang Rp {(totalAmount - parseFloat(amountPaid)).toLocaleString('id-ID')}
                  </p>
                </div>
              )}
            </div>
          )}

          {paymentMethod === 'qris' && (
            <div className="text-center bg-gray-50 p-6 rounded-lg">
              <Smartphone className="h-12 w-12 mx-auto mb-3 text-blue-600" />
              <p className="text-sm text-gray-600">
                Silakan scan QR Code dengan aplikasi pembayaran Anda
              </p>
            </div>
          )}

          {paymentMethod === 'debit' && (
            <div className="text-center bg-gray-50 p-6 rounded-lg">
              <CreditCard className="h-12 w-12 mx-auto mb-3 text-blue-600" />
              <p className="text-sm text-gray-600">
                Silakan masukkan kartu debit dan ikuti instruksi pada mesin EDC
              </p>
            </div>
          )}

          <div className="pt-4 border-t">
            <Button 
              onClick={onProcessPayment} 
              className="w-full h-14 text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!canProcessPayment()}
            >
              {paymentMethod === 'cash' ? 'Proses Pembayaran Tunai' : 
               paymentMethod === 'qris' ? 'Konfirmasi Pembayaran QRIS' : 
               'Proses Pembayaran Debit'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="w-full h-12 mt-3 text-gray-600"
            >
              Batal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
