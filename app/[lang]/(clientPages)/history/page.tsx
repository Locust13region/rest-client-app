'use client';

import { database } from '@/firebase/config';
import { ref, child, get } from 'firebase/database';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
} from '@mui/material';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReplayIcon from '@mui/icons-material/Replay';
import { SyntheticEvent, useEffect, useState } from 'react';
import Link from 'next/link';
import { dateFormat } from '@/service/dateFormat';
import { useTranslations } from 'next-intl';
import { RequestHistory } from '@/types/history';
import { composeUrl } from '@/service/urlUtils';

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
        history.map((historyItem, index) => (
          <Accordion
            key={historyItem.uuid}
            expanded={expanded === `panel${index}`}
            onChange={handleChange(`panel${index}`)}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index}bh-content`}
              id={`panel${index}bh-header`}
            >
              <Link
                href={composeUrl({
                  url: historyItem.endpoint,
                  method: historyItem.requestMethod,
                  body: historyItem.requestBody,
                  headers:
                    historyItem.requestHeaders &&
                    JSON.parse(historyItem.requestHeaders),
                })}
                onClick={(e) => e.stopPropagation()}
              >
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
          </Accordion>
        ))
      )}
    </Stack>
  );
}

export default History;
