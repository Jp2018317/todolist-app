import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { DATABASE_AUTH_TOKEN, DATABASE_URL } from '@/config/config';

const client = createClient({ url: DATABASE_URL!, authToken: DATABASE_AUTH_TOKEN });

export const db = drizzle(client);