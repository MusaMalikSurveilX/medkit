import { useAuth } from '@/lib/AuthContext';
import { Redirect } from 'expo-router';

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { session, loading } = useAuth();

  if (loading) {
    return null; // Or a loading spinner
  }

  if (!session) {
    return <Redirect href="/(auth)/welcome" />;
  }

  return <>{children}</>;
} 