import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { Sidebar } from '@/components/layout/Sidebar';
import Dashboard from '@/pages/Dashboard';
import ComingSoon from '@/pages/ComingSoon';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 2,
    },
  },
});

const modules: Array<{ path: string; title: string }> = [
  { path: "/etudiants",     title: "Gestion des étudiants" },
  { path: "/enseignants",   title: "Gestion des enseignants" },
  { path: "/filieres",      title: "Filières & programmes" },
  { path: "/classes",       title: "Classes & groupes" },
  { path: "/inscriptions",  title: "Inscriptions administratives" },
  { path: "/paiements",     title: "Module financier" },
  { path: "/rapports",      title: "Rapports & statistiques" },
  { path: "/calendrier",    title: "Calendrier académique" },
  { path: "/notifications", title: "Notifications" },
  { path: "/parametres",    title: "Paramètres" },
];

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      {modules.map(({ path, title }) => (
        <Route key={path} path={path}>
          {() => <ComingSoon title={title} />}
        </Route>
      ))}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <div className="flex h-screen overflow-hidden bg-background">
            <Sidebar />
            <Router />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
