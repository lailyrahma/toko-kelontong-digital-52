
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@/contexts/UserContext';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      navigate('/dashboard', { replace: true });
    } else {
      navigate('/login', { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Loading...</h1>
        <p className="text-xl text-muted-foreground">Redirecting to dashboard...</p>
      </div>
    </div>
  );
};

export default Index;
