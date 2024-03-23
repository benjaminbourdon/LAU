import { createApiClient } from "./generated-client";

const base_url = process.env.NEXT_PUBLIC_API_BASEURL
  ? process.env.NEXT_PUBLIC_API_BASEURL
  : "";
export const api = createApiClient(base_url);
export { schemas } from "./generated-client";
