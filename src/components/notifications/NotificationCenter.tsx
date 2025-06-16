
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Bell, AlertTriangle, CheckCircle, MessageSquare, Share } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Notification {
  id: string;
  type: 'stock_alert' | 'transaction' | 'system' | 'promotion';
  title: string;
  message: string;
  time: string;
  read: boolean;
  priority: 'high' | 'medium' | 'low';
  actionable?: boolean;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
}

const NotificationCenter = ({ notifications, onMarkAsRead, onMarkAllAsRead }: NotificationCenterProps) => {
  const [showAll, setShowAll] = useState(false);
  const { toast } = useToast();

  const unreadCount = notifications.filter(n => !n.read).length;
  const displayedNotifications = showAll ? notifications : notifications.slice(0, 5);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'stock_alert': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'transaction': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'system': return <Bell className="h-4 w-4 text-blue-500" />;
      default: return <MessageSquare className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'destructive';
      case 'medium': return 'secondary';
      default: return 'outline';
    }
  };

  const shareToWhatsApp = (notification: Notification) => {
    const message = `⚠️ *Peringatan Stok Toko*\n\n${notification.title}\n${notification.message}\n\nMohon segera lakukan restock untuk menjaga ketersediaan produk.\n\n_Dikirim otomatis dari sistem POS_`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Pesan Dikirim",
      description: "Notifikasi telah dibagikan ke WhatsApp",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-4 w-4 md:h-5 md:w-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-4 w-4 md:h-5 md:w-5 flex items-center justify-center p-0 text-xs">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Notifikasi</span>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={onMarkAllAsRead}>
                Tandai Semua Dibaca
              </Button>
            )}
          </DialogTitle>
          <DialogDescription>
            {unreadCount > 0 ? `${unreadCount} notifikasi belum dibaca` : 'Semua notifikasi sudah dibaca'}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto space-y-3">
          {displayedNotifications.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <Bell className="h-12 w-12 mx-auto mb-2 opacity-50" />
              <p>Tidak ada notifikasi</p>
            </div>
          ) : (
            displayedNotifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`cursor-pointer transition-all ${
                  !notification.read ? 'border-primary bg-primary/5' : 'hover:bg-gray-50'
                }`}
                onClick={() => onMarkAsRead(notification.id)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="text-sm font-medium truncate">{notification.title}</h4>
                        <Badge variant={getPriorityColor(notification.priority)} className="text-xs">
                          {notification.priority === 'high' ? 'Tinggi' : 
                           notification.priority === 'medium' ? 'Sedang' : 'Rendah'}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                        {notification.message}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground">{notification.time}</span>
                        {notification.type === 'stock_alert' && notification.actionable && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-6 px-2 text-xs"
                            onClick={(e) => {
                              e.stopPropagation();
                              shareToWhatsApp(notification);
                            }}
                          >
                            <Share className="h-3 w-3 mr-1" />
                            WhatsApp
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
        
        {notifications.length > 5 && (
          <div className="pt-3 border-t">
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? 'Tampilkan Lebih Sedikit' : `Lihat Semua (${notifications.length})`}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default NotificationCenter;
