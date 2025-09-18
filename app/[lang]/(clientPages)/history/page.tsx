'use client';

import { database } from '@/firebase/config';
import { ref, child, get } from 'firebase/database';
import { Accordion, Stack, Typography } from '@mui/material';
import { SyntheticEvent, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { RequestHistory } from '@/types/history';
import Summary from '@/components/history-accordion/summary';
import Details from '@/components/history-accordion/details';

function History() {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [history, setHistory] = useState<RequestHistory[]>([]);
  const t = useTranslations('History');

  useEffect(() => {
    const dbRef = ref(database);
    get(child(dbRef, `history`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const normalized: RequestHistory[] = Object.entries(data).map(
            ([uuid, item]) => ({
              uuid,
              ...(item as Omit<RequestHistory, 'uuid'>),
            })
          );
          setHistory(normalized);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleChange =
    (panel: string) => (_event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Stack paddingRight={4} maxHeight={'100%'}>
      <Typography component={'h3'} marginBottom={2}>
        {t('title')}
      </Typography>
      {history.length === 0 ? (
        <Typography color="text.secondary">No history available</Typography>
      ) : (
        history.map((historyItem, index) => {
          return (
            <Accordion
              key={historyItem.uuid}
              expanded={expanded === `panel${index}`}
              onChange={handleChange(`panel${index}`)}
            >
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
