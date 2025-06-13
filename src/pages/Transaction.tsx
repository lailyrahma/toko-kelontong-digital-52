
import React, { useState } from 'react';
import AppSidebar from '@/components/AppSidebar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Scan, ShoppingCart, Trash2, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ProductCard from '@/components/transaction/ProductCard';
import CartItem from '@/components/transaction/CartItem';
import ProductFilters from '@/components/transaction/ProductFilters';
import PaymentDialog from '@/components/transaction/PaymentDialog';
import ReceiptDialog from '@/components/transaction/ReceiptDialog';

interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  barcode: string;
  image?: string;
}

interface CartItemData extends Product {
  quantity: number;
}

const Transaction = () => {
  const [cartItems, setCartItems] = useState<CartItemData[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'qris' | 'debit'>('cash');
  const [amountPaid, setAmountPaid] = useState('');
  const [showPayment, setShowPayment] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showMobileCart, setShowMobileCart] = useState(false);
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

  return (
    <>
      <AppSidebar />
      <div className="flex-1 flex flex-col">
        <header className="flex items-center justify-between p-4 md:p-6 border-b bg-white">
          <div className="flex items-center space-x-2 md:space-x-4 flex-1 min-w-0">
            <SidebarTrigger />
            <h1 className="text-lg md:text-2xl font-bold truncate">Transaksi</h1>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
            <Button variant="outline" className="scan-animation hidden sm:flex" size="sm">
              <Scan className="mr-2 h-4 w-4" />
              Scan Barcode
            </Button>
            <Button variant="outline" className="scan-animation sm:hidden" size="sm">
              <Scan className="h-4 w-4" />
            </Button>
            {/* Mobile Cart Toggle */}
            <Button 
              variant="outline" 
              size="sm"
              className="lg:hidden relative"
              onClick={() => setShowMobileCart(true)}
            >
              <ShoppingCart className="h-4 w-4" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </header>

        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Product Selection */}
          <div className="flex-1 p-4 md:p-6">
            <ProductFilters
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              categories={categories}
              onSearchChange={setSearchTerm}
              onCategoryChange={setSelectedCategory}
            />

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>

          {/* Desktop Cart */}
          <div className="hidden lg:block w-96 border-l bg-white p-6">
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
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
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

          {/* Mobile Cart Bottom Bar */}
          <div className="lg:hidden bg-white border-t p-4 sticky bottom-0">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">{totalItems} item</p>
                <p className="font-bold">Rp {totalAmount.toLocaleString('id-ID')}</p>
              </div>
              <Button 
                onClick={handlePayment} 
                disabled={cartItems.length === 0}
                className="px-6"
              >
                Bayar
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Cart Overlay */}
        {showMobileCart && (
          <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
            <div className="fixed right-0 top-0 h-full w-full max-w-sm bg-white shadow-lg">
              <div className="flex items-center justify-between p-4 border-b">
                <h2 className="text-lg font-bold flex items-center">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Keranjang ({totalItems})
                </h2>
                <div className="flex items-center space-x-2">
                  {cartItems.length > 0 && (
                    <Button variant="ghost" size="sm" onClick={clearCart}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowMobileCart(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex-1 overflow-hidden flex flex-col">
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                  {cartItems.length === 0 ? (
                    <p className="text-center text-muted-foreground py-8">
                      Keranjang kosong
                    </p>
                  ) : (
                    cartItems.map((item) => (
                      <CartItem
                        key={item.id}
                        item={item}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeFromCart}
                      />
                    ))
                  )}
                </div>

                {cartItems.length > 0 && (
                  <div className="border-t p-4 bg-white">
                    <div className="flex justify-between text-lg font-bold mb-4">
                      <span>Total:</span>
                      <span>Rp {totalAmount.toLocaleString('id-ID')}</span>
                    </div>
                    <Button 
                      onClick={() => {
                        setShowMobileCart(false);
                        handlePayment();
                      }} 
                      className="w-full" 
                      size="lg"
                    >
                      Bayar
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <PaymentDialog
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          totalAmount={totalAmount}
          paymentMethod={paymentMethod}
          amountPaid={amountPaid}
          onPaymentMethodChange={setPaymentMethod}
          onAmountPaidChange={setAmountPaid}
          onProcessPayment={processPayment}
        />

        <ReceiptDialog
          isOpen={showReceipt}
          onClose={() => setShowReceipt(false)}
          cartItems={cartItems}
          totalAmount={totalAmount}
          paymentMethod={paymentMethod}
          amountPaid={amountPaid}
          onFinishTransaction={finishTransaction}
        />
      </div>
    </>
  );
};

export default Transaction;
