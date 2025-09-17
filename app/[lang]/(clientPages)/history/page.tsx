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
import { SyntheticEvent, useState } from 'react';
import Link from 'next/link';

//TODO fallback при пустом списке
//TODO перенос endpoint на узком экране

function History() {
  const dbRef = ref(database);
  get(child(dbRef, `history`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log(snapshot.val());
      } else {
        console.log('No data available');
      }
    })
    .catch((error) => {
      console.error(error);
    });

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange =
    (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Stack paddingRight={4}>
      <Typography component={'h2'} marginBottom={2}>
        Query history
      </Typography>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange('panel1')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Link href="/" onClick={(e) => e.stopPropagation()}>
            <Typography
              component="span"
              color="retry"
              sx={{ marginRight: 2, minWidth: '20%', flexShrink: 0 }}
            >
              Retry
            </Typography>
          </Link>
          <Typography
            component="span"
            color="get"
            textTransform="uppercase"
            flexBasis="20%"
            maxWidth={150}
            sx={{ flexShrink: 0 }}
          >
            get
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
            https://https://jsonplaceholder.typicode.com/
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction={{ sm: 'column', md: 'row' }} spacing={3}>
            <Typography sx={{ color: 'text.secondary' }}>
              `Request Timestamp: ${}`
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              `Request Status Code: ${}`
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              `Request Duration: ${}`
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              `Request Size: ${}`
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              `Response Size: ${}`
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              `Error Details: ${}`
            </Typography>
          </Stack>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel2'}
        onChange={handleChange('panel2')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
            Users
          </Typography>
          <Typography component="span" sx={{ color: 'text.secondary' }}>
            You are currently not an owner
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat
            lectus, varius pulvinar diam eros in elit. Pellentesque convallis
            laoreet laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel3'}
        onChange={handleChange('panel3')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
            Advanced settings
          </Typography>
          <Typography component="span" sx={{ color: 'text.secondary' }}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === 'panel4'}
        onChange={handleChange('panel4')}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography component="span" sx={{ width: '33%', flexShrink: 0 }}>
            Personal data
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
            sit amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}

export default History;
