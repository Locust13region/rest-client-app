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
  const closeSnackMessage = (id: string) => {
    console.log('snack id', id);
    const newSnacks = snackMessages.filter((message) => message.id !== id);
    console.log(newSnacks);
    setSnackMessages(newSnacks);
  };

  const autoCloseSnackMessage = () => {
    setSnackMessages([]);
  };

  return (
    <MessageContext value={{ addSnackMessage }}>
      {children}
      {snackMessages.map((snack, index) => (
        <Snackbar
          key={snack.id}
          open
          slotProps={{
            clickAwayListener: {
              onClickAway: (event) => {
                event.defaultPrevented;
              },
            },
          }}
          autoHideDuration={3000}
          onClose={autoCloseSnackMessage}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          sx={{ top: `${index * 60}px !important` }}
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
