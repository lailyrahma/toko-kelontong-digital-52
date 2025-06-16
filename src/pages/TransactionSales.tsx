
import React, { useState, useMemo } from 'react';
import AppSidebar from '@/components/AppSidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Eye, Calendar as CalendarIcon, ShoppingCart, TrendingUp, TrendingDown, Filter } from 'lucide-react';
import { format, subDays, subWeeks, subMonths, subYears, isAfter, parseISO, isSameDay } from 'date-fns';
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
  customerName?: string;
}

const TransactionSales = () => {
  const [dateRange, setDateRange] = useState('today');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [sortBy, setSortBy] = useState('newest');
  const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);

  // Sample transactions data
  const [transactions] = useState<Transaction[]>([
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
  ]);

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

  const filteredAndSortedTransactions = useMemo(() => {
    const now = new Date();
    let filterDate: Date;

    // Filter by date range
    let filtered = transactions;

    switch (dateRange) {
      case 'today':
        filterDate = now;
        filtered = transactions.filter(transaction => {
          const transactionDate = parseISO(transaction.date);
          return isSameDay(transactionDate, filterDate);
        });
        break;
      case 'yesterday':
        filterDate = subDays(now, 1);
        filtered = transactions.filter(transaction => {
          const transactionDate = parseISO(transaction.date);
          return isSameDay(transactionDate, filterDate);
        });
        break;
      case 'week':
        filterDate = subWeeks(now, 1);
        filtered = transactions.filter(transaction => {
          const transactionDate = parseISO(transaction.date);
          return isAfter(transactionDate, filterDate);
        });
        break;
      case 'month':
        filterDate = subMonths(now, 1);
        filtered = transactions.filter(transaction => {
          const transactionDate = parseISO(transaction.date);
          return isAfter(transactionDate, filterDate);
        });
        break;
      case 'year':
        filterDate = subYears(now, 1);
        filtered = transactions.filter(transaction => {
          const transactionDate = parseISO(transaction.date);
          return isAfter(transactionDate, filterDate);
        });
        break;
      case 'custom':
        if (selectedDate) {
          filtered = transactions.filter(transaction => {
            const transactionDate = parseISO(transaction.date);
            return isSameDay(transactionDate, selectedDate);
          });
        }
        break;
      default:
        filtered = transactions;
    }

    // Sort transactions
    return filtered.sort((a, b) => {
      const dateA = parseISO(`${a.date}T${a.time}`);
      const dateB = parseISO(`${b.date}T${b.time}`);
      
      switch (sortBy) {
        case 'newest':
          return dateB.getTime() - dateA.getTime();
        case 'oldest':
          return dateA.getTime() - dateB.getTime();
        case 'highest':
          return b.total - a.total;
        case 'lowest':
          return a.total - b.total;
        default:
          return dateB.getTime() - dateA.getTime();
      }
    });
  }, [transactions, dateRange, selectedDate, sortBy]);

  const totalAmount = filteredAndSortedTransactions.reduce((sum, t) => sum + t.total, 0);
  const totalTransactions = filteredAndSortedTransactions.length;
  const averageTransaction = totalTransactions > 0 ? totalAmount / totalTransactions : 0;

  return (
    <>
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-6 border-b bg-white">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold">Transaksi Penjualan</h1>
          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-50">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Transaksi</p>
                    <p className="text-2xl font-bold">{totalTransactions}</p>
                  </div>
                  <ShoppingCart className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Penjualan</p>
                    <p className="text-2xl font-bold">Rp {totalAmount.toLocaleString('id-ID')}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Rata-rata Transaksi</p>
                    <p className="text-2xl font-bold">Rp {averageTransaction.toLocaleString('id-ID')}</p>
                  </div>
                  <TrendingDown className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Filter className="h-5 w-5" />
                <span>Filter Transaksi</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
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

                <div>
                  <label className="text-sm font-medium mb-2 block">Urutkan</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Terbaru</SelectItem>
                      <SelectItem value="oldest">Terlama</SelectItem>
                      <SelectItem value="highest">Tertinggi</SelectItem>
                      <SelectItem value="lowest">Terendah</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <CardTitle>Daftar Transaksi</CardTitle>
              <CardDescription>
                {filteredAndSortedTransactions.length} transaksi ditemukan
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filteredAndSortedTransactions.length === 0 ? (
                <div className="text-center py-8">
                  <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Tidak ada transaksi pada periode ini</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID Transaksi</TableHead>
                      <TableHead>Tanggal & Waktu</TableHead>
                      <TableHead>Pelanggan</TableHead>
                      <TableHead>Items</TableHead>
                      <TableHead>Pembayaran</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Aksi</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAndSortedTransactions.map((transaction) => (
                      <TableRow key={transaction.id} className="hover:bg-gray-50">
                        <TableCell className="font-medium">{transaction.id}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">{transaction.date}</div>
                            <div className="text-sm text-muted-foreground">{transaction.time}</div>
                          </div>
                        </TableCell>
                        <TableCell>{transaction.customerName || '-'}</TableCell>
                        <TableCell>{transaction.items.length} item</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <span>{getPaymentMethodIcon(transaction.paymentMethod)}</span>
                            <span className="text-sm">
                              {transaction.paymentMethod === 'cash' ? 'Tunai' : 
                               transaction.paymentMethod === 'qris' ? 'QRIS' : 'Kartu Debit'}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={getStatusColor(transaction.status)}>
                            {transaction.status === 'completed' ? 'Selesai' : 
                             transaction.status === 'pending' ? 'Pending' : 'Dibatalkan'}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-bold">
                          Rp {transaction.total.toLocaleString('id-ID')}
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => setSelectedTransaction(transaction)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Detail
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </main>

        {/* Transaction Detail Dialog */}
        <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Detail Transaksi {selectedTransaction?.id}</DialogTitle>
              <DialogDescription>
                {selectedTransaction?.date} • {selectedTransaction?.time}
                {selectedTransaction?.customerName && ` • ${selectedTransaction.customerName}`}
              </DialogDescription>
            </DialogHeader>
            {selectedTransaction && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="font-medium">Item yang dibeli:</h4>
                  {selectedTransaction.items.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1">
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
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Metode Pembayaran:</span>
                    <span className="flex items-center space-x-1">
                      <span>{getPaymentMethodIcon(selectedTransaction.paymentMethod)}</span>
                      <span>
                        {selectedTransaction.paymentMethod === 'cash' ? 'Tunai' : 
                         selectedTransaction.paymentMethod === 'qris' ? 'QRIS' : 'Kartu Debit'}
                      </span>
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Status:</span>
                    <Badge variant={getStatusColor(selectedTransaction.status)}>
                      {selectedTransaction.status === 'completed' ? 'Selesai' : 
                       selectedTransaction.status === 'pending' ? 'Pending' : 'Dibatalkan'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center font-bold text-lg border-t pt-2">
                    <span>Total:</span>
                    <span>Rp {selectedTransaction.total.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default TransactionSales;
