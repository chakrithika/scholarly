import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TimerProvider } from './context/TimerContext';
import { RadioProvider } from './context/RadioContext';
import { StudyGoalProvider } from './context/StudyGoalContext';
import { ExamProvider } from './context/ExamContext';
import { GamificationProvider } from './context/GamificationContext';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'hsl(247 48% 5%)' }}>
      <div className="text-purple-400/50 font-pixel text-sm animate-pulse">loading...</div>
    </div>
  );
  if (!user) return <Navigate to="/" replace />;
  return <>{children}</>;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'hsl(247 48% 5%)' }}>
      <div className="text-purple-400/50 font-pixel text-sm animate-pulse">loading...</div>
    </div>
  );
  if (user) return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<PublicRoute><LandingPage /></PublicRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <TimerProvider>
        <RadioProvider>
          <StudyGoalProvider>
            <ExamProvider>
              <GamificationProvider>
                <BrowserRouter basename={import.meta.env.BASE_URL}>
                  <AppRoutes />
                </BrowserRouter>
              </GamificationProvider>
            </ExamProvider>
          </StudyGoalProvider>
        </RadioProvider>
      </TimerProvider>
    </AuthProvider>
  );
}
