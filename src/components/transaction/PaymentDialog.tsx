
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
      <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto p-3 sm:p-6 mx-auto">
        <DialogHeader className="pb-3 sm:pb-4">
          <DialogTitle className="text-lg sm:text-xl md:text-2xl font-bold text-center text-blue-900">
            Pembayaran
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3 sm:space-y-4">
          {/* Total Amount Section */}
          <div className="text-center bg-blue-50 p-3 sm:p-4 md:p-6 rounded-lg border border-blue-200">
            <p className="text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">Total Pembayaran</p>
            <p className="text-lg sm:text-2xl md:text-3xl font-bold text-blue-900">
              Rp {totalAmount.toLocaleString('id-ID')}
            </p>
          </div>
          
          {/* Payment Method Selection */}
          <div>
            <label className="text-sm sm:text-base font-semibold mb-2 sm:mb-3 block text-gray-800">
              Pilih Metode Pembayaran
            </label>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3 sm:gap-3">
              <Button
                variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                onClick={() => onPaymentMethodChange('cash')}
                className="flex items-center justify-center h-12 sm:h-16 md:h-20 text-xs sm:text-sm md:text-base font-medium hover:scale-105 transition-transform"
              >
                <Banknote className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 mr-2" />
                Tunai
              </Button>
              <Button
                variant={paymentMethod === 'qris' ? 'default' : 'outline'}
                onClick={() => onPaymentMethodChange('qris')}
                className="flex items-center justify-center h-12 sm:h-16 md:h-20 text-xs sm:text-sm md:text-base font-medium hover:scale-105 transition-transform"
              >
                <Smartphone className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 mr-2" />
                QRIS
              </Button>
              <Button
                variant={paymentMethod === 'debit' ? 'default' : 'outline'}
                onClick={() => onPaymentMethodChange('debit')}
                className="flex items-center justify-center h-12 sm:h-16 md:h-20 text-xs sm:text-sm md:text-base font-medium hover:scale-105 transition-transform"
              >
                <CreditCard className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 mr-2" />
                Debit
              </Button>
            </div>
          </div>

          {/* Cash Payment Input */}
          {paymentMethod === 'cash' && (
            <div className="space-y-2 sm:space-y-3">
              <label className="text-sm sm:text-base font-semibold block text-gray-800">
                Jumlah Dibayar
              </label>
              <Input
                type="number"
                placeholder="Masukkan jumlah pembayaran"
                value={amountPaid}
                onChange={(e) => onAmountPaidChange(e.target.value)}
                className="text-sm sm:text-base md:text-lg h-10 sm:h-12 md:h-14 text-center font-semibold"
              />
              
              {/* Change/Shortage Display */}
              {amountPaid && parseFloat(amountPaid) >= totalAmount && (
                <div className="bg-green-50 border border-green-200 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm md:text-base font-bold text-green-800 text-center">
                    💰 Kembalian: Rp {(parseFloat(amountPaid) - totalAmount).toLocaleString('id-ID')}
                  </p>
                </div>
              )}
              
              {amountPaid && parseFloat(amountPaid) < totalAmount && (
                <div className="bg-red-50 border border-red-200 p-3 sm:p-4 rounded-lg">
                  <p className="text-xs sm:text-sm md:text-base font-bold text-red-800 text-center">
                    ⚠️ Kurang: Rp {(totalAmount - parseFloat(amountPaid)).toLocaleString('id-ID')}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* QRIS Payment Display */}
          {paymentMethod === 'qris' && (
            <div className="text-center bg-gray-50 border border-gray-200 p-4 sm:p-6 md:p-8 rounded-lg">
              <div className="bg-white p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 shadow-sm">
                <Smartphone className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 mx-auto mb-2 sm:mb-3 text-blue-600" />
              </div>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 font-medium mb-1 sm:mb-2">
                Silakan scan QR Code dengan aplikasi pembayaran Anda
              </p>
              <p className="text-xs text-gray-500">
                (GoPay, OVO, DANA, ShopeePay, dll)
              </p>
            </div>
          )}

          {/* Debit Payment Display */}
          {paymentMethod === 'debit' && (
            <div className="text-center bg-gray-50 border border-gray-200 p-4 sm:p-6 md:p-8 rounded-lg">
              <div className="bg-white p-3 sm:p-4 rounded-lg mb-3 sm:mb-4 shadow-sm">
                <CreditCard className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 mx-auto mb-2 sm:mb-3 text-blue-600" />
              </div>
              <p className="text-xs sm:text-sm md:text-base text-gray-700 font-medium">
                Silakan masukkan kartu debit dan ikuti instruksi pada mesin EDC
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="space-y-2 sm:space-y-3 pt-3 sm:pt-4 border-t border-gray-100">
            <Button 
              onClick={onProcessPayment} 
              className="w-full h-12 sm:h-14 md:h-16 text-sm sm:text-base md:text-lg font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
              disabled={!canProcessPayment()}
            >
              {paymentMethod === 'cash' ? '💰 Proses Pembayaran Tunai' : 
               paymentMethod === 'qris' ? '📱 Konfirmasi Pembayaran QRIS' : 
               '💳 Proses Pembayaran Debit'}
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="w-full h-10 sm:h-12 md:h-14 text-xs sm:text-sm md:text-base font-medium text-gray-600 hover:bg-gray-50 border"
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
