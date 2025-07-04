
import { Link, NavLink, useLocation } from "react-router-dom";
import { BookOpen, Plus, BarChart3, List, Home } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "All Books",
    url: "/books",
    icon: BookOpen,
  },
  {
    title: "Add Book",
    url: "/create-book",
    icon: Plus,
  },
  {
    title: "Borrow Summary",
    url: "/borrow-summary",
    icon: BarChart3,
  },
];

export function AppSidebar() {
  const { isCollapsed } = useSidebar();
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === "/books") {
      return location.pathname === "/" || location.pathname === "/books";
    }
    return location.pathname === path;
  };

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-64"} collapsible>
      <SidebarContent className="bg-sidebar">
        <Link to="/">
        <div className="p-4">
          <div className="flex items-center gap-2">
            <List className="h-8 w-8 text-sidebar-primary" />
            {!isCollapsed && (
              <div>
                <h2 className="text-lg font-bold text-sidebar-foreground">LibraryOS</h2>
                <p className="text-xs text-sidebar-foreground/70">Book Management</p>
              </div>
            )}
          </div>
        </div>
        </Link>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      className={({ isActive: linkActive }) =>
                        `flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                          isActive(item.url) || linkActive
                            ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
                            : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                        }`
                      }
                    >
                      <item.icon className="h-5 w-5" />
                      {!isCollapsed && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
