
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const { login } = useUser();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(email, password);
      if (success) {
        toast({
          title: "Login Berhasil",
          description: "Selamat datang di dashboard POS!",
        });
        navigate('/');
      } else {
        toast({
          title: "Login Gagal",
          description: "Email atau password salah",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Terjadi kesalahan saat login",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotPasswordLoading(true);

    try {
      // Simulasi reset password - dalam implementasi nyata, ini akan mengirim email reset
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Email Reset Terkirim",
        description: `Link reset password telah dikirim ke ${forgotPasswordEmail}`,
      });
      
      setForgotPasswordOpen(false);
      setForgotPasswordEmail('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengirim email reset password",
        variant: "destructive",
      });
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto w-20 h-20 bg-primary rounded-full flex items-center justify-center mb-4">
            <span className="text-2xl font-bold text-white">TB</span>
          </div>
          <CardTitle className="text-2xl font-bold text-primary">Toko Barokah</CardTitle>
          <CardDescription>Sistem Point of Sale</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Masukkan email Anda"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Masukkan password Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            
            <div className="flex justify-end">
              <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
                <DialogTrigger asChild>
                  <Button variant="link" className="text-sm p-0 h-auto">
                    Lupa kata sandi?
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Reset Password</DialogTitle>
                    <DialogDescription>
                      Masukkan email Anda untuk menerima link reset password.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleForgotPassword} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="forgot-email">Email</Label>
                      <Input
                        id="forgot-email"
                        type="email"
                        placeholder="Masukkan email Anda"
                        value={forgotPasswordEmail}
                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={forgotPasswordLoading}
                    >
                      {forgotPasswordLoading ? 'Mengirim...' : 'Kirim Link Reset'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Masuk...' : 'Masuk'}
            </Button>
          </form>
          
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h4 className="font-semibold mb-2">Demo Login:</h4>
            <div className="text-sm space-y-1">
              <p><strong>Kasir:</strong> kasir@toko.com / kasir123</p>
              <p><strong>Pemilik:</strong> pemilik@toko.com / pemilik123</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
