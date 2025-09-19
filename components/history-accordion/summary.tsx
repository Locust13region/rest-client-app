import { composeUrl } from '@/service/urlUtils';
import { AccordionSummary, Stack, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RequestHistory } from '@/types/history';
import GetLink from '../common/GetLink';

type SummaryProps = {
  historyItem: RequestHistory;
  index: number;
};

const Summary = ({ historyItem, index }: SummaryProps) => {
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
      <Typography
        component="span"
        flexBasis="10%"
        flexGrow={1}
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        <GetLink link={composedHref} name={historyItem.endpoint} />
      </Typography>
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
