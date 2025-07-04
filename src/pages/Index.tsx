
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, BookPlus, BarChart3, BookOpen, Users, TrendingUp } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Book,
      title: "Browse Books",
      description: "Explore our extensive collection of books across various genres",
      link: "/books",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      icon: BookPlus,
      title: "Add New Books",
      description: "Contribute to our library by adding new book entries",
      link: "/create-book",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      icon: BarChart3,
      title: "Borrow Summary",
      description: "View detailed statistics about borrowed books",
      link: "/borrow-summary",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

  const stats = [
    { icon: BookOpen, label: "Total Books", value: "1,247", color: "text-primary" },
    { icon: Users, label: "Active Borrowers", value: "89", color: "text-green-600" },
    { icon: TrendingUp, label: "Books Borrowed", value: "156", color: "text-blue-600" },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 py-12">
        <div className="flex items-center justify-center mb-6">
          <div className="p-4 bg-primary/10 rounded-full">
            <BookOpen className="h-12 w-12 text-primary" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-foreground">
          Welcome to Library Management
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover, manage, and organize your book collection with our comprehensive library management system.
          Perfect for libraries, bookstores, and personal collections.
        </p>
        <div className="flex gap-4 justify-center mt-8">
          <Link to="/books">
            <Button size="lg" className="flex items-center gap-2">
              <Book className="h-5 w-5" />
              Browse Books
            </Button>
          </Link>
          <Link to="/create-book">
            <Button variant="outline" size="lg" className="flex items-center gap-2">
              <BookPlus className="h-5 w-5" />
              Add Book
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center">
            <CardContent className="p-6">
              <div className="flex items-center justify-center mb-4">
                <div className={`p-3 rounded-full ${stat.color === 'text-primary' ? 'bg-primary/10' : stat.color === 'text-green-600' ? 'bg-green-50' : 'bg-blue-50'}`}>
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
              </div>
              <div className="text-2xl font-bold text-foreground">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Features Section */}
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">What You Can Do</h2>
          <p className="text-muted-foreground">
            Explore the key features of our library management system
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className={`p-4 rounded-full ${feature.bgColor} group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center">
                <Link to={feature.link}>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Get Started
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Ready to Start Managing Your Library?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join thousands of users who have streamlined their book management process. 
            Start organizing your collection today with our intuitive and powerful tools.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/books">
              <Button size="lg">
                View All Books
              </Button>
            </Link>
            <Link to="/create-book">
              <Button variant="outline" size="lg">
                Add Your First Book
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
