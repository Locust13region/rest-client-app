import { render, screen } from '@testing-library/react';
import { describe, it, vi, beforeEach, expect } from 'vitest';
import Summary from '@/components/history-accordion/summary';
import { RequestHistory } from '@/types/history';

vi.mock('@/service/dateFormat', () => ({
  dateFormat: vi.fn(() => '2025-09-21 12:00:00'),
}));

vi.mock('@/service/urlUtils', () => ({
  composeUrl: vi.fn(() => '/mocked/url'),
}));

vi.mock('@/components/common/GetLink', () => ({
  default: ({ name }: { name: string }) => (
    <span data-testid="get-link">{name}</span>
  ),
}));

describe('Summary component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders all fields from history item', () => {
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

    render(<Summary historyItem={mockHistory} index={0} />);
    expect(screen.getByText('2025-09-21 12:00:00')).toBeInTheDocument();
    expect(screen.getByText('GET')).toBeInTheDocument();
    expect(screen.getByTestId('get-link')).toHaveTextContent('/api/test');
  });
});
