
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, ShoppingCart } from 'lucide-react';

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
  customerName?: string;
}

interface AnalyticsTransactionHistoryProps {
  dateRange: string;
  selectedDate: Date | undefined;
}

const AnalyticsTransactionHistory = ({ dateRange, selectedDate }: AnalyticsTransactionHistoryProps) => {
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Sample transaction data for analytics
  const transactions: Transaction[] = [
    {
      id: 'TRX-001',
      date: '2025-01-16',
      time: '09:30',
      items: [
        { id: '1', productName: 'Beras Premium 5kg', quantity: 2, price: 75000, subtotal: 150000 },
        { id: '2', productName: 'Minyak Goreng 1L', quantity: 1, price: 18000, subtotal: 18000 }
      ],
      total: 168000,
      paymentMethod: 'cash',
      status: 'completed',
      customerName: 'Ahmad'
    },
    {
      id: 'TRX-002',
      date: '2025-01-16',
      time: '10:15',
      items: [
        { id: '4', productName: 'Indomie Goreng', quantity: 5, price: 3500, subtotal: 17500 },
        { id: '5', productName: 'Teh Botol Sosro', quantity: 3, price: 4000, subtotal: 12000 }
      ],
      total: 29500,
      paymentMethod: 'qris',
      status: 'completed'
    },
    {
      id: 'TRX-003',
      date: '2025-01-15',
      time: '14:20',
      items: [
        { id: '3', productName: 'Gula Pasir 1kg', quantity: 3, price: 14000, subtotal: 42000 },
        { id: '6', productName: 'Sabun Mandi Lifebuoy', quantity: 2, price: 8500, subtotal: 17000 }
      ],
      total: 59000,
      paymentMethod: 'debit',
      status: 'completed',
      customerName: 'Siti'
    },
    {
      id: 'TRX-004',
      date: '2025-01-15',
      time: '16:45',
      items: [
        { id: '1', productName: 'Beras Premium 5kg', quantity: 1, price: 75000, subtotal: 75000 }
      ],
      total: 75000,
      paymentMethod: 'cash',
      status: 'completed'
    },
    {
      id: 'TRX-005',
      date: '2025-01-14',
      time: '11:30',
      items: [
        { id: '4', productName: 'Indomie Goreng', quantity: 10, price: 3500, subtotal: 35000 },
        { id: '5', productName: 'Teh Botol Sosro', quantity: 5, price: 4000, subtotal: 20000 },
        { id: '2', productName: 'Minyak Goreng 1L', quantity: 1, price: 18000, subtotal: 18000 }
      ],
      total: 73000,
      paymentMethod: 'qris',
      status: 'completed',
      customerName: 'Budi'
    }
  ];

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

  const filteredTransactions = useMemo(() => {
    const now = new Date();
    
    switch (dateRange) {
      case 'today':
        return transactions.filter(t => t.date === '2025-01-16');
      case 'yesterday':
        return transactions.filter(t => t.date === '2025-01-15');
      case 'week':
        return transactions.filter(t => ['2025-01-16', '2025-01-15', '2025-01-14'].includes(t.date));
      case 'month':
        return transactions.filter(t => t.date.startsWith('2025-01'));
      case 'year':
        return transactions.filter(t => t.date.startsWith('2025'));
      case 'custom':
        if (selectedDate) {
          const dateStr = selectedDate.toISOString().split('T')[0];
          return transactions.filter(t => t.date === dateStr);
        }
        return transactions;
      default:
        return transactions;
    }
  }, [dateRange, selectedDate]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="text-base md:text-xl">Riwayat Transaksi</CardTitle>
          <CardDescription className="text-xs md:text-sm">
            Daftar transaksi untuk periode yang dipilih ({filteredTransactions.length} transaksi)
          </CardDescription>
        </CardHeader>
        <CardContent className="p-3 md:p-6">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Tidak ada transaksi pada periode ini</p>
            </div>
          ) : (
            <>
              {/* Mobile View - Card Layout */}
              <div className="md:hidden space-y-3">
                {filteredTransactions.map((transaction) => (
                  <Card key={transaction.id} className="border-l-4 border-l-primary">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-medium text-sm">{transaction.id}</p>
                          <p className="text-xs text-muted-foreground">
                            {transaction.date} • {transaction.time}
                          </p>
                          {transaction.customerName && (
                            <p className="text-xs text-muted-foreground">
                              {transaction.customerName}
                            </p>
                          )}
                        </div>
                        <Badge variant={getStatusColor(transaction.status)}>
                          {transaction.status === 'completed' ? 'Selesai' : 
                           transaction.status === 'pending' ? 'Pending' : 'Dibatalkan'}
                        </Badge>
                      </div>
                      
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center space-x-2">
                          <span>{getPaymentMethodIcon(transaction.paymentMethod)}</span>
                          <span className="text-xs">
                            {transaction.paymentMethod === 'cash' ? 'Tunai' : 
                             transaction.paymentMethod === 'qris' ? 'QRIS' : 'Kartu Debit'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {transaction.items.length} item
                          </span>
                        </div>
                        <p className="font-bold text-sm">
                          Rp {transaction.total.toLocaleString('id-ID')}
                        </p>
                      </div>
                      
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSelectedTransaction(transaction)}
                        className="w-full text-xs"
                      >
                        <Eye className="h-3 w-3 mr-1" />
                        Lihat Detail
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Desktop View - Table Layout */}
              <div className="hidden md:block overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="text-xs">ID Transaksi</TableHead>
                      <TableHead className="text-xs">Tanggal</TableHead>
                      <TableHead className="text-xs">Pelanggan</TableHead>
                      <TableHead className="text-xs">Items</TableHead>
                      <TableHead className="text-xs">Pembayaran</TableHead>
                      <TableHead className="text-xs">Total</TableHead>
                      <TableHead className="text-xs">Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium text-xs">{transaction.id}</TableCell>
                        <TableCell className="text-xs">
                          <div>
                            <div className="font-medium">{transaction.date}</div>
                            <div className="text-muted-foreground">{transaction.time}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-xs">{transaction.customerName || '-'}</TableCell>
                        <TableCell className="text-xs">{transaction.items.length} item</TableCell>
                        <TableCell className="text-xs">
                          <div className="flex items-center space-x-1">
                            <span>{getPaymentMethodIcon(transaction.paymentMethod)}</span>
                            <span>
                              {transaction.paymentMethod === 'cash' ? 'Tunai' : 
                               transaction.paymentMethod === 'qris' ? 'QRIS' : 'Kartu Debit'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-bold text-xs">
                          Rp {transaction.total.toLocaleString('id-ID')}
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedTransaction(transaction)}
                            className="text-xs"
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Transaction Detail Dialog */}
      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-base">Detail Transaksi {selectedTransaction?.id}</DialogTitle>
            <DialogDescription className="text-xs">
              {selectedTransaction?.date} • {selectedTransaction?.time}
              {selectedTransaction?.customerName && ` • ${selectedTransaction.customerName}`}
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">Item yang dibeli:</h4>
                {selectedTransaction.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-xs truncate">{item.productName}</p>
                      <p className="text-xs text-muted-foreground">
                        {item.quantity} x Rp {item.price.toLocaleString('id-ID')}
                      </p>
                    </div>
                    <span className="font-medium text-xs ml-2">
                      Rp {item.subtotal.toLocaleString('id-ID')}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span>Metode Pembayaran:</span>
                  <span className="flex items-center space-x-1">
                    <span>{getPaymentMethodIcon(selectedTransaction.paymentMethod)}</span>
                    <span>
                      {selectedTransaction.paymentMethod === 'cash' ? 'Tunai' : 
                       selectedTransaction.paymentMethod === 'qris' ? 'QRIS' : 'Kartu Debit'}
                    </span>
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span>Status:</span>
                  <Badge variant={getStatusColor(selectedTransaction.status)}>
                    {selectedTransaction.status === 'completed' ? 'Selesai' : 
                     selectedTransaction.status === 'pending' ? 'Pending' : 'Dibatalkan'}
                  </Badge>
                </div>
                <div className="flex justify-between items-center font-bold text-sm border-t pt-2">
                  <span>Total:</span>
                  <span>Rp {selectedTransaction.total.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AnalyticsTransactionHistory;
