
import React, { useState } from 'react';
import AppSidebar from '@/components/AppSidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { Calendar as CalendarIcon, TrendingUp, ShoppingCart, Package, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('today');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Sample data
  const salesData = [
    { name: 'Senin', sales: 2400000, transactions: 45 },
    { name: 'Selasa', sales: 1398000, transactions: 32 },
    { name: 'Rabu', sales: 9800000, transactions: 78 },
    { name: 'Kamis', sales: 3908000, transactions: 56 },
    { name: 'Jumat', sales: 4800000, transactions: 67 },
    { name: 'Sabtu', sales: 3800000, transactions: 89 },
    { name: 'Minggu', sales: 4300000, transactions: 73 },
  ];

  const categoryData = [
    { name: 'Sembako', value: 35, sales: 15750000 },
    { name: 'Minuman', value: 25, sales: 11250000 },
    { name: 'Makanan Instan', value: 20, sales: 9000000 },
    { name: 'Kebersihan', value: 15, sales: 6750000 },
    { name: 'Lainnya', value: 5, sales: 2250000 },
  ];

  const topProducts = [
    { name: 'Beras Premium 5kg', sold: 125, revenue: 9375000 },
    { name: 'Minyak Goreng 1L', sold: 89, revenue: 1602000 },
    { name: 'Indomie Goreng', sold: 234, revenue: 819000 },
    { name: 'Teh Botol Sosro', sold: 156, revenue: 624000 },
    { name: 'Sabun Mandi Lifebuoy', sold: 67, revenue: 569500 },
  ];

  const stockMovement = [
    { name: 'Minggu 1', stockIn: 1200, stockOut: 890 },
    { name: 'Minggu 2', stockIn: 800, stockOut: 1100 },
    { name: 'Minggu 3', stockIn: 1500, stockOut: 1200 },
    { name: 'Minggu 4', stockIn: 900, stockOut: 950 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  const stats = [
    {
      title: 'Total Penjualan',
      value: 'Rp 45.2 Juta',
      change: '+12.5%',
      icon: DollarSign,
      description: 'Bulan ini'
    },
    {
      title: 'Total Transaksi',
      value: '1,234',
      change: '+8.2%',
      icon: ShoppingCart,
      description: 'Bulan ini'
    },
    {
      title: 'Produk Terjual',
      value: '8,945',
      change: '+15.3%',
      icon: Package,
      description: 'Unit terjual'
    },
    {
      title: 'Rata-rata per Transaksi',
      value: 'Rp 36,650',
      change: '+4.1%',
      icon: TrendingUp,
      description: 'Per transaksi'
    }
  ];

  return (
    <>
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-6 border-b bg-white">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold">Analytics & Insights</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Hari Ini</SelectItem>
                <SelectItem value="week">Minggu Ini</SelectItem>
                <SelectItem value="month">Bulan Ini</SelectItem>
                <SelectItem value="year">Tahun Ini</SelectItem>
                <SelectItem value="custom">Custom</SelectItem>
              </SelectContent>
            </Select>
            {dateRange === 'custom' && (
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
            )}
          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-50 space-y-6">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                    <span className="text-xs text-green-600 font-medium">
                      {stat.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Sales Chart */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Trend Penjualan</CardTitle>
                <CardDescription>Penjualan harian dalam seminggu terakhir</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={salesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`Rp ${value.toLocaleString('id-ID')}`, 'Penjualan']} />
                    <Bar dataKey="sales" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Distribusi Kategori</CardTitle>
                <CardDescription>Penjualan berdasarkan kategori produk</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Stock Movement */}
            <Card>
              <CardHeader>
                <CardTitle>Pergerakan Stok</CardTitle>
                <CardDescription>Stok masuk vs stok keluar per minggu</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={stockMovement}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="stockIn" stroke="#00C49F" name="Stok Masuk" />
                    <Line type="monotone" dataKey="stockOut" stroke="#FF8042" name="Stok Keluar" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top Products */}
          <Card>
            <CardHeader>
              <CardTitle>Produk Terlaris</CardTitle>
              <CardDescription>5 produk dengan penjualan tertinggi bulan ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">{product.sold} unit terjual</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">Rp {product.revenue.toLocaleString('id-ID')}</p>
                      <p className="text-sm text-muted-foreground">Revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Category Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Performa Kategori</CardTitle>
              <CardDescription>Detail penjualan per kategori</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoryData.map((category, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <div>
                        <p className="font-medium">{category.name}</p>
                        <p className="text-sm text-muted-foreground">{category.value}% dari total penjualan</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">Rp {category.sales.toLocaleString('id-ID')}</p>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-primary h-2 rounded-full transition-all"
                          style={{ width: `${category.value}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </>
  );
};

export default Analytics;
