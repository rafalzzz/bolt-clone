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
  body ? NextResponse.json(body, { status, headers }) : new NextResponse(null, { status, headers });

export default sendResponse;
