import { composeUrl } from '@/service/urlUtils';
import { AccordionSummary, IconButton, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
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
      <Typography
        component="span"
        color={historyItem.requestMethod.toLowerCase()}
        textTransform="uppercase"
        flexBasis="20%"
        maxWidth={150}
        padding={2}
        sx={{ flexShrink: 0 }}
      >
        {historyItem.requestMethod}
      </Typography>
      <IconButton
        component={Link}
        href={composedHref}
        size="large"
        disableRipple
        disableFocusRipple
        sx={{
          '&:hover': {
            textDecorationLine: 'underline',
          },
          justifyContent: 'start',
          flexBasis: '10%',
          flexGrow: 1,
          color: 'text.primary',
          overflow: 'hidden',
        }}
      >
        <Typography
          component="span"
          sx={{
            color: 'inherit',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {historyItem.endpoint}
        </Typography>
      </IconButton>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`panel${index}bh-content`}
        id={`panel${index}bh-header`}
        sx={{ flexBasis: 4 }}
      ></AccordionSummary>
    </Stack>
  );
};

export default Summary;
