import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const VideoIn = z
  .object({
    src: z.string().max(3000),
    title: z.union([z.string(), z.null()]).optional(),
  })
  .passthrough();
const VideoOut = z
  .object({
    src: z.string().max(3000),
    title: z.union([z.string(), z.null()]).optional(),
    perma_token: z.string().optional(),
  })
  .passthrough();
const ValidationError = z
  .object({
    loc: z.array(z.union([z.string(), z.number()])),
    msg: z.string(),
    type: z.string(),
  })
  .passthrough();
const HTTPValidationError = z
  .object({ detail: z.array(ValidationError) })
  .partial()
  .passthrough();

export const schemas = {
  VideoIn,
  VideoOut,
  ValidationError,
  HTTPValidationError,
};

const endpoints = makeApi([
  {
    method: "post",
    path: "/video",
    alias: "CreateVideoPost",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: VideoIn,
      },
    ],
    response: VideoOut,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "get",
    path: "/video/:perma_token",
    alias: "ReadVideoGet",
    requestFormat: "json",
    parameters: [
      {
        name: "perma_token",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: VideoOut,
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
  {
    method: "put",
    path: "/video/:perma_token",
    alias: "ReplaceVideoPut",
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: VideoIn,
      },
      {
        name: "perma_token",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.number().int(),
    errors: [
      {
        status: 422,
        description: `Validation Error`,
        schema: HTTPValidationError,
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
