import { SERVICE_LOG_MOCK_DATA } from '../mock/service-log.mock.js';
import { SERVICE_SOCKET_MOCK_DATA } from '../mock/service-sockets.mock.js';
import { SERVICE_TIMER_MOCK_DATA } from '../mock/service-timers.mock.js';
import { SERVICE_MOCK_DATA } from '../mock/service.mock.js';

// 메모리 내 mutable 복사본 (mock 상태 변경 반영을 위해)
const services = SERVICE_MOCK_DATA.map((s) => ({ ...s }));
const timers = SERVICE_TIMER_MOCK_DATA.map((t) => ({ ...t }));

export const serviceRepository = {
  /** 서비스 목록 조회 */
  findAll({ status, search } = {}) {
    let result = services;

    if (status) {
      result = result.filter((s) => s.status === status);
    }
    if (search) {
      const lower = search.toLowerCase();
      result = result.filter(
        (s) => s.name.toLowerCase().includes(lower) || s.description.toLowerCase().includes(lower)
      );
    }

    return result;
  },

  /** 서비스 단건 조회 */
  findByName(name) {
    return services.find((s) => s.name === name) ?? null;
  },

  /** 서비스 상태 업데이트 */
  updateStatus(name, status, pid, since, memory) {
    const idx = services.findIndex((s) => s.name === name);
    if (idx === -1) return null;

    services[idx] = {
      ...services[idx],
      status,
      ...(pid !== undefined ? { pid } : {}),
      ...(since !== undefined ? { since } : {}),
      ...(memory !== undefined ? { memory } : {}),
    };

    return services[idx];
  },

  /** 서비스 enabled 상태 업데이트 */
  updateEnabled(name, enabled) {
    const idx = services.findIndex((s) => s.name === name);
    if (idx === -1) return null;

    services[idx] = { ...services[idx], enabled };
    return services[idx];
  },

  /** 서비스 로그 조회 */
  findLogs(name) {
    return SERVICE_LOG_MOCK_DATA[name] ?? [];
  },

  /** 소켓 목록 조회 */
  findAllSockets() {
    return SERVICE_SOCKET_MOCK_DATA;
  },

  /** 타이머 목록 조회 */
  findAllTimers() {
    return timers;
  },

  /** 타이머 단건 조회 */
  findTimerByName(name) {
    return timers.find((t) => t.name === name) ?? null;
  },

  /** 타이머 상태 업데이트 */
  updateTimerStatus(name, status) {
    const idx = timers.findIndex((t) => t.name === name);
    if (idx === -1) return null;

    timers[idx] = { ...timers[idx], status };
    return timers[idx];
  },
};
