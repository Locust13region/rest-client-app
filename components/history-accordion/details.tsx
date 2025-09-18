import { dateFormat } from '@/service/dateFormat';
import { RequestHistory } from '@/types/history';
import { AccordionDetails, Stack, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { FC } from 'react';

type DetailsProps = { historyItem: RequestHistory };

const Details: FC<DetailsProps> = ({ historyItem }) => {
  const t = useTranslations('History');
  return (
    <AccordionDetails>
      <Stack direction={{ sm: 'column', md: 'row' }} spacing={3}>
        <Typography sx={{ color: 'text.secondary' }}>
          {dateFormat(historyItem.requestTimestamp)}
        </Typography>
        <Stack direction={'row'} flexWrap={'wrap'}>
          <Typography
            component="span"
            sx={{ color: 'text.secondary', marginRight: 1 }}
          >
            {t('status')}
          </Typography>
          <Typography
            component="span"
            color={historyItem.responseStatus < 400 ? 'get' : 'delete'}
          >
            {historyItem.responseStatus}
          </Typography>
        </Stack>
        <Typography sx={{ color: 'text.secondary' }}>
          {t('duration') + historyItem.requestDuration + 'ms'}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {t('requestSize') + historyItem.requestSize + 'B'}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {t('responseSize') + historyItem.responseSize + 'B'}
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>
          {t('errorDetails') + historyItem.errorDetails}
        </Typography>
      </Stack>
    </AccordionDetails>
  );
};

export default Details;
