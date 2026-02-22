import { HttpResponse, delay, http } from "msw";

import { type ApiResponse, BASE_URL } from "@/shared";

import { SERVICE_SOCKET_MOCK_DATA } from "../data";

export const serviceSocketHandler = [
  // GET /api/services/sockets
  http.get(`${BASE_URL}/api/services/sockets`, async () => {
    await delay(400);
    return HttpResponse.json<ApiResponse<typeof SERVICE_SOCKET_MOCK_DATA>>({
      success: true,
      data: SERVICE_SOCKET_MOCK_DATA,
    });
  }),
];
