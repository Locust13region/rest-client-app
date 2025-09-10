'use client';

import { UrlBox, UrlInput, UrlMenuItem } from '@/style/styledRequestInputs';
import { httpMethods, httpMethodsValues } from '@/types/restClient';
import { Box, Button, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import { useParams, usePathname, useRouter } from 'next/navigation';
import {
  ChangeEvent,
  ReactNode,
  SetStateAction,
  SyntheticEvent,
  useState,
  FocusEvent,
} from 'react';

interface TabPanelProps {
  children: ReactNode;
  index: number;
  value: number;
}

interface RestProps {
  [key: string]: any;
}

function TabPanel(props: TabPanelProps & RestProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `tab-${index}`,
    'aria-controls': `tabpanel-${index}`,
  };
}

const composeUrl = (path: string, method?: string, url?: string) => {
  const pageSlug = '/client';
  const index = path.indexOf(pageSlug);
  let newPath = path;
  const encodedUrl = url ? encodeURIComponent(url) : undefined;
  const vars = [method, encodedUrl];

  if (index !== -1) {
    const initPath = path.slice(0, index + pageSlug.length) + '/';
    newPath =
      vars.reduce((acc, param) => {
        if (!param) return acc;
        return acc?.concat(`${param}/`);
      }, initPath) ?? newPath;
  }
  return newPath;
};

function RequestEditor() {
  const { slug } = useParams();
  const router = useRouter();
  const path = usePathname();

  let initMethod = 'GET';
  let initUrl = '';
  if (slug) {
    initMethod = slug[0].toUpperCase();
    initUrl = decodeURIComponent(slug[1] ?? '');
  }

  const [currentTab, setCurrentTab] = useState(0);
  const [method, setMethod] = useState<string>(initMethod as httpMethods);
  const [url, setUrl] = useState<string>(initUrl);

  const handleTabChange = (
    event: SyntheticEvent,
    newValue: SetStateAction<number>
  ) => {
    event.preventDefault();
    setCurrentTab(newValue);
  };

  const handleMethodChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSlug = event.target.value;
    setMethod(newSlug);
    router.replace(composeUrl(path, newSlug));
  };

  const handleUrlBlur = (event: FocusEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setUrl(url);
    if (url) {
      router.replace(composeUrl(path, method, url));
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        maxWidth: { md: 800 },
      }}
    >
      <Toolbar>
        <UrlBox id="wrapper">
          <UrlInput
            id="method"
            value={method}
            select
            onChange={handleMethodChange}
            sx={{ width: '98px' }}
          >
            {httpMethodsValues.map((m) => (
              <UrlMenuItem key={m} value={m}>
                {m}
              </UrlMenuItem>
            ))}
          </UrlInput>
          <UrlInput
            id="url"
            variant="outlined"
            placeholder="Enter URL"
            value={url}
            onBlur={handleUrlBlur}
            onChange={(e) => setUrl(e.currentTarget.value)}
            sx={{ flexGrow: 2, border: 0 }}
          ></UrlInput>
        </UrlBox>
        <Button id="send" variant="contained" color="primary" size="large">
          Send
        </Button>
      </Toolbar>
      <Tabs
        value={currentTab}
        onChange={handleTabChange}
        aria-label="request params tabs"
      >
        <Tab label="Query" {...a11yProps(0)}></Tab>
        <Tab label="Headers" {...a11yProps(1)}></Tab>
        <Tab label="Body" {...a11yProps(2)}></Tab>
        <Tab label="Code snippets" {...a11yProps(3)}></Tab>
      </Tabs>
      <TabPanel value={currentTab} index={0}>
        Query Component
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        Headers Component
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        Body Component
      </TabPanel>
      <TabPanel value={currentTab} index={3}>
        Code Component
      </TabPanel>
    </Box>
  );
}

export default RequestEditor;
