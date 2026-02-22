import { HttpResponse, delay, http } from "msw";

import { type ApiResponse, BASE_URL } from "@/shared";

import { SERVICE_LOG_MOCK_DATA } from "../data";

export const serviceLogHandler = [
  // GET /api/services/:name/logs
  http.get(`${BASE_URL}/api/services/:name/logs`, async ({ params }) => {
    await delay(600);
    const name = params.name as string;
    const logs =
      SERVICE_LOG_MOCK_DATA[name] ??
      Array.from({ length: 5 }, (_, i) => {
        const d = new Date();
        d.setMinutes(d.getMinutes() - (5 - i));
        return `${d.toLocaleString("en-US", { month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false })} dobby-pi ${name.replace(".service", "")}[${Math.floor(Math.random() * 10000)}]: No recent log entries.`;
      });
    return HttpResponse.json<ApiResponse<string[]>>({
      success: true,
      data: logs,
    });
  }),
];
