import { describe, expect, it, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import RequestEditor from './RequestEditor';
import { renderWithProviders } from '@/__tests__/setupTests';
import { beforeEach } from 'node:test';
import {
  ReadonlyURLSearchParams,
  useParams,
  useSearchParams,
} from 'next/navigation';

vi.mock('next/navigation', async () => {
  const actual = await vi.importActual('next/navigation');

  return {
    __esModule: true,
    ...actual,
    useParams: vi.fn().mockReturnValue({ slug: '' }),
    useRouter: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

describe('RequestEditor', () => {
  beforeEach(() => {});
  it('renders correctly in EN locale', () => {
    const handleSend = vi.fn();
    vi.mocked(useParams).mockReturnValue({ slug: '' });
    vi.mocked(useSearchParams).mockImplementation(
      () => new URLSearchParams('') as ReadonlyURLSearchParams
    );

    renderWithProviders(<RequestEditor onSend={handleSend} />, {
      locale: 'en',
    });

    expect(screen.getByRole('combobox')).toHaveTextContent(/get/i);
    expect(screen.getByPlaceholderText(/enter URL/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /send/i })).toBeInTheDocument();
  });
  it('renders correctly in RU locale', () => {
    const handleSend = vi.fn();
    vi.mocked(useParams).mockReturnValue({ slug: '' });
    vi.mocked(useSearchParams).mockImplementation(
      () => new URLSearchParams('') as ReadonlyURLSearchParams
    );

    renderWithProviders(<RequestEditor onSend={handleSend} />, {
      locale: 'ru',
    });

    expect(screen.getByRole('combobox')).toHaveTextContent(/get/i);
    expect(screen.getByPlaceholderText(/введите URL/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /выполнить/i })
    ).toBeInTheDocument();
  });
  it('restores settings from URL', async () => {
    const handleSend = vi.fn();
    const headers = 'Content-Type=application/json';
    const url = 'https://jsonplaceholder.typicode.com/posts';
    //const body = '{"title":"Hello World"}';
    vi.mocked(useParams).mockReturnValue({
      slug: [
        'POST',
        'aHR0cHM6Ly9qc29ucGxhY2Vob2xkZXIudHlwaWNvZGUuY29tL3Bvc3Rz',
        'eyJ0aXRsZSI6ImZha2VUaXRsZSIsInVzZXJJZCI6MSwiYm9keSI6ImZha2VNZXNzYWdlIn0=',
      ],
    });
    vi.mocked(useSearchParams).mockImplementation(
      () => new URLSearchParams(headers) as ReadonlyURLSearchParams
    );

    const { user } = renderWithProviders(
      <RequestEditor onSend={handleSend} />,
      {
        locale: 'en',
      }
    );

    const headersTab = screen.getByRole('tab', { name: /headers/i });
    await user.click(headersTab);
    expect(headersTab).toHaveTextContent(/headers/i);

    await waitFor(() => {
      expect(screen.getByRole('combobox')).toHaveTextContent(/post/i);
      expect(screen.getByPlaceholderText(/enter URL/i)).toHaveValue(url);
      const keys = screen.getAllByPlaceholderText(/header/i);
      const vals = screen.getAllByPlaceholderText(/value/i);
      expect(keys[0]).toHaveValue(headers.split('=')[0]);
      expect(vals[0]).toHaveValue(headers.split('=')[1]);
      //expect(within(bodyTab).getByRole('textbox')).toHaveValue(body);
    });
  });
  it('triggers settings updates', async () => {
    const handleSend = vi.fn();
    const handleMethodChange = vi.fn();
    vi.mocked(useParams).mockReturnValue({ slug: '' });
    vi.mocked(useSearchParams).mockImplementation(
      () => new URLSearchParams('') as ReadonlyURLSearchParams
    );

    const { user } = renderWithProviders(
      <RequestEditor onSend={handleSend} />,
      {
        locale: 'en',
      }
    );

    const methodSelect = screen.getByRole('combobox');
    await user.click(methodSelect);
    await waitFor(() => {
      const put = screen.getByRole('listitem', { name: /put/i });
      expect(put).toBeInTheDocument();
    });
    await user.selectOptions(methodSelect, 'PUT');
    await waitFor(() => {
      expect(screen.getByRole('combobox')).toHaveTextContent(/put/i);
      expect(handleMethodChange).toBeCalled();
    });
  });
});
