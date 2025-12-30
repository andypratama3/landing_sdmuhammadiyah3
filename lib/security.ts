import crypto from 'crypto';

export interface SignatureHeaders {
  'X-TIMESTAMP': string;
  'X-NONCE': string;
  'X-SIGNATURE': string;
  'X-FORWARDED-FOR': string;
}

export function generateSecureHeaders(
  payload: any,
  userIp: string
): SignatureHeaders {
  const secret = process.env.API_SECRET_KEY!;
  if (!secret) throw new Error('API_SECRET_KEY missing');

  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonce = crypto.randomUUID();

  const body = payload ? JSON.stringify(payload) : '';
  const dataToSign = `${timestamp}.${nonce}.${userIp}.${body}`;

  const signature = crypto
    .createHmac('sha256', secret)
    .update(dataToSign)
    .digest('hex');

  return {
    'X-TIMESTAMP': timestamp,
    'X-NONCE': nonce,
    'X-SIGNATURE': signature,
    'X-FORWARDED-FOR': userIp,
  };
}
