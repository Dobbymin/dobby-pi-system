import { HttpResponse, delay, http } from "msw";

import { type ApiResponse, BASE_URL } from "@/shared";

import { SERVICE_TIMER_MOCK_DATA } from "../data";

export const serviceTimerHandler = [
  // GET /services/timers
  http.get(`/api/${BASE_URL}/services/timers`, async () => {
    await delay(400);
    return HttpResponse.json<ApiResponse<typeof SERVICE_TIMER_MOCK_DATA>>({
      success: true,
      data: SERVICE_TIMER_MOCK_DATA,
    });
  }),
];
