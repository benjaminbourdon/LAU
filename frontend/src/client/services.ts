import type { CancelablePromise } from "./core/CancelablePromise";
import { OpenAPI } from "./core/OpenAPI";
import { request as __request } from "./core/request";

import type { VideoIn, VideoOut } from "./models";

export type VideoData = {
  CreateVideoPost: {
    requestBody: VideoIn;
  };
  ReadVideoGet: {
    permaToken: string;
  };
  ReplaceVideoPut: {
    permaToken: string;
    requestBody: VideoIn;
  };
};

export class VideoService {
  /**
   * Create Video
   * @returns VideoOut Successful Response
   * @throws ApiError
   */
  public static createVideoPost(
    data: VideoData["CreateVideoPost"],
  ): CancelablePromise<VideoOut> {
    const { requestBody } = data;
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
  public static readVideoGet(
    data: VideoData["ReadVideoGet"],
  ): CancelablePromise<VideoOut> {
    const { permaToken } = data;
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
  public static replaceVideoPut(
    data: VideoData["ReplaceVideoPut"],
  ): CancelablePromise<number> {
    const { permaToken, requestBody } = data;
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
