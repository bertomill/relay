import { fal } from "@fal-ai/client";

// Configure fal client to use our proxy route
fal.config({
  proxyUrl: "/api/fal/proxy",
});

// Type definitions for Fal API responses
export interface FalImage {
  url: string;
  width: number;
  height: number;
  content_type: string;
}

export interface FalImageResult {
  images: FalImage[];
  timings: {
    inference: number;
  };
  seed: number;
  has_nsfw_concepts: boolean[];
  prompt: string;
}

export interface FalVideoResult {
  video: {
    url: string;
    content_type: string;
    file_name: string;
    file_size: number;
  };
  timings: {
    inference: number;
  };
  seed: number;
}

export type ImageSize = "square_hd" | "square" | "landscape_4_3" | "landscape_16_9" | "portrait_4_3" | "portrait_16_9";

export interface GenerateImageOptions {
  size?: ImageSize;
  seed?: number;
  numImages?: number;
}

export interface GenerateVideoOptions {
  prompt: string;
  imageUrl?: string;
  duration?: number;
  seed?: number;
}

export interface LogMessage {
  message: string;
  timestamp?: string;
}

export interface SubscribeResult<T> {
  data: T;
  requestId: string;
}

/**
 * Generate an image using FLUX.1 [dev]
 * Cost: ~$0.025/image
 */
export async function generateImage(
  prompt: string,
  options?: GenerateImageOptions,
  onLog?: (log: LogMessage) => void
): Promise<SubscribeResult<FalImageResult>> {
  const result = await fal.subscribe("fal-ai/flux/dev", {
    input: {
      prompt,
      image_size: options?.size ?? "square_hd",
      seed: options?.seed,
      num_images: options?.numImages ?? 1,
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS" && update.logs && onLog) {
        update.logs.forEach((log) => {
          onLog({ message: log.message });
        });
      }
    },
  });

  return result as SubscribeResult<FalImageResult>;
}

/**
 * Generate a video using WAN 2.1 (image-to-video)
 * Cost: ~$0.05/second
 */
export async function generateVideo(
  options: GenerateVideoOptions,
  onLog?: (log: LogMessage) => void
): Promise<SubscribeResult<FalVideoResult>> {
  if (!options.imageUrl) {
    throw new Error("Image URL is required for video generation");
  }

  const result = await fal.subscribe("fal-ai/wan-i2v", {
    input: {
      prompt: options.prompt,
      image_url: options.imageUrl,
      seed: options.seed,
    },
    logs: true,
    onQueueUpdate: (update) => {
      if (update.status === "IN_PROGRESS" && update.logs && onLog) {
        update.logs.forEach((log) => {
          onLog({ message: log.message });
        });
      }
    },
  });

  return result as SubscribeResult<FalVideoResult>;
}

/**
 * Animate a static logo using image-to-video
 * Uploads the logo and generates an animated version
 */
export async function animateLogo(
  imageUrl: string,
  prompt: string = "Subtle animation, logo gently breathing and pulsing, professional motion graphics, seamless loop",
  onLog?: (log: LogMessage) => void
): Promise<SubscribeResult<FalVideoResult>> {
  return generateVideo(
    {
      prompt,
      imageUrl,
    },
    onLog
  );
}

/**
 * Upload a file to Fal storage for use in generation
 */
export async function uploadFile(file: File): Promise<string> {
  const url = await fal.storage.upload(file);
  return url;
}

export { fal };
