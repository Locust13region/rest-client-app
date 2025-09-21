import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import Details from '@/components/history-accordion/details';
import { RequestHistory } from '@/types/history';

vi.mock('next-intl/server', () => ({
  getTranslations: vi.fn(async () => (key: string) => key),
}));

describe('Details component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all fields from history item', async () => {
    const mockHistory: RequestHistory = {
      uuid: '1',
      userId: '123',
      endpoint: '/api/test',
      requestMethod: 'GET',
      requestHeaders: '{}',
      requestBody: '',
      requestSize: '100',
      requestTimestamp: 1758465276478,
      responseSize: '100',
      responseStatus: 200,
      errorDetails: 'Ok',
      requestDuration: '100',
    };

    render(await Details({ historyItem: mockHistory }));

    expect(screen.getByText('status')).toBeInTheDocument();
    expect(screen.getByText('200')).toBeInTheDocument();
    expect(screen.getByText('duration100ms')).toBeInTheDocument();
    expect(screen.getByText('requestSize100B')).toBeInTheDocument();
    expect(screen.getByText('responseSize100B')).toBeInTheDocument();
    expect(screen.getByText('errorDetailsOk')).toBeInTheDocument();
  });
});
