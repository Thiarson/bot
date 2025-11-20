"use client";

import { useState, useEffect, useCallback } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';
import { useNotification } from '@/context/notification-context';

import type { Notification } from '@/context/notification-context';

const NotificationToast: React.FC<{
    notification: Notification;
    onClose: (id: string) => void;
}> = ({ notification, onClose }) => {
    const [isExiting, setIsExiting] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [progress, setProgress] = useState(100);

    const handleClose = useCallback(() => {
        setIsExiting(true);
        setTimeout(() => onClose(notification.id), 300);
    }, [notification.id, onClose]);

    useEffect(() => {
        if (isPaused) return;

        const duration = 4000;
        const interval = 50;
        const step = (interval / duration) * 100;

        const progressTimer = setInterval(() => {
            setProgress((prev) => {
                const newProgress = prev - step;

                if (newProgress <= 0) {
                    clearInterval(progressTimer);
                    handleClose();

                    return 0;
                }

                return newProgress;
            });
        }, interval);

        return () => clearInterval(progressTimer);
    }, [isPaused, handleClose]);

    const getStyles = () => {
        const styles = {
            success: {
                bg: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
                icon: <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />,
                iconBg: 'bg-green-100 dark:bg-green-900/40',
                progress: 'bg-green-500 dark:bg-green-600'
            },
            error: {
                bg: 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800',
                icon: <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />,
                iconBg: 'bg-red-100 dark:bg-red-900/40',
                progress: 'bg-red-500 dark:bg-red-600'
            },
            warning: {
                bg: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800',
                icon: <AlertCircle className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />,
                iconBg: 'bg-yellow-100 dark:bg-yellow-900/40',
                progress: 'bg-yellow-500 dark:bg-yellow-600'
            },
            info: {
                bg: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
                icon: <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />,
                iconBg: 'bg-blue-100 dark:bg-blue-900/40',
                progress: 'bg-blue-500 dark:bg-blue-600'
            }
        };

        return styles[notification.type] || styles.info;
    };

    const styles = getStyles();

    return (
        <div
            role="alert"
            aria-live="assertive"
            className={`
                ${styles.bg} 
                border backdrop-blur-sm rounded-lg shadow-lg p-4 
                flex flex-col gap-3 min-w-[320px] pointer-events-auto
                ${isExiting ? 'animate-out slide-out-to-right duration-300' : 'animate-in slide-in-from-right duration-300'}
            `}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            <div className="flex items-start gap-3">
                <div className={`${styles.iconBg} p-2 rounded-lg flex-shrink-0`}>
                    {styles.icon}
                </div>

                <div className="flex-1 pt-0.5">
                    <p className="text-gray-900 dark:text-white text-sm font-medium leading-relaxed">
                        {notification.message}
                    </p>
                </div>

                <button
                    onClick={handleClose}
                    className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors flex-shrink-0 rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-800"
                    aria-label="Fermer la notification"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Progression bar */}
            <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                    className={`h-full ${styles.progress} transition-all duration-100 ease-linear`}
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};

const NotificationContainer: React.FC = () => {
    const { notifications, closeNotification } = useNotification();

    return (
        <div 
            className="fixed top-4 right-4 z-[9999] flex flex-col gap-3 max-w-md pointer-events-none"
            aria-live="polite"
            aria-atomic="true"
        >
            {notifications.map((notification) => (
                <NotificationToast
                    key={notification.id}
                    notification={notification}
                    onClose={closeNotification}
                />
            ))}
        </div>
    );
};

export default NotificationContainer;
