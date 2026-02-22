import { HttpResponse, delay, http } from "msw";

import { type ApiResponse, BASE_URL } from "@/shared";

import { SERVICE_MOCK_DATA } from "../data";

import { serviceLogHandler } from "./service-log.handler";
import { serviceSocketHandler } from "./service-socket.handler";
import { serviceTimerHandler } from "./service-timer.handler";

const serviceState = new Map(SERVICE_MOCK_DATA.map((s) => [s.name, { ...s }]));

export const serviceHandlers = [
  // GET /api/services
  http.get(`${BASE_URL}/api/services`, async () => {
    await delay(400);
    const data = Array.from(serviceState.values());
    return HttpResponse.json<ApiResponse<typeof data>>({
      success: true,
      data,
    });
  }),

  // POST /api/services/:name/start
  http.post(`${BASE_URL}/api/services/:name/start`, async ({ params }) => {
    await delay(800);
    const name = params.name as string;
    const service = serviceState.get(name);
    if (service) {
      serviceState.set(name, {
        ...service,
        status: "active",
        pid: Math.floor(Math.random() * 60000) + 1000,
        since: new Date().toISOString(),
      });
    }
    return HttpResponse.json<ApiResponse<null>>({
      success: true,
      data: null,
      message: `${name} started successfully`,
    });
  }),

  // POST /api/services/:name/stop
  http.post(`${BASE_URL}/api/services/:name/stop`, async ({ params }) => {
    await delay(800);
    const name = params.name as string;
    const service = serviceState.get(name);
    if (service) {
      serviceState.set(name, {
        ...service,
        status: "inactive",
        pid: undefined,
        since: undefined,
      });
    }
    return HttpResponse.json<ApiResponse<null>>({
      success: true,
      data: null,
      message: `${name} stopped successfully`,
    });
  }),

  // POST /api/services/:name/restart
  http.post(`${BASE_URL}/api/services/:name/restart`, async ({ params }) => {
    await delay(1200);
    const name = params.name as string;
    const service = serviceState.get(name);
    if (service) {
      serviceState.set(name, {
        ...service,
        status: "active",
        pid: Math.floor(Math.random() * 60000) + 1000,
        since: new Date().toISOString(),
      });
    }
    return HttpResponse.json<ApiResponse<null>>({
      success: true,
      data: null,
      message: `${name} restarted successfully`,
    });
  }),

  // POST /api/services/:name/enable
  http.post(`${BASE_URL}/api/services/:name/enable`, async ({ params }) => {
    await delay(500);
    const name = params.name as string;
    const service = serviceState.get(name);
    if (service) {
      serviceState.set(name, { ...service, enabled: "enabled" });
    }
    return HttpResponse.json<ApiResponse<null>>({
      success: true,
      data: null,
      message: `${name} enabled`,
    });
  }),

  // POST /api/services/:name/disable
  http.post(`${BASE_URL}/api/services/:name/disable`, async ({ params }) => {
    await delay(500);
    const name = params.name as string;
    const service = serviceState.get(name);
    if (service) {
      serviceState.set(name, { ...service, enabled: "disabled" });
    }
    return HttpResponse.json<ApiResponse<null>>({
      success: true,
      data: null,
      message: `${name} disabled`,
    });
  }),
  ...serviceTimerHandler,
  ...serviceSocketHandler,
  ...serviceLogHandler,
];
