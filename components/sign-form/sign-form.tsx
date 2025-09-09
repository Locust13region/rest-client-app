import Box from '@mui/material/Box';
import { FC, FormEventHandler, ReactNode } from 'react';

type SignFormProps = {
  handleSubmit: FormEventHandler;
  children: ReactNode;
};

const SignForm: FC<SignFormProps> = ({ handleSubmit, children }) => {
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      {children}
    </Box>
  );
};

export default SignForm;
