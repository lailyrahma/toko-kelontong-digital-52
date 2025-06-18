
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
    return true;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md w-[95vw] max-h-[95vh] overflow-y-auto p-4 sm:p-6">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl sm:text-2xl font-bold text-center text-blue-900">
            Pembayaran
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 sm:space-y-6">
          {/* Total Amount Section */}
          <div className="text-center bg-blue-50 p-4 sm:p-6 rounded-lg border-2 border-blue-100">
            <p className="text-sm sm:text-base text-gray-600 mb-2">Total Pembayaran</p>
            <p className="text-2xl sm:text-3xl font-bold text-blue-900">
              Rp {totalAmount.toLocaleString('id-ID')}
            </p>
          </div>
          
          {/* Payment Method Selection */}
          <div>
            <label className="text-sm sm:text-base font-semibold mb-3 block text-gray-800">
              Pilih Metode Pembayaran
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Button
                variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                onClick={() => onPaymentMethodChange('cash')}
                className="flex items-center justify-center h-16 sm:h-20 text-sm sm:text-base font-medium hover:scale-105 transition-transform"
              >
                <Banknote className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                Tunai
              </Button>
              <Button
                variant={paymentMethod === 'qris' ? 'default' : 'outline'}
                onClick={() => onPaymentMethodChange('qris')}
                className="flex items-center justify-center h-16 sm:h-20 text-sm sm:text-base font-medium hover:scale-105 transition-transform"
              >
                <Smartphone className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                QRIS
              </Button>
              <Button
                variant={paymentMethod === 'debit' ? 'default' : 'outline'}
                onClick={() => onPaymentMethodChange('debit')}
                className="flex items-center justify-center h-16 sm:h-20 text-sm sm:text-base font-medium hover:scale-105 transition-transform"
              >
                <CreditCard className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3" />
                Debit
              </Button>
            </div>
          </div>

          {/* Cash Payment Input */}
          {paymentMethod === 'cash' && (
            <div className="space-y-3">
              <label className="text-sm sm:text-base font-semibold block text-gray-800">
                Jumlah Dibayar
              </label>
              <Input
                type="number"
                placeholder="Masukkan jumlah pembayaran"
                value={amountPaid}
                onChange={(e) => onAmountPaidChange(e.target.value)}
                className="text-base sm:text-lg h-12 sm:h-14 text-center font-semibold"
              />
              
              {/* Change/Shortage Display */}
              {amountPaid && parseFloat(amountPaid) >= totalAmount && (
                <div className="bg-green-50 border-2 border-green-200 p-4 rounded-lg">
                  <p className="text-sm sm:text-base font-bold text-green-800 text-center">
                    💰 Kembalian: Rp {(parseFloat(amountPaid) - totalAmount).toLocaleString('id-ID')}
                  </p>
                </div>
              )}
              
              {amountPaid && parseFloat(amountPaid) < totalAmount && (
                <div className="bg-red-50 border-2 border-red-200 p-4 rounded-lg">
                  <p className="text-sm sm:text-base font-bold text-red-800 text-center">
                    ⚠️ Kurang: Rp {(totalAmount - parseFloat(amountPaid)).toLocaleString('id-ID')}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* QRIS Payment Display */}
          {paymentMethod === 'qris' && (
            <div className="text-center bg-gray-50 border-2 border-gray-200 p-6 sm:p-8 rounded-lg">
              <div className="bg-white p-4 rounded-lg mb-4 shadow-sm">
                <Smartphone className="h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-3 text-blue-600" />
              </div>
              <p className="text-sm sm:text-base text-gray-700 font-medium">
                Silakan scan QR Code dengan aplikasi pembayaran Anda
              </p>
              <p className="text-xs sm:text-sm text-gray-500 mt-2">
                (GoPay, OVO, DANA, ShopeePay, dll)
              </p>
            </div>
          )}

          {/* Debit Payment Display */}
          {paymentMethod === 'debit' && (
            <div className="text-center bg-gray-50 border-2 border-gray-200 p-6 sm:p-8 rounded-lg">
              <div className="bg-white p-4 rounded-lg mb-4 shadow-sm">
                <CreditCard className="h-16 w-16 sm:h-20 sm:w-20 mx-auto mb-3 text-blue-600" />
              </div>
              <p className="text-sm sm:text-base text-gray-700 font-medium">
                Silakan masukkan kartu debit dan ikuti instruksi pada mesin EDC
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-3 pt-4 border-t-2 border-gray-100">
            <Button 
              onClick={onProcessPayment} 
              className="w-full h-14 sm:h-16 text-base sm:text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              disabled={!canProcessPayment()}
            >
              {paymentMethod === 'cash' ? '💰 Proses Pembayaran Tunai' : 
               paymentMethod === 'qris' ? '📱 Konfirmasi Pembayaran QRIS' : 
               '💳 Proses Pembayaran Debit'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="w-full h-12 sm:h-14 text-sm sm:text-base font-medium text-gray-600 hover:bg-gray-50 border-2"
            >
              ❌ Batal
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
