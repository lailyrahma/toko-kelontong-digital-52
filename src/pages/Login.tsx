
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Login = () => {
  // Login states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  
  // Sign up states
  const [signUpName, setSignUpName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpLoading, setSignUpLoading] = useState(false);
  
  // Forgot password states
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  
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

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Registrasi Berhasil",
        description: "Akun berhasil dibuat. Silakan login.",
      });
      
      setSignUpName('');
      setSignUpEmail('');
      setSignUpPassword('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal membuat akun baru",
        variant: "destructive",
      });
    } finally {
      setSignUpLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast({
        title: "Email Terkirim",
        description: `Link reset password telah dikirim ke ${forgotEmail}`,
      });
      
      setForgotEmail('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Gagal mengirim email reset",
        variant: "destructive",
      });
    } finally {
      setForgotLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-white">TB</span>
          </div>
          <div>
            <CardTitle className="text-xl font-bold text-primary">Toko Barokah</CardTitle>
            <CardDescription className="text-sm">Sistem Point of Sale</CardDescription>
          </div>
        </CardHeader>
        
        <CardContent className="p-6">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="login" className="text-xs">Masuk</TabsTrigger>
              <TabsTrigger value="signup" className="text-xs">Daftar</TabsTrigger>
              <TabsTrigger value="forgot" className="text-xs">Lupa Password</TabsTrigger>
            </TabsList>
            
            {/* Login Tab */}
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email" className="text-sm">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="masukkan@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password" className="text-sm">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? 'Masuk...' : 'Masuk'}
                </Button>
              </form>
            </TabsContent>
            
            {/* Sign Up Tab */}
            <TabsContent value="signup">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name" className="text-sm">Nama Lengkap</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="nama lengkap"
                    value={signUpName}
                    onChange={(e) => setSignUpName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email" className="text-sm">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="email@domain.com"
                    value={signUpEmail}
                    onChange={(e) => setSignUpEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password" className="text-sm">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="buat password"
                    value={signUpPassword}
                    onChange={(e) => setSignUpPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={signUpLoading}>
                  {signUpLoading ? 'Mendaftar...' : 'Daftar Sekarang'}
                </Button>
              </form>
            </TabsContent>
            
            {/* Forgot Password Tab */}
            <TabsContent value="forgot">
              <form onSubmit={handleForgotPassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forgot-email" className="text-sm">Email</Label>
                  <Input
                    id="forgot-email"
                    type="email"
                    placeholder="masukkan email anda"
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="text-xs text-muted-foreground mb-4">
                  Kami akan mengirim link reset password ke email Anda
                </div>
                <Button type="submit" className="w-full" disabled={forgotLoading}>
                  {forgotLoading ? 'Mengirim...' : 'Kirim Link Reset'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
          
          {/* Demo Credentials */}
          <div className="mt-6 p-3 bg-muted rounded-lg">
            <h4 className="font-medium text-sm mb-2">Demo Login:</h4>
            <div className="text-xs space-y-1">
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
