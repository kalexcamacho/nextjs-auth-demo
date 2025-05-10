import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { signInWithEmailAndPassword } from 'firebase/auth';
import LoginWithEmail from '@/components/LoginWithEmail';

jest.mock('firebase/auth', () => ({
  signInWithEmailAndPassword: jest.fn(),
}));

describe('LoginWithEmail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders inputs and login button', () => {
    render(<LoginWithEmail />);
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Sign in with Email')).toBeInTheDocument();
  });

  test('logs in user with valid credentials', async () => {
    const mockUser = { email: 'test@example.com' };
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({ user: mockUser });

    render(<LoginWithEmail />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), '123456');
    await userEvent.click(screen.getByText('Sign in with Email'));

    await waitFor(() => {
      expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(), // auth
        'test@example.com',
        '123456'
      );
    });
  });

  test('logs error if login fails', async () => {
    const error = new Error('Invalid credentials');
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (signInWithEmailAndPassword as jest.Mock).mockRejectedValue(error);

    render(<LoginWithEmail />);

    await userEvent.type(screen.getByPlaceholderText('Email'), 'fail@example.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'wrongpass');
    await userEvent.click(screen.getByText('Sign in with Email'));

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Email login error:', error);
    });

    consoleErrorSpy.mockRestore();
  });
});
