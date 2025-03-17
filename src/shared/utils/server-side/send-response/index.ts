import { NextResponse } from 'next/server';

type TSendResponseArgs = {
  body?: Record<string, unknown>;
  status: number;
  headers?: HeadersInit;
};

const sendResponse = ({
  body,
  status,
  headers = { 'Content-Type': 'application/json' },
}: TSendResponseArgs): NextResponse =>
  new NextResponse(body ? JSON.stringify(body) : null, {
    status,
    headers,
  });

export default sendResponse;
