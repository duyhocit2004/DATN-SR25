import React, { useEffect, useState } from 'react';
import axios from '../axios';
import { toast } from 'react-toastify';

interface Notification {
    id: number;
    title: string;
    content: string;
    status: 'read' | 'unread';
    created_at: string;
}

const NotificationContainer: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [unreadCount, setUnreadCount] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/api/notifications');
            if (response.data.status === 200) {
                setNotifications(response.data.data.data);
                setError(null);
            }
        } catch (err: any) {
            setError(err.response?.data?.message || 'Error fetching notifications');
            toast.error('Failed to load notifications');
        } finally {
            setLoading(false);
        }
    };

    const fetchUnreadCount = async () => {
        try {
            const response = await axios.get('/api/notifications/unread-count');
            if (response.data.status === 200) {
                setUnreadCount(response.data.data);
            }
        } catch (err: any) {
            console.error('Error fetching unread count:', err);
        }
    };

    const markAsRead = async (id: number) => {
        try {
            const response = await axios.post(`/api/notifications/${id}/mark-as-read`);
            if (response.data.status === 200) {
                await fetchNotifications();
                await fetchUnreadCount();
                toast.success('Notification marked as read');
            }
        } catch (err: any) {
            toast.error('Failed to mark notification as read');
        }
    };

    const markAllAsRead = async () => {
        try {
            const response = await axios.post('/api/notifications/mark-all-as-read');
            if (response.data.status === 200) {
                await fetchNotifications();
                await fetchUnreadCount();
                toast.success('All notifications marked as read');
            }
        } catch (err: any) {
            toast.error('Failed to mark all notifications as read');
        }
    };

    useEffect(() => {
        fetchNotifications();
        fetchUnreadCount();
        
        // Set up polling for notifications
        const interval = setInterval(() => {
            fetchUnreadCount();
        }, 30000); // Poll every 30 seconds

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div className="p-4">Loading notifications...</div>;
    }

    if (error) {
        return <div className="p-4 text-red-500">Error: {error}</div>;
    }

    return (
        <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Notifications ({unreadCount} unread)</h2>
                {unreadCount > 0 && (
                    <button
                        onClick={markAllAsRead}
                        className="text-blue-600 hover:text-blue-800"
                    >
                        Mark all as read
                    </button>
                )}
            </div>
            
            {notifications.length === 0 ? (
                <p className="text-gray-500">No notifications</p>
            ) : (
                <div className="space-y-4">
                    {notifications.map((notification) => (
                        <div
                            key={notification.id}
                            className={`p-3 rounded-lg ${
                                notification.status === 'unread'
                                    ? 'bg-blue-50'
                                    : 'bg-gray-50'
                            }`}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-medium">{notification.title}</h3>
                                    <p className="text-gray-600">{notification.content}</p>
                                    <p className="text-sm text-gray-400 mt-1">
                                        {new Date(notification.created_at).toLocaleString()}
                                    </p>
                                </div>
                                {notification.status === 'unread' && (
                                    <button
                                        onClick={() => markAsRead(notification.id)}
                                        className="text-sm text-blue-600 hover:text-blue-800"
                                    >
                                        Mark as read
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotificationContainer; 