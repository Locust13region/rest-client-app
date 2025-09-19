import { Accordion, Stack, Typography } from '@mui/material';
import Summary from '@/components/history-accordion/summary';
import Details from '@/components/history-accordion/details';
import { getTranslations } from 'next-intl/server';
import { fetchHistory } from '@/app/dbActions';

async function History() {
  const t = await getTranslations('History');

  const history = await fetchHistory();

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
              <Details historyItem={historyItem} />
            </Accordion>
          );
        })
      )}
    </Stack>
  );
}

export default History;
