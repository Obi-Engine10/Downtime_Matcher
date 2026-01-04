import { z } from 'zod';
import { insertDowntimeCodeSchema, downtimeCodes } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  downtimeCodes: {
    list: {
      method: 'GET' as const,
      path: '/api/downtime-codes',
      input: z.object({
        search: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof downtimeCodes.$inferSelect>()),
      },
    },
    create: {
      method: 'POST' as const,
      path: '/api/downtime-codes',
      input: insertDowntimeCodeSchema,
      responses: {
        201: z.custom<typeof downtimeCodes.$inferSelect>(),
        400: errorSchemas.validation,
      },
    }
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type DowntimeCodeInput = z.infer<typeof api.downtimeCodes.create.input>;
export type DowntimeCodeResponse = z.infer<typeof api.downtimeCodes.create.responses[201]>;
