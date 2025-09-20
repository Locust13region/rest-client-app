import React from 'react';
import { RestResponse } from '@/types/restClient';
import { Typography, Box, TextField, Container, Button } from '@mui/material';
import { useTranslations } from 'next-intl';
import { MessageContext } from '@/components/common/MessageContextProvider';
import { useContext } from 'react';

interface IResponseViewProps {
  response?: RestResponse | Error | object;
  bodyReq?: string | undefined;
  bodyChange?: (_value: string) => void;
  setBodyReq?: React.Dispatch<React.SetStateAction<string | undefined>>;
}

function ResponseView({
  response,
  bodyReq,
  bodyChange,
  setBodyReq,
}: IResponseViewProps) {
  const t = useTranslations('Response');
  const { addSnackMessage } = useContext(MessageContext);

  if (response) {
    if ('status' in response && 'body' in response) {
      const { status, body } = response as RestResponse;

      const formattedResponse = body
        ? (() => {
            try {
              const parsed = JSON.parse(body);
              return JSON.stringify(parsed, null, 2);
            } catch {
              return body;
            }
          })()
        : 'No body available.';

      return (
        <Box
          sx={{
            marginRight: { xs: '5%', sm: '10%', md: '18%' },
            marginLeft: { xs: '5%' },
          }}
        >
          <Box
            sx={{
              color: '#b6d3ebff',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.5rem' },
                }}
              >
                {t('resp')}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontSize: { xs: '1.1rem', md: '1.5rem' },
                }}
              >
                {t('status')}: {status}
              </Typography>
            </Box>
          </Box>
          <TextField
            multiline
            disabled
            value={formattedResponse}
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  border: 'none',
                },
              },
              '& .MuiInputBase-input': {
                color: '#ffffffff',
                '&.Mui-disabled': {
                  color: '#e0e0e0',
                  WebkitTextFillColor: '#e0e0e0',
                  opacity: 1,
                },
                whiteSpace: 'pre-wrap',
              },
              padding: { xs: '8px', md: '10px' },
              border: '1px solid #b6d3ebff',
              backgroundColor: '#474343ff',
              height: { xs: '45vh', sm: '30vh', md: '30vh' },
              overflow: 'auto',
              fontSize: { xs: '0.8rem', md: '1rem' },
              width: { xs: '70vh', sm: '80vh', md: '100vh' },
            }}
          />
        </Box>
      );
    }

    if (response instanceof Error) {
      addSnackMessage({
        text: 'Response Error !',
        messageType: 'error',
      });
    }

    return (
      <Box
        sx={{
          marginRight: { xs: '5%', sm: '10%', md: '15%' },
          marginLeft: { xs: '5%', sm: '10%' },
          padding: { xs: '8px', md: '16px' },
        }}
      >
        <Typography
          variant="body2"
          sx={{
            fontSize: { xs: '0.8rem', md: '1rem' },
          }}
        >
          No response data available.
        </Typography>
      </Box>
    );
  }

  if (bodyChange && setBodyReq) {
    const handleFormat = () => {
      if (!bodyReq || bodyReq.trim() === '') return;
      try {
        const parsed = JSON.parse(bodyReq);
        const formatted = JSON.stringify(parsed, null, 2);
        setBodyReq(formatted);
        bodyChange(formatted);
      } catch (error) {
        addSnackMessage({
          text: `Invalid JSON:  ${(error as Error).message}`,
          messageType: 'error',
        });
      }
    };

    return (
      <Container>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <p>Body Component</p>
          <Button variant="contained" onClick={handleFormat}>
            Format JSON
          </Button>
        </Box>

        <TextField
          multiline
          minRows={4}
          maxRows={4}
          sx={{
            width: '72vh',
            whiteSpace: 'pre-wrap',
            padding: { xs: '8px', md: '10px' },
            height: { xs: '40vh', sm: '30vh', md: '19vh' },
            overflow: 'auto',
            fontSize: { xs: '0.8rem', md: '1rem' },
          }}
          value={bodyReq ?? ''}
          onChange={(e) => setBodyReq(e.target.value)}
          onBlur={() => {
            bodyChange(bodyReq ?? '');
          }}
        ></TextField>
      </Container>
    );
  }
}

export default ResponseView;
