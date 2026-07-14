import './App.css';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout';
import { ThemeProvider } from './Context/theme-provider';
import WeatherDashboard from './pages/weather-dashboard';
import CityPage from './pages/city-page';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
      retry: false,
      refetchOnWindowFocus: false,
    }
  }
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <HashRouter>
        <ThemeProvider defaultTheme='dark'>
          <Layout>
            <Routes>
                <Route path='/' element={<WeatherDashboard />} />
                <Route path='/city/:cityName' element={<CityPage />} />
            </Routes>
          </Layout>
          <Toaster/>
        </ThemeProvider>
      </HashRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App
