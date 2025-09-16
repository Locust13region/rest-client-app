import { Tab, Tabs, TextField } from '@mui/material';
import TabPanel from '../common/TabPanel';
import { ChangeEvent, memo, SyntheticEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { a11yTabProps } from '@/service/tabsUtils';
import { useClientStore } from '@/store/clientStore';
import KeyValueEditor from './KeyValueEditor';

interface RequestSettingsProps {
  body?: string;
  onBodyChange: (_event: ChangeEvent<HTMLInputElement>) => void;
}

const RequestSettings = memo(function RequestSettings({
  body,
  onBodyChange,
}: RequestSettingsProps) {
  const t = useTranslations('RequestEditor');
  const setStoreTab = useClientStore((state) => state.setTab);
  const storeTab = useClientStore((state) => state.currentTab);
  const [currentTab, setCurrentTab] = useState(storeTab);

  const handleTabChange = (event: SyntheticEvent, value: number) => {
    event.preventDefault();
    setStoreTab(value);
    setCurrentTab(value);
  };

  const TabPanelSx = {
    height: '255px',
    overflowY: 'auto',
  };

  return (
    <>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        aria-label="request params tabs"
        sx={{ borderBottom: 1, borderColor: 'divider' }}
      >
        <Tab label={t('headers')} {...a11yTabProps(0)}></Tab>
        <Tab label={t('body')} {...a11yTabProps(1)}></Tab>
        <Tab label={t('codeSnippets')} {...a11yTabProps(2)}></Tab>
      </Tabs>
      <TabPanel key={0} value={currentTab} index={0} sx={TabPanelSx}>
        <KeyValueEditor />
      </TabPanel>
      <TabPanel key={1} value={currentTab} index={1} sx={TabPanelSx}>
        <p>Body Component</p>
        <TextField
          id="body"
          value={body ?? ''}
          onChange={onBodyChange}
        ></TextField>
      </TabPanel>
      <TabPanel key={2} value={currentTab} index={2} sx={TabPanelSx}>
        <p>Code Component</p>
      </TabPanel>
    </>
  );
});

export default RequestSettings;
