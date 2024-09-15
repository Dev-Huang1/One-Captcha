// api/check-ip.js
import { NextResponse } from 'next/server';
import fetch from 'node-fetch';

const IPIFY_API_URL = 'https://api.ipify.org?format=json';
const REQUEST_LIMIT = 5; // 限制次数
const TIME_FRAME = 60 * 60 * 1000; // 1小时

let ipRequestCounts = {};

export async function GET() {
  const ipResponse = await fetch(IPIFY_API_URL);
  const { ip } = await ipResponse.json();

  const currentTime = Date.now();
  const requests = ipRequestCounts[ip] || [];

  // 清理过期请求
  ipRequestCounts[ip] = requests.filter(timestamp => currentTime - timestamp < TIME_FRAME);

  if (ipRequestCounts[ip].length >= REQUEST_LIMIT) {
    return new NextResponse('Too many requests', { status: 429 });
  }

  ipRequestCounts[ip].push(currentTime);
  return new NextResponse('OK');
}
