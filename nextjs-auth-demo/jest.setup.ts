import '@testing-library/jest-dom';

import { auth } from '@/firebase/config';
import { connectAuthEmulator } from 'firebase/auth';

if (process.env.IS_EMULATOR_TEST) {
  const EMULATOR_HOST = process.env.FIREBASE_AUTH_EMULATOR_HOST || 'localhost:9099';

  try {
    connectAuthEmulator(auth, `http://${EMULATOR_HOST}`);
    console.log(`Conectado al emulador de Firebase Auth en http://${EMULATOR_HOST}`);
  } catch (e) {
    console.error("Error al conectar con el emulador de Firebase:", e);
  }
}

