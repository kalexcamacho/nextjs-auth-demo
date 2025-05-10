import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import RegisterWithEmail from '@/components/RegisterWithEmail';

jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
}));

describe('RegisterWithEmail', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders email and password inputs and register button', () => {
    render(<RegisterWithEmail />);
    
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('Register with Email')).toBeInTheDocument();
  });

  test('registers user with email and password', async () => {
    const mockUser = { email: 'test@example.com' };
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({ user: mockUser });

    render(<RegisterWithEmail />);
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const registerButton = screen.getByText('Register with Email');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'securepassword');
    await userEvent.click(registerButton);

    await waitFor(() => {
      expect(createUserWithEmailAndPassword).toHaveBeenCalledWith(
        expect.anything(), // auth
        'test@example.com',
        'securepassword'
      );
    });
  });

  test('logs error when registration fails', async () => {
    const error = new Error('Registration failed');
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    (createUserWithEmailAndPassword as jest.Mock).mockRejectedValue(error);

    render(<RegisterWithEmail />);
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const registerButton = screen.getByText('Register with Email');

    await userEvent.type(emailInput, 'fail@example.com');
    await userEvent.type(passwordInput, '123456');
    await userEvent.click(registerButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Registration error:', error);
    });

    consoleErrorSpy.mockRestore();
  });
});
