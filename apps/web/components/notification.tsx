import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface Notification {
    id: string;
    message: string;
    type: NotificationType;
}

interface NotificationProps {
    notifications: Notification[];
    onClose: (id: string) => void;
}

const NotificationContainer: React.FC<NotificationProps> = ({ notifications, onClose }) => {
    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-md">
            {notifications.map((notification) => (
                <NotificationToast
                    key={notification.id}
                    notification={notification}
                    onClose={onClose}
                />
            ))}
        </div>
    );
};

const NotificationToast: React.FC<{
    notification: Notification;
    onClose: (id: string) => void;
}> = ({ notification, onClose }) => {
    const [ isExiting, setIsExiting ] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsExiting(true);
            setTimeout(() => onClose(notification.id), 300);
        }, 4000);

        return () => clearTimeout(timer);
    }, [notification.id, onClose]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => onClose(notification.id), 300);
    };

    const getStyles = () => {
        switch (notification.type) {
        case 'success':
            return {
                bg: 'bg-green-900/90 border-green-600',
                icon: <CheckCircle className="w-5 h-5 text-green-400" />,
                iconBg: 'bg-green-600/20'
            };
        case 'error':
            return {
                bg: 'bg-red-900/90 border-red-600',
                icon: <XCircle className="w-5 h-5 text-red-400" />,
                iconBg: 'bg-red-600/20'
            };
        case 'warning':
            return {
                bg: 'bg-yellow-900/90 border-yellow-600',
                icon: <AlertCircle className="w-5 h-5 text-yellow-400" />,
                iconBg: 'bg-yellow-600/20'
            };
        case 'info':
            return {
                bg: 'bg-blue-900/90 border-blue-600',
                icon: <Info className="w-5 h-5 text-blue-400" />,
                iconBg: 'bg-blue-600/20'
            };
        default:
            return {
                bg: 'bg-gray-900/90 border-gray-600',
                icon: <Info className="w-5 h-5 text-gray-400" />,
                iconBg: 'bg-gray-600/20'
            };
        }
    };

    const styles = getStyles();

    return (
        <div
            className={`${styles.bg} border backdrop-blur-sm rounded-lg shadow-xl p-4 flex items-start gap-3 min-w-[320px] ${
                isExiting ? 'animate-slideOut' : 'animate-slideIn'
            }`}
        >
            <div className={`${styles.iconBg} p-2 rounded-lg flex-shrink-0`}>
                {styles.icon}
            </div>

            <div className="flex-1 pt-0.5">
                <p className="text-white text-sm font-medium leading-relaxed">
                    {notification.message}
                </p>
            </div>

            <button
                onClick={handleClose}
                className="text-gray-400 hover:text-white transition-colors flex-shrink-0"
            >
                <X className="w-4 h-4" />
            </button>

            <style jsx>{`
                @keyframes slideIn {
                    from {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(100%);
                        opacity: 0;
                    }
                }
                
                .animate-slideIn {
                    animation: slideIn 0.3s ease-out;
                }
                
                .animate-slideOut {
                    animation: slideOut 0.3s ease-out;
                }
            `}</style>
        </div>
    );
};

export const useNotification = () => {
    const [ notifications, setNotifications ] = useState<Notification[]>([]);

    const showNotification = (message: string, type: NotificationType = 'success') => {
        const id = Date.now().toString() + Math.random().toString(36);
        setNotifications((prev) => [...prev, { id, message, type }]);
    };

    const closeNotification = (id: string) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    };

    return { notifications, showNotification, closeNotification };
};

export default NotificationContainer;
