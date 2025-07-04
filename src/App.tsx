
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
import EditBook from "./pages/EditBook";
import BorrowBook from "./pages/BorrowBook";
import BorrowSummary from "./pages/BorrowSummary";
import BookDetails from "./pages/BookDetails";

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
             <Route path="/edit-book/:id" element={<EditBook />} />
              <Route path="/borrow/:bookId" element={<BorrowBook />} />
              <Route path="/borrow-summary" element={<BorrowSummary />} />
              <Route path="/books/:id" element={<BookDetails />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
   </Provider>
);

export default App;
