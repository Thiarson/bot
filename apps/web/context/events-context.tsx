"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode, useRef } from 'react';
import { useSocket } from '@/context/socket-context';
import { useNotification } from '@/context/notification-context';

export const SOCKET_EVENTS = {
  CV_EXTRACTED: 'cv:extracted',
} as const;

type SocketEventType = typeof SOCKET_EVENTS[keyof typeof SOCKET_EVENTS];

interface CVExtractionData {
  status: 'success' | 'error';
  error?: string;
  cvId?: string;
}

interface SocketEvent<T = any> {
  type: SocketEventType;
  data: T;
  timestamp: number;
}

type EventHandler<T = any> = (data: T) => void;

interface SocketEventsContextType {
  subscribe: <T = any>(eventType: SocketEventType, handler: EventHandler<T>) => () => void;
  getLastEvent: (eventType: SocketEventType) => SocketEvent | null;
}

const SocketEventsContext = createContext<SocketEventsContextType | undefined>(undefined);

export function SocketEventsProvider({ children }: { children: ReactNode }) {
  const { socket } = useSocket();
  const { showNotification } = useNotification();
  
  // Store the last event of each type
  const [lastEvents, setLastEvents] = useState<Map<SocketEventType, SocketEvent>>(new Map());
  
  // Use ref instead of state to avoid re-renders
  const subscribersRef = useRef<Map<SocketEventType, Set<EventHandler>>>(new Map());

  // Subscribe to an event type
  const subscribe = useCallback(<T = any>(eventType: SocketEventType, handler: EventHandler<T>) => {
    const handlers = subscribersRef.current.get(eventType) || new Set();
    handlers.add(handler as EventHandler);
    subscribersRef.current.set(eventType, handlers);

    // Return unsubscribe function
    return () => {
      const handlers = subscribersRef.current.get(eventType);
      if (handlers) {
        handlers.delete(handler as EventHandler);
        if (handlers.size === 0) {
          subscribersRef.current.delete(eventType);
        }
      }
    };
  }, []);

  // Get the last event of a specific type
  const getLastEvent = useCallback((eventType: SocketEventType): SocketEvent | null => {
    return lastEvents.get(eventType) || null;
  }, [lastEvents]);

  // Notify all subscribers of an event
  const notifySubscribers = useCallback((eventType: SocketEventType, data: any) => {
    const handlers = subscribersRef.current.get(eventType);
    handlers?.forEach(handler => {
      try {
        handler(data);
      } catch (error) {
        console.error(`Error in socket event handler for ${eventType}:`, error);
      }
    });
  }, []); // No dependencies needed since we use ref

  // Handle CV extraction event globally
  useEffect(() => {
    if (!socket) return;

    const handleCvExtracted = (data: CVExtractionData) => {
      // Store the event
      const event: SocketEvent<CVExtractionData> = {
        type: SOCKET_EVENTS.CV_EXTRACTED,
        data,
        timestamp: Date.now()
      };

      setLastEvents(prev => new Map(prev).set(SOCKET_EVENTS.CV_EXTRACTED, event));

      // Show global notification
      if (data.status === "success") {
        showNotification('CV imported and parsed successfully!', 'success');
      } else {
        showNotification(data.error || 'Failed to parse CV', 'error');
      }

      // Notify subscribers
      notifySubscribers(SOCKET_EVENTS.CV_EXTRACTED, data);
    };

    socket.on(SOCKET_EVENTS.CV_EXTRACTED, handleCvExtracted);

    return () => {
      socket.off(SOCKET_EVENTS.CV_EXTRACTED, handleCvExtracted);
    };
  }, [socket, showNotification, notifySubscribers]);

  return (
    <SocketEventsContext.Provider value={{ subscribe, getLastEvent }}>
      {children}
    </SocketEventsContext.Provider>
  );
}

export function useSocketEvents() {
  const context = useContext(SocketEventsContext);
  if (!context) {
    throw new Error('useSocketEvents must be used within SocketEventsProvider');
  }
  return context;
}

// Convenience hook for CV extraction events
export function useCVExtraction(onSuccess?: (data: CVExtractionData) => void) {
  const { subscribe } = useSocketEvents();

  useEffect(() => {
    if (!onSuccess) return;

    const unsubscribe = subscribe(SOCKET_EVENTS.CV_EXTRACTED, (data: CVExtractionData) => {
      if (data.status === 'success') {
        onSuccess(data);
      }
    });

    return unsubscribe;
  }, [subscribe, onSuccess]);
}
