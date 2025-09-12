'use client';

import { Alert, Snackbar } from '@mui/material';
import { createContext, ReactNode, useState } from 'react';

type SnackbarMessage = {
  text: string;
  messageType: 'success' | 'error' | 'warning' | 'info';
};

type ContextMessage = {
  id: string;
} & SnackbarMessage;

type MessageContextType = {
  addSnackMessage: (_message: SnackbarMessage) => void;
};

export const MessageContext = createContext<MessageContextType>({
  addSnackMessage: () => {},
});

export default function MessageProvider({ children }: { children: ReactNode }) {
  const [snackMessages, setSnackMessages] = useState<ContextMessage[]>([]);

  const addSnackMessage = (message: SnackbarMessage) => {
    setSnackMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), ...message },
    ]);
  };
  const closeSnackMessage = (id: string) =>
    setSnackMessages(snackMessages.filter((message) => message.id !== id));

  return (
    <MessageContext value={{ addSnackMessage }}>
      {children}
      {snackMessages.map((snack) => (
        <Snackbar
          key={snack.id}
          open
          autoHideDuration={3000}
          onClose={() => closeSnackMessage(snack.id)}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        >
          <Alert
            severity={snack.messageType}
            onClose={() => closeSnackMessage(snack.id)}
          >
            {snack.text}
          </Alert>
        </Snackbar>
      ))}
    </MessageContext>
  );
}
