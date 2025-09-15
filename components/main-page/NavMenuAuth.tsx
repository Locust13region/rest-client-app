import { Box } from '@mui/material';

import { useTranslations } from 'next-intl';
import GetLink from '../common/GetLink';

function NavMenuAuth() {
  const t = useTranslations('Home');

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'row', sm: 'column' },
        gap: 2,
        whiteSpace: 'nowrap',
      }}
    >
      <GetLink link="" name={t('restClient')} />
      <GetLink link="" name={t('history')} />
      <GetLink link="" name={t('variables')} />
    </Box>
  );
}

export default NavMenuAuth;
