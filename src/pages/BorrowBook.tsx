import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetBookQuery } from "../store/api/booksApi";
import { useBorrowBookMutation } from "../store/api/borrowsApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, BookOpen } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const BorrowBook = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading: isLoadingBook } = useGetBookQuery(bookId!);
  const [borrowBook, { isLoading: isBorrowing }] = useBorrowBookMutation();
  
  const [formData, setFormData] = useState({
    quantity: 1,
    dueDate: "",
  });
console.log(book, 'book data fetched');
  // Set default due date to 2 weeks from now
  useState(() => {
    const twoWeeksFromNow = new Date();
    twoWeeksFromNow.setDate(twoWeeksFromNow.getDate() + 14);
    setFormData(prev => ({
      ...prev,
      dueDate: twoWeeksFromNow.toISOString().split('T')[0]
    }));
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!book) return;
    
    if (formData.quantity > book?.data?.copies) {
      toast({
        title: "Invalid Quantity",
        description: `Only ${book?.data?.copies} copies are available`,
        variant: "destructive",
      });
      return;
    }

    if (!formData.dueDate) {
      toast({
        title: "Missing Due Date",
        description: "Please select a due date",
        variant: "destructive",
      });
      return;
    }

    try {
      await borrowBook({
        book: bookId!,
        quantity: formData.quantity,
        dueDate: formData.dueDate,
      }).unwrap();
      
      toast({
        title: "Success!",
        description: `Successfully borrowed ${formData.quantity} copy(ies) of "${book?.data?.title}"`,
      });
      
      navigate("/borrow-summary");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to borrow book",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (isLoadingBook) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-muted rounded"></div>
        </div>
      </div>
    );
  }

  if (!book || !book?.data.available) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Book not available</h2>
        <p className="text-muted-foreground mb-4">
          This book is currently not available for borrowing.
        </p>
        <Button onClick={() => navigate("/books")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Books
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/books/${bookId}`)}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Book
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookOpen className="h-8 w-8 text-primary" />
            Borrow Book
          </h1>
          <p className="text-muted-foreground">Complete the borrowing process</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Book Info */}
        <Card>
          <CardHeader>
            <CardTitle>Book Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {book?.data?.coverImage && (
              <div className="aspect-[3/4] w-full bg-muted rounded-lg overflow-hidden">
                <img
                  src={book?.data?.coverImage}
                  alt={book?.data?.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            
            <div className="space-y-2">
              <h3 className="font-semibold text-lg">{book?.data?.title}</h3>
              <p className="text-muted-foreground">by {book?.data?.author}</p>
              <div className="pt-2 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Genre:</span>
                  <span>{book?.data?.genre}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Available Copies:</span>
                  <span className="font-medium">{book?.data?.copies}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ISBN:</span>
                  <span className="font-mono text-xs">{book?.data?.isbn}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Borrow Form */}
        <Card>
          <CardHeader>
            <CardTitle>Borrowing Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantity *</Label>
                <Input
                  id="quantity"
                  type="number"
                  min="1"
                  max={book?.data?.copies}
                  value={formData.quantity}
                  onChange={(e) => handleInputChange("quantity", parseInt(e.target.value) || 1)}
                  placeholder="Number of copies"
                  required
                />
                <p className="text-sm text-muted-foreground">
                  Maximum available: {book?.data?.copies} copies
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date *</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  required
                />
                <p className="text-sm text-muted-foreground">
                  When do you plan to return this book?
                </p>
              </div>

              <div className="bg-muted p-4 rounded-lg">
                <h4 className="font-medium mb-2">Borrowing Summary</h4>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span>Book:</span>
                    <span>{book?.data?.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantity:</span>
                    <span>{formData.quantity} copy(ies)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Due Date:</span>
                    <span>{formData.dueDate ? new Date(formData.dueDate).toLocaleDateString() : "Not set"}</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isBorrowing} className="flex-1">
                  {isBorrowing ? "Processing..." : "Confirm Borrow"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(`/books/${bookId}`)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BorrowBook;
