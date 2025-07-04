
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Edit, Trash2, Eye, BookOpen, Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useDeleteBookMutation, useGetBooksQuery } from "@/store/api/booksApi";

const BookList = () => {
  const { data: books, isLoading, error } = useGetBooksQuery()
  const [deleteBook] = useDeleteBookMutation();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [bookToDelete, setBookToDelete] = useState<string | null>(null);

  const handleDelete = async () => {
    if (!bookToDelete) return;
    
    try {
      await deleteBook(bookToDelete).unwrap();
      toast({
        title: "Success",
        description: "Book deleted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete book",
        variant: "destructive",
      });
    } finally {
      setDeleteDialogOpen(false);
      setBookToDelete(null);
    }
  };

  const openDeleteDialog = (bookId: string) => {
    setBookToDelete(bookId);
    setDeleteDialogOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">All Books</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="h-32 bg-muted rounded mb-4"></div>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-2/3"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Error loading books. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-foreground">All Books</h1>
          <p className="text-muted-foreground mt-1">
            Discover and manage your book collection
          </p>
        </div>
        <Link to="/create-book">
          <Button className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Book
          </Button>
        </Link>
      </div>

      {!books || books.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No books found</h3>
            <p className="text-muted-foreground mb-4">
              Start building your library by adding your first book.
            </p>
            <Link to="/create-book">
              <Button>Add Your First Book</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {books?.data?.map((book) => (
            <Card key={book.id} className="book-card group">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2 group-hover:text-primary transition-colors">
                      {book.title}
                    </CardTitle>
                    <p className="text-muted-foreground text-sm mt-1">
                      by {book.author}
                    </p>
                  </div>
                  <Badge variant={book.available ? "default" : "destructive"}>
                    {book.available ? "Available" : "Unavailable"}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {book.coverImage && (
                  <div className="aspect-[3/4] w-full bg-muted rounded-lg overflow-hidden">
                    <img
                      src={book.coverImage}
                      alt={book.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Genre:</span>
                    <span className="font-medium">{book.genre}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Copies:</span>
                    <span className="font-medium">{book.copies}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">ISBN:</span>
                    <span className="font-medium text-xs">{book.isbn}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2">
                  {book.description}
                </p>
              </CardContent>

              <CardFooter className="pt-4 gap-2">
                <Link to={`/books/${book.id}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </Button>
                </Link>
                
                <Link to={`/edit-book/${book.id}`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openDeleteDialog(book.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                
                {book.available && (
                  <Link to={`/borrow/${book.id}`}>
                    <Button size="sm" className="ml-2">
                      Borrow
                    </Button>
                  </Link>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the book
              from your library.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete Book
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BookList;
