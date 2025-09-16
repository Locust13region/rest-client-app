'use client';

import { UrlBox, UrlInput, UrlMenuItem } from '@/style/styledRequestInputs';
import {
  HttpMethods,
  httpMethodsValues,
  RestRequest,
} from '@/types/restClient';
import { Box, Button, Toolbar } from '@mui/material';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, useState, FocusEvent, useEffect } from 'react';
import RequestSettings from './RequestSettings';
import { composeHeaders, composeUrl } from '@/service/urlUtils';
import { useTranslations } from 'next-intl';
import { useClientStore } from '@/store/clientStore';

const CLIENT_PAGE = '/client';

function RequestEditor({
  onSend,
}: {
  onSend: (_req: RestRequest) => Promise<void>;
}) {
  const { slug } = useParams();
  const router = useRouter();
  const path = usePathname();
  const t = useTranslations('RequestEditor');

  let initMethod = 'GET';
  let initUrl = '';
  let initBody = undefined;

  if (slug) {
    initMethod = slug[0].toUpperCase();
    initUrl = slug[1] ? atob(decodeURIComponent(slug[1])) : '';
    initBody = slug[2] ? atob(decodeURIComponent(slug[2])) : undefined;
  }

  const [method, setMethod] = useState<string>(initMethod as HttpMethods);
  const [url, setUrl] = useState<string>(initUrl);
  const [body, setBody] = useState<string | undefined>(initBody);
  const headers = useClientStore((store) => store.headers);

  const handleMethodChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newSlug = event.target.value;
    setMethod(newSlug);
  };

  const handleUrlBlur = (event: FocusEvent<HTMLInputElement>) => {
    const url = event.target.value;
    setUrl(url);
  };

  const handleBodyChange = (event: ChangeEvent<HTMLInputElement>) => {
    const body = event.target.value;
    setBody(body);
  };

  const handleSend = () => {
    const request: RestRequest = {
      url: url,
      method: method as HttpMethods,
      body: body ? btoa(body) : undefined,
    };
    onSend(request);
  };

  useEffect(() => {
    if (headers) {
      const headersStr = composeHeaders(headers);
      router.replace(
        composeUrl(CLIENT_PAGE, path, method, url, body, headersStr)
      );
    }
  }, [method, url, body, headers, path, router]);

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
            placeholder={t('urlPlaceholder')}
            value={url}
            onBlur={handleUrlBlur}
            onChange={(e) => setUrl(e.currentTarget.value)}
            sx={{ flexGrow: 2, border: 0 }}
          ></UrlInput>
        </UrlBox>
        <Button
          id="send"
          variant="contained"
          color="primary"
          size="large"
          onClick={handleSend}
        >
          {t('send')}
        </Button>
      </Toolbar>
      <RequestSettings body={body} onBodyChange={handleBodyChange} />
    </Box>
  );
}

export default RequestEditor;
