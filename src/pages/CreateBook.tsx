import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation } from "../store/api/booksApi";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, BookPlus } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const CreateBook = () => {
  const navigate = useNavigate();
  const [createBook, { isLoading }] = useCreateBookMutation();
  
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.author || !formData.isbn) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await createBook(formData).unwrap();
      toast({
        title: "Success!",
        description: "Book created successfully",
      });
      navigate("/books");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create book",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string | number | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate("/books")}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Books
        </Button>
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <BookPlus className="h-8 w-8 text-primary" />
            Add New Book
          </h1>
          <p className="text-muted-foreground">Create a new book entry for your library</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Book Information</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="Enter book title"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="author">Author *</Label>
                <Input
                  id="author"
                  value={formData.author}
                  onChange={(e) => handleInputChange("author", e.target.value)}
                  placeholder="Enter author name"
                  required
                />
              </div>
              
              <div className="space-y-2">
                {/* <Label htmlFor="genre">Genre</Label>
                <Input
                  id="genre"
                  value={formData.genre}
                  onChange={(e) => handleInputChange("genre", e.target.value)}
                  placeholder="Enter book genre"
                /> */}
                <Label htmlFor="genre">Genre *</Label>
<select
  id="genre"
  value={formData.genre}
  onChange={(e) => handleInputChange("genre", e.target.value)}
  className="w-full border rounded px-3 py-2 text-sm"
  required
>
  <option value="">Select Genre</option>
  <option value="FICTION">Fiction</option>
  <option value="NON_FICTION">Non-fiction</option>
  <option value="SCIENCE">Science</option>
  <option value="HISTORY">History</option>
  <option value="BIOGRAPHY">Biography</option>
  <option value="FANTASY">Fantasy</option>
</select>

              </div>
              
              <div className="space-y-2">
                <Label htmlFor="isbn">ISBN *</Label>
                <Input
                  id="isbn"
                  value={formData.isbn}
                  onChange={(e) => handleInputChange("isbn", e.target.value)}
                  placeholder="978-0-000-00000-0"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="copies">Number of Copies</Label>
                <Input
                  id="copies"
                  type="number"
                  min="0"
                  value={formData.copies}
                  onChange={(e) => handleInputChange("copies", parseInt(e.target.value) || 0)}
                />
              </div>
              
              <div className="space-y-2">
                <Label className="text-sm font-medium">Available</Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="available"
                    checked={formData.available}
                    onCheckedChange={(checked) => handleInputChange("available", checked)}
                  />
                  <Label htmlFor="available" className="text-sm text-muted-foreground">
                    Mark as available for borrowing
                  </Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Enter book description..."
                rows={4}
              />
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading ? "Creating..." : "Create Book"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => navigate("/books")}
              >
                Cancel
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateBook;