
import React, { useState } from 'react';
import AppSidebar from '@/components/AppSidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Search, Scan, ShoppingCart, Trash2, Plus, Minus, CreditCard, Smartphone, Banknote, Printer, Package } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  barcode: string;
  image?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const Transaction = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'qris' | 'debit'>('cash');
  const [amountPaid, setAmountPaid] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const { toast } = useToast();

  // Sample products
  const products: Product[] = [
    { id: '1', name: 'Beras Premium 5kg', category: 'Sembako', price: 75000, stock: 20, barcode: '1234567890123' },
    { id: '2', name: 'Minyak Goreng 1L', category: 'Sembako', price: 18000, stock: 15, barcode: '1234567890124' },
    { id: '3', name: 'Gula Pasir 1kg', category: 'Sembako', price: 14000, stock: 0, barcode: '1234567890125' },
    { id: '4', name: 'Indomie Goreng', category: 'Makanan Instan', price: 3500, stock: 100, barcode: '1234567890126' },
    { id: '5', name: 'Teh Botol Sosro', category: 'Minuman', price: 4000, stock: 50, barcode: '1234567890127' },
    { id: '6', name: 'Sabun Mandi Lifebuoy', category: 'Kebersihan', price: 8500, stock: 30, barcode: '1234567890128' },
  ];

  const categories = ['all', 'Sembako', 'Makanan Instan', 'Minuman', 'Kebersihan'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.barcode.includes(searchTerm);
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    if (product.stock === 0) {
      toast({
        title: "Stok Habis",
        description: `${product.name} tidak tersedia`,
        variant: "destructive",
      });
      return;
    }

    const existingItem = cartItems.find(item => item.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        toast({
          title: "Stok Tidak Cukup",
          description: `Stok ${product.name} hanya ${product.stock}`,
          variant: "destructive",
        });
        return;
      }
      updateQuantity(product.id, existingItem.quantity + 1);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const removeFromCart = (productId: string) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handlePayment = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Keranjang Kosong",
        description: "Tambahkan produk terlebih dahulu",
        variant: "destructive",
      });
      return;
    }
    setShowPayment(true);
  };

  const processPayment = () => {
    const paid = parseFloat(amountPaid) || 0;
    
    if (paymentMethod === 'cash' && paid < totalAmount) {
      toast({
        title: "Pembayaran Kurang",
        description: "Jumlah yang dibayar kurang dari total",
        variant: "destructive",
      });
      return;
    }

    setShowPayment(false);
    setShowReceipt(true);
    
    toast({
      title: "Transaksi Berhasil",
      description: "Pembayaran telah diproses",
    });
  };

  const finishTransaction = () => {
    setShowReceipt(false);
    clearCart();
    setAmountPaid('');
    toast({
      title: "Transaksi Selesai",
      description: "Siap untuk transaksi baru",
    });
  };

  const getStockBadge = (stock: number) => {
    if (stock === 0) return <Badge variant="destructive" className="stock-empty">Habis</Badge>;
    if (stock < 10) return <Badge variant="secondary" className="stock-low">Sedikit</Badge>;
    if (stock <= 50) return <Badge variant="secondary" className="stock-normal">Normal</Badge>;
    return <Badge variant="secondary" className="stock-abundant">Banyak</Badge>;
  };

  return (
    <>
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-6 border-b bg-white">
          <div className="flex items-center space-x-4">
            <SidebarTrigger />
            <h1 className="text-2xl font-bold">Transaksi</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="scan-animation">
              <Scan className="mr-2 h-4 w-4" />
              Scan Barcode
            </Button>
          </div>
        </header>

        <div className="flex-1 flex">
          {/* Product Selection */}
          <div className="flex-1 p-6">
            <div className="mb-6 flex space-x-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari produk atau scan barcode..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Pilih kategori" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>
                      {category === 'all' ? 'Semua Kategori' : category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                      <Package className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <h3 className="font-medium mb-1 line-clamp-2">{product.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{product.category}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-lg">
                        Rp {product.price.toLocaleString('id-ID')}
                      </span>
                      {getStockBadge(product.stock)}
                    </div>
                    <p className="text-xs text-muted-foreground mb-3">
                      Stok: {product.stock} | Barcode: {product.barcode}
                    </p>
                    <Button 
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className="w-full"
                      size="sm"
                    >
                      <Plus className="mr-2 h-4 w-4" />
                      Tambah
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Shopping Cart */}
          <div className="w-96 border-l bg-white p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold flex items-center">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Keranjang ({totalItems})
              </h2>
              {cartItems.length > 0 && (
                <Button variant="ghost" size="sm" onClick={clearCart}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
              {cartItems.length === 0 ? (
                <p className="text-center text-muted-foreground py-8">
                  Keranjang kosong
                </p>
              ) : (
                cartItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">{item.name}</h4>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold">
                          Rp {item.price.toLocaleString('id-ID')}
                        </span>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.stock}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">
                          Subtotal: Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            <Separator className="my-4" />
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>Rp {totalAmount.toLocaleString('id-ID')}</span>
              </div>
            </div>

            <Button 
              onClick={handlePayment} 
              className="w-full" 
              size="lg"
              disabled={cartItems.length === 0}
            >
              Bayar
            </Button>
          </div>
        </div>

        {/* Payment Dialog */}
        <Dialog open={showPayment} onOpenChange={setShowPayment}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Pembayaran</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold">
                  Total: Rp {totalAmount.toLocaleString('id-ID')}
                </p>
              </div>
              
              <div>
                <label className="text-sm font-medium mb-2 block">Metode Pembayaran</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button
                    variant={paymentMethod === 'cash' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('cash')}
                    className="flex flex-col h-16"
                  >
                    <Banknote className="h-5 w-5 mb-1" />
                    Tunai
                  </Button>
                  <Button
                    variant={paymentMethod === 'qris' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('qris')}
                    className="flex flex-col h-16"
                  >
                    <Smartphone className="h-5 w-5 mb-1" />
                    QRIS
                  </Button>
                  <Button
                    variant={paymentMethod === 'debit' ? 'default' : 'outline'}
                    onClick={() => setPaymentMethod('debit')}
                    className="flex flex-col h-16"
                  >
                    <CreditCard className="h-5 w-5 mb-1" />
                    Debit
                  </Button>
                </div>
              </div>

              {paymentMethod === 'cash' && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Jumlah Dibayar</label>
                  <Input
                    type="number"
                    placeholder="Masukkan jumlah"
                    value={amountPaid}
                    onChange={(e) => setAmountPaid(e.target.value)}
                  />
                  {amountPaid && parseFloat(amountPaid) >= totalAmount && (
                    <p className="text-sm text-green-600 mt-2">
                      Kembalian: Rp {(parseFloat(amountPaid) - totalAmount).toLocaleString('id-ID')}
                    </p>
                  )}
                </div>
              )}

              <Button onClick={processPayment} className="w-full">
                Proses Pembayaran
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Receipt Dialog */}
        <Dialog open={showReceipt} onOpenChange={setShowReceipt}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Struk Pembayaran</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="text-center border-b pb-4">
                <h3 className="font-bold">Toko Kelontong Barokah</h3>
                <p className="text-sm text-muted-foreground">
                  Jl. Mawar No. 123, Jakarta
                </p>
                <p className="text-sm text-muted-foreground">
                  Telp: 021-12345678
                </p>
              </div>
              
              <div className="space-y-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
                  </div>
                ))}
              </div>
              
              <div className="border-t pt-2 space-y-1">
                <div className="flex justify-between font-bold">
                  <span>Total:</span>
                  <span>Rp {totalAmount.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Metode:</span>
                  <span className="capitalize">{paymentMethod}</span>
                </div>
                {paymentMethod === 'cash' && amountPaid && (
                  <>
                    <div className="flex justify-between text-sm">
                      <span>Dibayar:</span>
                      <span>Rp {parseFloat(amountPaid).toLocaleString('id-ID')}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Kembalian:</span>
                      <span>Rp {(parseFloat(amountPaid) - totalAmount).toLocaleString('id-ID')}</span>
                    </div>
                  </>
                )}
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1">
                  <Printer className="mr-2 h-4 w-4" />
                  Cetak
                </Button>
                <Button onClick={finishTransaction} className="flex-1">
                  Selesai
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default Transaction;
