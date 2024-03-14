/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { VideoIn } from "../models/VideoIn";
import type { VideoOut } from "../models/VideoOut";

import type { CancelablePromise } from "../core/CancelablePromise";
import { OpenAPI } from "../core/OpenAPI";
import { request as __request } from "../core/request";

export class VideoService {
  /**
   * Create Video
   * @returns VideoOut Successful Response
   * @throws ApiError
   */
  public static createVideoPost({
    requestBody,
  }: {
    requestBody: VideoIn;
  }): CancelablePromise<VideoOut> {
    return __request(OpenAPI, {
      method: "POST",
      url: "/video",
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Read Video
   * @returns VideoOut Successful Response
   * @throws ApiError
   */
  public static readVideoGet({
    permaToken,
  }: {
    permaToken: string;
  }): CancelablePromise<VideoOut> {
    return __request(OpenAPI, {
      method: "GET",
      url: "/video/{perma_token}",
      path: {
        perma_token: permaToken,
      },
      errors: {
        422: `Validation Error`,
      },
    });
  }

  /**
   * Replace Video
   * @returns number Successful Response
   * @throws ApiError
   */
  public static replaceVideoPut({
    permaToken,
    requestBody,
  }: {
    permaToken: string;
    requestBody: VideoIn;
  }): CancelablePromise<number> {
    return __request(OpenAPI, {
      method: "PUT",
      url: "/video/{perma_token}",
      path: {
        perma_token: permaToken,
      },
      body: requestBody,
      mediaType: "application/json",
      errors: {
        422: `Validation Error`,
      },
    });
  }
}
