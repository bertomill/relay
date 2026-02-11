import { Response } from "express";

/**
 * Set up SSE headers on an Express response and return a helper to send events.
 */
export function initSSE(res: Response) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
  });

  return {
    send(data: unknown) {
      res.write(`data: ${JSON.stringify(data)}\n\n`);
    },
    done() {
      res.write("data: [DONE]\n\n");
      res.end();
    },
  };
}
