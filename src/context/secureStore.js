import * as Keychain from 'react-native-keychain';

export async function saveRefreshToken(refreshToken) {
  await Keychain.setGenericPassword('refresh', refreshToken);
}

export async function getRefreshToken() {
  const result = await Keychain.getGenericPassword();
  if (result) return result.password;
  return null;
}

export async function clearRefreshToken() {
  await Keychain.resetGenericPassword();
}
