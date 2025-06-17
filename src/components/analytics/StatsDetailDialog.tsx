
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface StatsDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  data: any;
  type: 'sales' | 'transactions' | 'products' | 'average';
}

const StatsDetailDialog = ({ isOpen, onClose, title, data, type }: StatsDetailDialogProps) => {
  const renderContent = () => {
    switch (type) {
      case 'sales':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">Rp 45.2M</div>
                  <div className="text-sm text-muted-foreground">Total Bulan Ini</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">+12.5%</div>
                  <div className="text-sm text-muted-foreground">Vs Bulan Lalu</div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Breakdown Penjualan:</h4>
              <div className="space-y-2">
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">Minggu 1</span>
                  <span className="font-medium">Rp 15.4M</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">Minggu 2</span>
                  <span className="font-medium">Rp 18.2M</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">Minggu 3</span>
                  <span className="font-medium">Rp 16.8M</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">Minggu 4</span>
                  <span className="font-medium">Rp 19.6M</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'transactions':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-blue-600">1,234</div>
                  <div className="text-sm text-muted-foreground">Total Transaksi</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">+8.2%</div>
                  <div className="text-sm text-muted-foreground">Peningkatan</div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Status Transaksi:</h4>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Selesai</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">1,210</Badge>
                    <span className="text-xs text-muted-foreground">98%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Pending</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="secondary">15</Badge>
                    <span className="text-xs text-muted-foreground">1.2%</span>
                  </div>
                </div>
                <div className="flex justify-between items-center p-2 bg-gray-50 rounded">
                  <span className="text-sm">Dibatalkan</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant="destructive">9</Badge>
                    <span className="text-xs text-muted-foreground">0.8%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'products':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">8,945</div>
                  <div className="text-sm text-muted-foreground">Unit Terjual</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">+15.3%</div>
                  <div className="text-sm text-muted-foreground">Peningkatan</div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Top 5 Produk Terlaris:</h4>
              <div className="space-y-2">
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">Beras Premium 5kg</span>
                  <span className="font-medium">125 unit</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">Indomie Goreng</span>
                  <span className="font-medium">234 unit</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">Teh Botol Sosro</span>
                  <span className="font-medium">156 unit</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">Minyak Goreng 1L</span>
                  <span className="font-medium">89 unit</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">Sabun Mandi Lifebuoy</span>
                  <span className="font-medium">67 unit</span>
                </div>
              </div>
            </div>
          </div>
        );
      
      case 'average':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">Rp 36,650</div>
                  <div className="text-sm text-muted-foreground">Rata-rata Saat Ini</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">+4.1%</div>
                  <div className="text-sm text-muted-foreground">Peningkatan</div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium">Perbandingan Periode:</h4>
              <div className="space-y-2">
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">Bulan Ini</span>
                  <span className="font-medium">Rp 36,650</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">Bulan Lalu</span>
                  <span className="font-medium">Rp 35,200</span>
                </div>
                <div className="flex justify-between p-2 bg-gray-50 rounded">
                  <span className="text-sm">3 Bulan Lalu</span>
                  <span className="font-medium">Rp 34,100</span>
                </div>
              </div>
              <div className="mt-4">
                <h4 className="font-medium mb-2">Rentang Transaksi:</h4>
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Transaksi Tertinggi:</span>
                    <span className="font-medium">Rp 168,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Transaksi Terendah:</span>
                    <span className="font-medium">Rp 3,500</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return <div>Detail tidak tersedia</div>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base">{title}</DialogTitle>
          <DialogDescription className="text-sm">
            Detail informasi untuk metrik ini
          </DialogDescription>
        </DialogHeader>
        {renderContent()}
      </DialogContent>
    </Dialog>
  );
};

export default StatsDetailDialog;
