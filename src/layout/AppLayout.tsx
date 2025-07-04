
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col">
          <header className="h-16 border-b border-border bg-card flex items-center px-6">
            <SidebarTrigger className="mr-4" />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-primary">📚 Library Management</h1>
              <p className="text-sm text-muted-foreground">Manage your book collection with ease</p>
            </div>
          </header>
          
          <main className="flex-1 p-6">
            {children}
          </main>
          
          <footer className="border-t border-border bg-card p-4 text-center text-sm text-muted-foreground">
            <p>© 2024 Library Management System. Built for book lovers.</p>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AppLayout;
