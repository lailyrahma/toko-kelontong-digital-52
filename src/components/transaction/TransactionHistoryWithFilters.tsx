
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Eye, Calendar as CalendarIcon, CreditCard } from 'lucide-react';
import { format, subDays, subWeeks, subMonths, subYears, isAfter, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

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

interface TransactionHistoryWithFiltersProps {
  transactions: Transaction[];
  onViewTransaction: (transaction: Transaction) => void;
}

const TransactionHistoryWithFilters = ({ transactions, onViewTransaction }: TransactionHistoryWithFiltersProps) => {
  const [dateRange, setDateRange] = useState('today');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

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
    let filterDate: Date;

    switch (dateRange) {
      case 'today':
        filterDate = now;
        break;
      case 'yesterday':
        filterDate = subDays(now, 1);
        break;
      case 'week':
        filterDate = subWeeks(now, 1);
        break;
      case 'month':
        filterDate = subMonths(now, 1);
        break;
      case 'year':
        filterDate = subYears(now, 1);
        break;
      case 'custom':
        if (!selectedDate) return transactions;
        filterDate = selectedDate;
        break;
      default:
        return transactions;
    }

    return transactions.filter(transaction => {
      const transactionDate = parseISO(transaction.date);
      if (dateRange === 'today' || dateRange === 'yesterday') {
        return format(transactionDate, 'yyyy-MM-dd') === format(filterDate, 'yyyy-MM-dd');
      } else if (dateRange === 'custom') {
        return format(transactionDate, 'yyyy-MM-dd') === format(filterDate, 'yyyy-MM-dd');
      } else {
        return isAfter(transactionDate, filterDate);
      }
    });
  }, [transactions, dateRange, selectedDate]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5" />
          <span>Riwayat Transaksi</span>
        </CardTitle>
        <CardDescription>Filter dan lihat transaksi berdasarkan periode</CardDescription>
        
        {/* Date Range Filter */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="flex-1">
            <label className="text-sm font-medium mb-2 block">Periode</label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hari Ini</SelectItem>
                <SelectItem value="yesterday">Kemarin</SelectItem>
                <SelectItem value="week">7 Hari Terakhir</SelectItem>
                <SelectItem value="month">30 Hari Terakhir</SelectItem>
                <SelectItem value="year">Tahun Ini</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {dateRange === 'custom' && (
            <div>
              <label className="text-sm font-medium mb-2 block">Pilih Tanggal</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, 'PPP', { locale: id }) : 'Pilih tanggal'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Tidak ada transaksi pada periode ini</p>
            </div>
          ) : (
            filteredTransactions.map((transaction) => (
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
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TransactionHistoryWithFilters;
