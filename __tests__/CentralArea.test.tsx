import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CentralArea from '@/components/main-page/CentralArea';

vi.mock('next-intl', () => ({
  useTranslations: vi.fn(() => (key: string) => key),
}));

describe('CentralArea Component', () => {
  it('renders the component without crashing', () => {
    render(<CentralArea />);
    expect(
      screen.getByRole('heading', { name: /welcome/i })
    ).toBeInTheDocument();
  });

  it('displays the welcome title', () => {
    render(<CentralArea />);
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent('welcome');
  });

  it('renders sign-in button with correct text and link', () => {
    render(<CentralArea />);
    const signInButton = screen.getByRole('link', { name: /signIn/i });
    expect(signInButton).toBeInTheDocument();
    expect(signInButton).toHaveAttribute('href', '/signin');
    expect(signInButton).toHaveTextContent('signIn');
  });

  it('renders sign-up button with correct text and link', () => {
    render(<CentralArea />);
    const signUpButton = screen.getByRole('link', { name: /signUp/i });
    expect(signUpButton).toBeInTheDocument();
    expect(signUpButton).toHaveAttribute('href', '/signup');
    expect(signUpButton).toHaveTextContent('signUp');
  });

  it('applies responsive styles (basic check)', () => {
    render(<CentralArea />);
    const container = document.querySelector('.MuiContainer-root');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('MuiContainer-maxWidthSm');
  });
});
