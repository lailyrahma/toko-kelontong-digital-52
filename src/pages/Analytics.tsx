import React, { useState } from 'react';
import AppSidebar from '@/components/AppSidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, ShoppingCart, Package, DollarSign } from 'lucide-react';
import DateRangeFilter from '@/components/analytics/DateRangeFilter';
import AnalyticsTransactionHistory from '@/components/analytics/AnalyticsTransactionHistory';

const Analytics = () => {
  const [dateRange, setDateRange] = useState('today');
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  // Sample data yang berubah berdasarkan filter
  const getSalesData = (range: string) => {
    const baseData = [
      { name: 'Senin', sales: 2400000, transactions: 45 },
      { name: 'Selasa', sales: 1398000, transactions: 32 },
      { name: 'Rabu', sales: 9800000, transactions: 78 },
      { name: 'Kamis', sales: 3908000, transactions: 56 },
      { name: 'Jumat', sales: 4800000, transactions: 67 },
      { name: 'Sabtu', sales: 3800000, transactions: 89 },
      { name: 'Minggu', sales: 4300000, transactions: 73 },
    ];

    switch (range) {
      case 'today':
        return [{ name: 'Hari Ini', sales: 2450000, transactions: 23 }];
      case 'yesterday':
        return [{ name: 'Kemarin', sales: 2100000, transactions: 19 }];
      case 'week':
        return baseData;
      case 'month':
        return [
          { name: 'Minggu 1', sales: 15400000, transactions: 156 },
          { name: 'Minggu 2', sales: 18200000, transactions: 189 },
          { name: 'Minggu 3', sales: 16800000, transactions: 172 },
          { name: 'Minggu 4', sales: 19600000, transactions: 203 },
        ];
      case 'year':
        return [
          { name: 'Jan', sales: 45200000, transactions: 567 },
          { name: 'Feb', sales: 52100000, transactions: 634 },
          { name: 'Mar', sales: 48900000, transactions: 598 },
          { name: 'Apr', sales: 51200000, transactions: 623 },
          { name: 'May', sales: 55800000, transactions: 687 },
          { name: 'Jun', sales: 49300000, transactions: 612 },
        ];
      default:
        return baseData;
    }
  };

  const salesData = getSalesData(dateRange);

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

  const getStatsForPeriod = (period: string) => {
    const baseSales = 45200000;
    const baseTransactions = 1234;
    const baseProducts = 8945;
    const baseAverage = 36650;

    const multipliers: { [key: string]: number } = {
      'today': 0.05,
      'yesterday': 0.045,
      'week': 0.2,
      'month': 1,
      'year': 12,
      'custom': 1
    };

    const multiplier = multipliers[period] || 1;
    
    return [
      {
        title: 'Total Penjualan',
        value: `Rp ${(baseSales * multiplier / 1000000).toFixed(1)} Juta`,
        change: '+12.5%',
        icon: DollarSign,
        description: period === 'today' ? 'Hari ini' : period === 'week' ? 'Minggu ini' : period === 'month' ? 'Bulan ini' : 'Tahun ini'
      },
      {
        title: 'Total Transaksi',
        value: Math.round(baseTransactions * multiplier).toLocaleString(),
        change: '+8.2%',
        icon: ShoppingCart,
        description: period === 'today' ? 'Hari ini' : period === 'week' ? 'Minggu ini' : period === 'month' ? 'Bulan ini' : 'Tahun ini'
      },
      {
        title: 'Produk Terjual',
        value: Math.round(baseProducts * multiplier).toLocaleString(),
        change: '+15.3%',
        icon: Package,
        description: 'Unit terjual'
      },
      {
        title: 'Rata-rata per Transaksi',
        value: `Rp ${baseAverage.toLocaleString()}`,
        change: '+4.1%',
        icon: TrendingUp,
        description: 'Per transaksi'
      }
    ];
  };

  const stats = getStatsForPeriod(dateRange);

  const getPeriodTitle = (period: string) => {
    switch (period) {
      case 'today': return 'Hari Ini';
      case 'yesterday': return 'Kemarin';
      case 'week': return '7 Hari Terakhir';
      case 'month': return '30 Hari Terakhir';
      case 'quarter': return '3 Bulan Terakhir';
      case 'year': return 'Tahun Ini';
      case 'custom': return 'Custom';
      default: return 'Periode Dipilih';
    }
  };

  return (
    <>
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 md:p-6 border-b bg-white">
          <div className="flex items-center space-x-2 md:space-x-4">
            <SidebarTrigger />
            <h1 className="text-xl md:text-2xl font-bold">Analytics & Insights</h1>
          </div>
        </header>

        <main className="flex-1 p-3 md:p-6 bg-gray-50 space-y-4 md:space-y-6">
          {/* Date Range Filter */}
          <DateRangeFilter
            dateRange={dateRange}
            selectedDate={selectedDate}
            onDateRangeChange={setDateRange}
            onDateChange={setSelectedDate}
          />

          {/* Stats Overview - Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="min-w-0">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium truncate">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </CardHeader>
                <CardContent>
                  <div className="text-xl md:text-2xl font-bold truncate">{stat.value}</div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground truncate">
                      {stat.description}
                    </p>
                    <span className="text-xs text-green-600 font-medium flex-shrink-0">
                      {stat.change}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Charts Section - Responsive Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
            {/* Sales Chart */}
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Trend Penjualan - {getPeriodTitle(dateRange)}</CardTitle>
                <CardDescription className="text-sm">
                  Penjualan untuk periode {getPeriodTitle(dateRange).toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        fontSize={12}
                        tick={{ fontSize: 10 }}
                      />
                      <YAxis 
                        fontSize={12}
                        tick={{ fontSize: 10 }}
                      />
                      <Tooltip 
                        formatter={(value) => [`Rp ${value.toLocaleString('id-ID')}`, 'Penjualan']}
                        labelStyle={{ fontSize: '12px' }}
                        contentStyle={{ fontSize: '12px' }}
                      />
                      <Bar dataKey="sales" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Distribusi Kategori</CardTitle>
                <CardDescription className="text-sm">Penjualan berdasarkan kategori produk</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
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
                </div>
              </CardContent>
            </Card>

            {/* Stock Movement */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Pergerakan Stok</CardTitle>
                <CardDescription className="text-sm">Stok masuk vs stok keluar per minggu</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={stockMovement}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        fontSize={12}
                        tick={{ fontSize: 10 }}
                      />
                      <YAxis 
                        fontSize={12}
                        tick={{ fontSize: 10 }}
                      />
                      <Tooltip 
                        labelStyle={{ fontSize: '12px' }}
                        contentStyle={{ fontSize: '12px' }}
                      />
                      <Line type="monotone" dataKey="stockIn" stroke="#00C49F" name="Stok Masuk" strokeWidth={2} />
                      <Line type="monotone" dataKey="stockOut" stroke="#FF8042" name="Stok Keluar" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Riwayat Transaksi */}
          <AnalyticsTransactionHistory
            dateRange={dateRange}
            selectedDate={selectedDate}
          />

          {/* Lower Section - Responsive Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
            {/* Top Products */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Produk Terlaris - {getPeriodTitle(dateRange)}</CardTitle>
                <CardDescription className="text-sm">5 produk dengan penjualan tertinggi untuk periode ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-4">
                  {topProducts.map((product, index) => (
                    <div key={index} className="flex items-center justify-between p-3 md:p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3 md:space-x-4 min-w-0 flex-1">
                        <div className="w-6 h-6 md:w-8 md:h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {index + 1}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm md:text-base truncate">{product.name}</p>
                          <p className="text-xs md:text-sm text-muted-foreground">{product.sold} unit terjual</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-sm md:text-base">Rp {product.revenue.toLocaleString('id-ID')}</p>
                        <p className="text-xs text-muted-foreground">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Category Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg md:text-xl">Performa Kategori</CardTitle>
                <CardDescription className="text-sm">Detail penjualan per kategori</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 md:space-y-4">
                  {categoryData.map((category, index) => (
                    <div key={index} className="flex items-center justify-between p-3 md:p-4 border rounded-lg">
                      <div className="flex items-center space-x-3 md:space-x-4 min-w-0 flex-1">
                        <div
                          className="w-3 h-3 md:w-4 md:h-4 rounded-full flex-shrink-0"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm md:text-base truncate">{category.name}</p>
                          <p className="text-xs md:text-sm text-muted-foreground">{category.value}% dari total penjualan</p>
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-sm md:text-base">Rp {category.sales.toLocaleString('id-ID')}</p>
                        <div className="w-16 md:w-24 bg-gray-200 rounded-full h-2 mt-1">
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
          </div>
        </main>
      </div>
    </>
  );
};

export default Analytics;
