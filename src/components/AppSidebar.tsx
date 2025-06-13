
import { Home, ShoppingCart, Package, BarChart3, User, Bell, LogOut } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useUser } from "@/contexts/UserContext";
import { useNavigate, useLocation } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const AppSidebar = () => {
  const { user, logout, store } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
      roles: ['kasir', 'pemilik']
    },
    {
      title: "Transaksi",
      url: "/transaction",
      icon: ShoppingCart,
      roles: ['kasir', 'pemilik']
    },
    {
      title: "Stok Produk",
      url: "/stock",
      icon: Package,
      roles: ['kasir', 'pemilik'],
      badge: "3" // Low stock items
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3,
      roles: ['pemilik']
    },
    {
      title: "Profil",
      url: "/profile",
      icon: User,
      roles: ['kasir', 'pemilik']
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const filteredMenuItems = menuItems.filter(item => 
    user && item.roles.includes(user.role)
  );

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
            <span className="text-primary font-bold">TB</span>
          </div>
          <div>
            <h2 className="font-bold text-sidebar-foreground">{store.name}</h2>
            <p className="text-xs text-sidebar-foreground/70">Point of Sale</p>
          </div>
        </div>
      </SidebarHeader>
      
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70">Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredMenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={location.pathname === item.url}
                    className="text-sidebar-foreground hover:bg-sidebar-accent"
                  >
                    <button onClick={() => navigate(item.url)} className="flex items-center justify-between w-full">
                      <div className="flex items-center">
                        <item.icon className="mr-2 h-4 w-4" />
                        <span>{item.title}</span>
                      </div>
                      {item.badge && (
                        <Badge variant="destructive" className="ml-auto">
                          {item.badge}
                        </Badge>
                      )}
                    </button>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex items-center justify-between text-sidebar-foreground">
          <div>
            <p className="font-medium">{user?.name}</p>
            <p className="text-xs text-sidebar-foreground/70 capitalize">{user?.role}</p>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 hover:bg-sidebar-accent rounded-md transition-colors"
            title="Keluar"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
