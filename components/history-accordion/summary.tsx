import { composeUrl } from '@/service/urlUtils';
import { AccordionSummary, IconButton, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReplayIcon from '@mui/icons-material/Replay';
import Link from 'next/link';
import { FC } from 'react';
import { RequestHistory } from '@/types/history';

type SummaryProps = {
  historyItem: RequestHistory;
  index: number;
};

const Summary: FC<SummaryProps> = ({ historyItem, index }) => {
  const composedHref = composeUrl({
    url: historyItem.endpoint,
    method: historyItem.requestMethod,
    body: historyItem.requestBody,
    headers:
      historyItem.requestHeaders && JSON.parse(historyItem.requestHeaders),
  });

  return (
    <Stack direction="row" alignItems="center">
      <IconButton
        component={Link}
        href={composedHref}
        size="large"
        sx={{ '&:hover': { borderRadius: 1 } }}
      >
        <ReplayIcon sx={{ color: 'text.secondary' }} />
      </IconButton>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${index}bh-content`}
        id={`panel${index}bh-header`}
      >
        <Typography
          component="span"
          color={historyItem.requestMethod.toLowerCase()}
          textTransform="uppercase"
          flexBasis="20%"
          maxWidth={150}
          sx={{ flexShrink: 0 }}
        >
          {historyItem.requestMethod}
        </Typography>
        <Typography
          component="span"
          sx={{
            color: 'text.primary',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            maxWidth: '70%',
          }}
        >
          {historyItem.endpoint}
        </Typography>
      </AccordionSummary>
    </Stack>
  );
};

export default Summary;
