export const isAuthenticated = (): boolean => {
  if (typeof window === 'undefined') return false;

  // ローカルストレージからJWTトークンを取得
  const token = localStorage.getItem('_token');

  if (!token) {
    return false;
  }

  try {
    const decoded = decodeJWT(token);

    // `exp` フィールドを確認して期限切れかどうかを判定
    const currentTime = Math.floor(Date.now() / 1000);

    // exp (有効期限) は秒単位の UNIX タイムスタンプです
    return decoded.exp > currentTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return false;
  }
};

const base64UrlDecode = (input: string): string => {
  const base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  const decodedData = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
      .join(''),
  );
  return decodedData;
};

const decodeJWT = (token: string): any => {
  const parts = token.split('.');
  if (parts.length !== 3) {
    throw new Error('Invalid JWT token');
  }

  const payload = base64UrlDecode(parts[1]);
  return JSON.parse(payload);
};
