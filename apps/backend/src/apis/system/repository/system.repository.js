import { SYSTEM_INFO_MOCK } from '../mock/system-info.mock.js';
import { generateSystemMetricsMock } from '../mock/system-metrics.mock.js';

export const systemRepository = {
  /** 시스템 정보 조회 */
  getInfo() {
    return { ...SYSTEM_INFO_MOCK };
  },

  /** 시스템 메트릭 조회 (호출마다 랜덤값 생성) */
  getMetrics() {
    return generateSystemMetricsMock();
  },
};
