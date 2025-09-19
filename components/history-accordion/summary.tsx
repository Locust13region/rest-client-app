import { composeUrl } from '@/service/urlUtils';
import { AccordionSummary, Typography } from '@mui/material';
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
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls={`panel${index}bh-content`}
      id={`panel${index}bh-header`}
    >
      <Link href={composedHref} onClick={(e) => e.stopPropagation()}>
        <ReplayIcon
          fontSize="small"
          sx={{ color: 'text.secondary', marginRight: 2 }}
        />
      </Link>
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
  );
};

export default Summary;
