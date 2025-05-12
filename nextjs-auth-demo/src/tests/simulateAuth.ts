// Importa la configuración de Firebase
import { auth, db } from '../firebase/config'; // Asegúrate de que la ruta sea correcta
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

// Usa la misma instancia de `auth` que ya tienes configurada
export async function simulateGoogleLoginForTest() {
const mockCredential = GoogleAuthProvider.credential(
  // Esto es un mock JWT con el mínimo requerido
  'eyJhbGciOiJSUzI1NiIsImtpZCI6IjEyMzQ1NiJ9.eyJzdWIiOiJ0ZXN0LXVzZXItaWQiLCJlbWFpbCI6InRlc3R1c2VyQGV4YW1wbGUuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWV9.mock-signature'
);
  try {
    const result = await signInWithCredential(auth, mockCredential);
    console.log("Successfully signed in mock user:", result.user);
  } catch (error) {
    console.error("Error simulating login:", error);
  }
}
