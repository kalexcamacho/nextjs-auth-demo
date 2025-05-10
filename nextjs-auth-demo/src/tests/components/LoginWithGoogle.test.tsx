import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import LoginWithGoogle from "@/components/LoginWithGoogle";

jest.mock("firebase/auth", () => ({
  GoogleAuthProvider: jest.fn().mockImplementation(() => ({})),
  signInWithPopup: jest.fn(),
}));

describe("LoginWithGoogle", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders "Sign in with Google" button', () => {
    render(<LoginWithGoogle />);
    expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
  });

  test("calls signInWithPopup on button click (success case)", async () => {
    (signInWithPopup as jest.Mock).mockResolvedValue({
      user: { displayName: "Test User" },
    });

    render(<LoginWithGoogle />);

    const button = screen.getByText("Sign in with Google");
    await userEvent.click(button);

    await waitFor(() => {
      expect(signInWithPopup).toHaveBeenCalledTimes(1);
      expect(GoogleAuthProvider).toHaveBeenCalledTimes(1);
    });
  });

  test("handles error when signInWithPopup fails", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    (signInWithPopup as jest.Mock).mockRejectedValue(new Error("Google login failed"));

    render(<LoginWithGoogle />);
    const button = screen.getByText("Sign in with Google");
    await userEvent.click(button);

    await waitFor(() => {
      expect(signInWithPopup).toHaveBeenCalledTimes(1);
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        "Google login error:",
        expect.any(Error)
      );
    });

    consoleErrorSpy.mockRestore();
  });
});
