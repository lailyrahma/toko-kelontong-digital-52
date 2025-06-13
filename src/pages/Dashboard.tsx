
import React from 'react';
import { useUser } from '@/contexts/UserContext';
import AppSidebar from '@/components/AppSidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, ShoppingCart, Package, TrendingUp, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, store } = useUser();
  const navigate = useNavigate();

  const currentDate = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const stats = [
    {
      title: 'Penjualan Hari Ini',
      value: 'Rp 2.450.000',
      description: '23 transaksi',
      icon: ShoppingCart,
      trend: '+12%'
    },
    {
      title: 'Total Produk',
      value: '1.234',
      description: '45 kategori',
      icon: Package,
      trend: '+3%'
    },
    {
      title: 'Stok Menipis',
      value: '8',
      description: 'Perlu restock',
      icon: AlertTriangle,
      trend: 'warning',
      onClick: () => navigate('/stock')
    },
    {
      title: 'Profit Bulan Ini',
      value: 'Rp 45.2 Juta',
      description: 'Target 85%',
      icon: TrendingUp,
      trend: '+8%'
    }
  ];

  const recentTransactions = [
    { id: 'TRX001', time: '14:30', items: 5, total: 'Rp 125.000', method: 'Tunai' },
    { id: 'TRX002', time: '14:15', items: 3, total: 'Rp 85.000', method: 'QRIS' },
    { id: 'TRX003', time: '14:00', items: 8, total: 'Rp 210.000', method: 'Debit' },
    { id: 'TRX004', time: '13:45', items: 2, total: 'Rp 45.000', method: 'Tunai' },
  ];

  const lowStockItems = [
    { name: 'Beras Premium 5kg', stock: 8, category: 'Sembako', status: 'low' },
    { name: 'Minyak Goreng 1L', stock: 5, category: 'Sembako', status: 'low' },
    { name: 'Gula Pasir 1kg', stock: 0, category: 'Sembako', status: 'empty' },
  ];

  return (
    <>
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-6 border-b bg-white">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Selamat datang, {user?.name}!
              </h1>
              <p className="text-muted-foreground">{currentDate}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                3
              </Badge>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">
                  {user?.name.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-medium">{user?.name}</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 bg-gray-50">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {stats.map((stat, index) => (
              <Card 
                key={index} 
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  stat.onClick ? 'hover:border-primary' : ''
                }`}
                onClick={stat.onClick}
              >
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
                    <Badge 
                      variant={stat.trend === 'warning' ? 'destructive' : 'secondary'}
                      className={stat.trend === 'warning' ? '' : 'text-green-600'}
                    >
                      {stat.trend}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Transactions */}
            <Card>
              <CardHeader>
                <CardTitle>Transaksi Terbaru</CardTitle>
                <CardDescription>Transaksi hari ini</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{transaction.id}</p>
                        <p className="text-sm text-muted-foreground">
                          {transaction.time} • {transaction.items} item
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{transaction.total}</p>
                        <Badge variant="outline" className="text-xs">
                          {transaction.method}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate('/transaction')}
                >
                  Mulai Transaksi Baru
                </Button>
              </CardContent>
            </Card>

            {/* Low Stock Alert */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  <span>Peringatan Stok</span>
                </CardTitle>
                <CardDescription>Produk yang perlu direstock</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {lowStockItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${
                          item.status === 'empty' ? 'text-red-600' : 'text-yellow-600'
                        }`}>
                          {item.stock === 0 ? 'Habis' : `${item.stock} tersisa`}
                        </p>
                        <Badge 
                          variant={item.status === 'empty' ? 'destructive' : 'secondary'}
                          className={item.status === 'empty' ? '' : 'bg-yellow-100 text-yellow-800'}
                        >
                          {item.status === 'empty' ? 'Habis' : 'Sedikit'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4"
                  onClick={() => navigate('/stock')}
                >
                  Kelola Stok
                </Button>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
