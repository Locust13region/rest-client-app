import { Accordion, Stack, Typography } from '@mui/material';
import Summary from '@/components/history-accordion/summary';
import { getTranslations } from 'next-intl/server';
import { fetchHistory } from '@/app/dbActions';
import { FC, lazy } from 'react';
import { redirect } from 'next/navigation';

const DetailsLazy = lazy(
  () => import('@/components/history-accordion/details')
);

type HistoryProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

const History: FC<HistoryProps> = async ({ searchParams }) => {
  const t = await getTranslations('History');
  const params = await searchParams;
  const userId = params.user as string | undefined;
  if (!userId) {
    redirect('/main'); ////////////////////////////////надо подумать куда
  }
  const history = await fetchHistory(userId);

  return (
    <Stack paddingRight={4} maxHeight={'100%'} sx={{ overflowY: 'auto' }}>
      <Typography component={'h3'} marginBottom={2}>
        {t('title')}
      </Typography>
      {history.length === 0 ? (
        <Typography color="text.secondary">No history available</Typography>
      ) : (
        history.map((historyItem, index) => {
          return (
            <Accordion key={historyItem.uuid}>
              <Summary historyItem={historyItem} index={index} />
              <DetailsLazy historyItem={historyItem} />
            </Accordion>
          );
        })
      )}
    </Stack>
  );
};

export default History;
