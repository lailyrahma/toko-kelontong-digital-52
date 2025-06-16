
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Eye, Calendar, CreditCard } from 'lucide-react';

interface TransactionItem {
  id: string;
  productName: string;
  quantity: number;
  price: number;
  subtotal: number;
}

interface Transaction {
  id: string;
  date: string;
  time: string;
  items: TransactionItem[];
  total: number;
  paymentMethod: 'cash' | 'qris' | 'debit';
  status: 'completed' | 'pending' | 'cancelled';
}

interface TransactionHistoryProps {
  transactions: Transaction[];
  onViewTransaction: (transaction: Transaction) => void;
}

const TransactionHistory = ({ transactions, onViewTransaction }: TransactionHistoryProps) => {
  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'qris': return '📱';
      case 'debit': return '💳';
      default: return '💵';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'pending': return 'secondary';
      case 'cancelled': return 'destructive';
      default: return 'default';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Calendar className="h-5 w-5" />
          <span>Riwayat Transaksi</span>
        </CardTitle>
        <CardDescription>Daftar semua transaksi yang telah dilakukan</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium">{transaction.id}</span>
                  <Badge variant={getStatusColor(transaction.status)}>
                    {transaction.status === 'completed' ? 'Selesai' : 
                     transaction.status === 'pending' ? 'Pending' : 'Dibatalkan'}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {transaction.date} • {transaction.time} • {transaction.items.length} item
                </p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-sm">
                    {getPaymentMethodIcon(transaction.paymentMethod)} 
                    {transaction.paymentMethod === 'cash' ? 'Tunai' : 
                     transaction.paymentMethod === 'qris' ? 'QRIS' : 'Kartu Debit'}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg">Rp {transaction.total.toLocaleString('id-ID')}</p>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" onClick={() => onViewTransaction(transaction)}>
                      <Eye className="h-4 w-4 mr-1" />
                      Detail
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Detail Transaksi {transaction.id}</DialogTitle>
                      <DialogDescription>
                        {transaction.date} • {transaction.time}
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <h4 className="font-medium">Item yang dibeli:</h4>
                        {transaction.items.map((item) => (
                          <div key={item.id} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <div>
                              <p className="font-medium text-sm">{item.productName}</p>
                              <p className="text-xs text-muted-foreground">
                                {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                              </p>
                            </div>
                            <span className="font-medium">
                              Rp {item.subtotal.toLocaleString('id-ID')}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span>Metode Pembayaran:</span>
                          <span className="flex items-center space-x-1">
                            <span>{getPaymentMethodIcon(transaction.paymentMethod)}</span>
                            <span>
                              {transaction.paymentMethod === 'cash' ? 'Tunai' : 
                               transaction.paymentMethod === 'qris' ? 'QRIS' : 'Kartu Debit'}
                            </span>
                          </span>
                        </div>
                        <div className="flex justify-between items-center font-bold text-lg">
                          <span>Total:</span>
                          <span>Rp {transaction.total.toLocaleString('id-ID')}</span>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionHistory;
