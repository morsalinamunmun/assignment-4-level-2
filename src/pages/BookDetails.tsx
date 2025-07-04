import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetBookQuery } from "../store/api/booksApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Edit, BookOpen } from "lucide-react";

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: book, isLoading, error } = useGetBookQuery(id!);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
          <div className="h-64 bg-muted rounded mb-6"></div>
          <div className="space-y-3">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
            <div className="h-4 bg-muted rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Book not found</h2>
        <p className="text-muted-foreground mb-4">
          The book you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate("/books")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Books
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/books")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Books
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Book Cover */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              {book.data?.coverImage ? (
                <div className="aspect-[3/4] w-full bg-muted rounded-lg overflow-hidden">
                  <img
                    src={book?.data?.coverImage}
                    alt={book?.data?.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="aspect-[3/4] w-full bg-muted rounded-lg flex items-center justify-center">
                  <BookOpen className="h-16 w-16 text-muted-foreground" />
                </div>
              )}
              
              <div className="mt-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Status:</span>
                  <Badge variant={book?.data?.available ? "default" : "destructive"}>
                    {book?.data?.available ? "Available" : "Unavailable"}
                  </Badge>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Copies:</span>
                  <span className="text-sm">{book?.data?.copies}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Book Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-3xl mb-2">{book?.data?.title}</CardTitle>
                  <p className="text-xl text-muted-foreground">by {book?.data?.author}</p>
                </div>
                {/* <div className="flex gap-2">
                  <Link to={`/edit-book/${book?.data?._id}`}>
                    <Button variant="outline">
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                  </Link>
                  {book?.data?.available && (
                    <Link to={`/borrow/${book?.data?._id}`}>
                      <Button>Borrow Book</Button>
                    </Link>
                  )}
                </div> */}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Book Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Genre:</span>
                      <span>{book?.data?.genre || "Not specified"}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">ISBN:</span>
                      <span className="font-mono">{book?.data?.isbn}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-2">Availability</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Total Copies:</span>
                      <span>{book?.data?.copies}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Status:</span>
                      <span className={book?.data?.available ? "text-green-600" : "text-red-600"}>
                        {book?.data?.available ? "Available for borrowing" : "Currently unavailable"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              {book?.data?.description && (
                <div>
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {book?.data?.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;