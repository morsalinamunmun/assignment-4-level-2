

import { useGetBorrowSummaryQuery } from "../store/api/borrowsApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, BookOpen, TrendingUp } from "lucide-react";

const BorrowSummary = () => {
  const { data: borrowSummary, isLoading, error } = useGetBorrowSummaryQuery();

  const totalBorrowedBooks =
    borrowSummary?.data?.reduce((sum, item) => sum + item?.totalQuantity, 0) || 0;

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">Error loading borrow summary. Please try again later.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BarChart3 className="h-8 w-8 text-primary" />
            Borrow Summary
          </h1>
          <p className="text-muted-foreground mt-1">
            Overview of all borrowed books and their quantities
          </p>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Books Borrowed</p>
                <p className="text-2xl font-bold">{borrowSummary?.data?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-accent/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-accent-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Quantity</p>
                <p className="text-2xl font-bold">{totalBorrowedBooks}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-secondary/10 rounded-lg">
                <BarChart3 className="h-6 w-6 text-secondary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average per Book</p>
                <p className="text-2xl font-bold">
                  {borrowSummary?.data?.length
                    ? Math.round((totalBorrowedBooks / borrowSummary.data.length) * 10) / 10
                    : 0}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Borrow Summary Table */}
      {!borrowSummary || borrowSummary?.data?.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No borrowed books</h3>
            <p className="text-muted-foreground">
              No books have been borrowed yet. Start by borrowing some books from the library.
            </p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Borrowed Books Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="min-w-full border border-border divide-y divide-border rounded-lg overflow-hidden text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-foreground">Book Title</th>
                    <th className="px-4 py-2 text-left font-semibold text-foreground">ISBN</th>
                    <th className="px-4 py-2 text-left font-semibold text-foreground">
                      Total Quantity Borrowed
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {borrowSummary?.data?.map((item, index) => (
                    <tr key={index} className="hover:bg-muted/40 transition-colors">
                      <td className="px-4 py-2">{item?.book?.title}</td>
                      <td className="px-4 py-2 font-mono">{item?.book?.isbn}</td>
                      <td className="px-4 py-2 font-bold">{item?.totalQuantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BorrowSummary;
