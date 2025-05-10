import { render, screen, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import LoginWithPhone from '@/components/LoginWithPhone';

jest.mock('firebase/auth', () => {
  const mockCallback = jest.fn();
  const mockRecaptchaVerifierInstance = {
    render: jest.fn(),
    clear: jest.fn(),
    verify: jest.fn().mockResolvedValue(true),
    callback: mockCallback,
  };

  return {
    RecaptchaVerifier: jest.fn().mockImplementation((_auth, _id, config) => {
      mockRecaptchaVerifierInstance.callback = config.callback;
      return mockRecaptchaVerifierInstance;
    }),
    signInWithPhoneNumber: jest.fn().mockResolvedValue({
      confirm: jest.fn().mockResolvedValue({ user: { phoneNumber: '+1234567890' } }),
    }),
  };
});

describe('LoginWithPhone', () => {
  beforeEach(() => {
    (signInWithPhoneNumber as jest.Mock).mockClear();
  });

  test('should enable "Send OTP" button after reCAPTCHA callback', async () => {
    render(<LoginWithPhone />);
    const sendOtpButton = screen.getByText(/Send OTP/i);
    expect(sendOtpButton).toBeDisabled();

    let verifier: any;
    await waitFor(() => {
      verifier = (RecaptchaVerifier as jest.Mock).mock.results.at(-1)?.value;
      if (!verifier?.callback) throw new Error('recaptcha callback not available yet');
    });

    await act(async () => {
      verifier.callback();
    });

    await waitFor(() => {
      expect(sendOtpButton).not.toBeDisabled();
    }, { timeout: 5000 });
  });

/*   test('should send OTP when phone number is entered and reCAPTCHA is solved', async () => {
    render(<LoginWithPhone />);

    const phoneInput = screen.getByPlaceholderText('+1234567890');
    await userEvent.type(phoneInput, '+1234567890');

    const sendOtpButton = screen.getByText(/Send OTP/i);

    let verifier: any;
    await waitFor(() => {
      verifier = (RecaptchaVerifier as jest.Mock).mock.results.at(-1)?.value;
      if (!verifier?.callback) throw new Error('recaptcha callback not available yet');
    });

    await act(async () => {
      verifier.callback();
    });

    await waitFor(() => {
      expect(sendOtpButton).not.toBeDisabled();
    }, { timeout: 5000 });

    await userEvent.click(sendOtpButton);

    await waitFor(() => {
      expect(signInWithPhoneNumber).toHaveBeenCalledTimes(1);
    });
  }); */

/*   test('should verify OTP successfully', async () => {
    render(<LoginWithPhone />);

    const confirmationResult = {
      confirm: jest.fn().mockResolvedValue({ user: { phoneNumber: '+1234567890' } }),
    };
    (signInWithPhoneNumber as jest.Mock).mockResolvedValue(confirmationResult);

    const phoneInput = screen.getByPlaceholderText('+1234567890');
    await userEvent.type(phoneInput, '+1234567890');

    const sendOtpButton = screen.getByText(/Send OTP/i);

    let verifier: any;
    await waitFor(() => {
      verifier = (RecaptchaVerifier as jest.Mock).mock.results.at(-1)?.value;
      if (!verifier?.callback) throw new Error('recaptcha callback not available yet');
    });

    await act(async () => {
      verifier.callback();
    });

    await waitFor(() => {
      expect(sendOtpButton).not.toBeDisabled();
    }, { timeout: 5000 });

    await userEvent.click(sendOtpButton);

    const otpInput = await screen.findByPlaceholderText('Enter OTP');
    await userEvent.type(otpInput, '123456');

    const verifyOtpButton = screen.getByText(/Verify OTP/i);
    await userEvent.click(verifyOtpButton);

    await waitFor(() => {
      expect(confirmationResult.confirm).toHaveBeenCalledWith('123456');
    });
  }); */
});
