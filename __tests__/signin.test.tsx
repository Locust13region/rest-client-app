import { describe, expect, it, Mock, vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import SignIn from '@/app/[lang]/signin/page';
import { renderWithProviders } from './setupTests';
import {
  useAuthState,
  useSignInWithEmailAndPassword,
} from 'react-firebase-hooks/auth';

vi.mock('@/firebase/config', () => ({
  auth: {
    currentUser: null,
    onAuthStateChanged: vi.fn(),
    signOut: vi.fn(),
  },
}));

vi.mock('react-firebase-hooks/auth', () => ({
  useAuthState: vi.fn(),
  useSignInWithEmailAndPassword: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
  }),
  redirect: vi.fn(),
}));

describe('Signin page', () => {
  it('renders correctly in EN locale', async () => {
    const handleSubmit = vi.fn().mockImplementation((e) => e.preventDefault());
    (useAuthState as Mock).mockReturnValue([null, false, undefined]);
    (useSignInWithEmailAndPassword as Mock).mockReturnValue([
      vi.fn().mockResolvedValue({ user: { uid: '123' } }),
      null,
      false,
      null,
    ]);
    const { user } = renderWithProviders(<SignIn />, { locale: 'en' });

    expect(screen.getByRole('heading')).toHaveTextContent(/sign in/i);

    const signin = screen.getByRole('button', { name: /sign in/i });
    expect(signin).toBeInTheDocument();
    await user.click(signin);
    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
    });
    const email = screen.getByLabelText(/email/i);
    const pwd = screen.getByLabelText(/password/i);
    const submit = screen.getByRole('button', { name: /sign in/i });

    const emailValInvalid = 'user!fake.com';
    const pwdValInvalid = '1234';
    await user.type(email, emailValInvalid);
    await user.type(pwd, pwdValInvalid);
    expect(email).toHaveValue(emailValInvalid);
    expect(pwd).toHaveValue(pwdValInvalid);
    await waitFor(() => {
      expect(handleSubmit).not.toHaveBeenCalled();
    });
    const emailValid = 'user@fake.com';
    const pwdValid = '1234@Abc';
    await user.clear(email);
    await user.clear(pwd);

    await user.type(email, emailValid);
    await user.type(pwd, pwdValid);
    expect(email).toHaveValue(emailValid);
    expect(pwd).toHaveValue(pwdValid);
    await user.click(submit);
    // const errorSneck = await screen.findByText(/signin error/i);
    // expect(errorSneck).toBeInTheDocument();
  });

  it.skip('renders correctly in RU locale', () => {
    renderWithProviders(<SignIn />, { locale: 'ru' });

    expect(screen.getByRole('heading')).toHaveTextContent(/Войти/i);
    expect(screen.getByLabelText(/Почта/i)).toHaveAttribute(
      'placeholder',
      expect.stringMatching(/your@email.com/i)
    );
    expect(screen.getByLabelText(/Пароль/i)).toHaveAttribute(
      'placeholder',
      '••••••'
    );
    expect(screen.getByRole('button')).toHaveTextContent(/Войти/i);
    expect(screen.getByText(/Еще нет аккаунта\?/i)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveTextContent(/регистрация/i);
  });

  it.todo('triggers "sign in" in EN locale', async () => {
    const handleSubmit = vi.fn().mockImplementation((e) => e.preventDefault());
    const { user } = renderWithProviders(<SignIn />, { locale: 'en' });
    const emailVal = 'user@fake.com';
    const email = screen.getByLabelText(/email/i);
    expect(email).toHaveValue('');
    await user.type(email, emailVal);
    expect(email).toHaveValue(emailVal);

    const pwdVal = '1234@Abc';
    const pwd = screen.getByLabelText(/password/i);
    expect(pwd).toHaveValue('');
    await user.type(pwd, pwdVal);
    expect(pwd).toHaveValue(pwdVal);

    const signin = screen.getByRole('button', { name: /sign in/i });
    expect(signin).toBeInTheDocument();
    await user.click(signin);
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });

  it.todo('triggers "sign in" in RU locale', async () => {
    const handleSubmit = vi.fn().mockImplementation((e) => e.preventDefault());
    const { user } = renderWithProviders(<SignIn />, { locale: 'ru' });
    const emailVal = 'user@fake.com';
    const email = screen.getByLabelText(/почта/i);
    expect(email).toHaveValue('');
    await user.type(email, emailVal);
    expect(email).toHaveValue(emailVal);

    const pwdVal = '1234@Abc';
    const pwd = screen.getByLabelText(/пароль/i);
    expect(pwd).toHaveValue('');
    await user.type(pwd, pwdVal);
    expect(pwd).toHaveValue(pwdVal);

    const signin = screen.getByRole('button', { name: /войти/i });
    expect(signin).toBeInTheDocument();
    await user.click(signin);
    await waitFor(() => {
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
