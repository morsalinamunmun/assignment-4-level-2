
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
// import { store } from "./store/store";
import BookList from "./pages/BookList";
import NotFound from "./pages/NotFound";
import AppLayout from "./layout/AppLayout";
import { store } from "./store/store";
import Index from "./pages/Index";
import CreateBook from "./pages/CreateBook";

const queryClient = new QueryClient();

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/" element={<Index/>} />
              <Route path="/books" element={<BookList />} />
              <Route path="/create-book" element={<CreateBook/>} />
             
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
   </Provider>
);

export default App;
