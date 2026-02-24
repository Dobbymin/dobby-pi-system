import { createErrorResponse, createSuccessResponse } from '../../../utils/responseFormatter.js';
import { systemService } from '../service/system.service.js';

const handleError = (res, error) => {
  console.error('[SystemController]', error);
  return res.status(500).json(createErrorResponse('INTERNAL_SERVER_ERROR', '서버 내부 오류가 발생했습니다.'));
};

export const systemController = {
  /**
   * GET /api/system/info
   * 시스템 기본 정보 조회 (hostname, OS, kernel, uptime, IP 등)
   */
  getInfo(req, res) {
    try {
      const data = systemService.getInfo();
      return res.status(200).json(createSuccessResponse(data));
    } catch (error) {
      return handleError(res, error);
    }
  },

  /**
   * GET /api/system/metrics
   * CPU / 메모리 / 디스크 / 네트워크 실시간 메트릭 조회
   */
  getMetrics(req, res) {
    try {
      const data = systemService.getMetrics();
      return res.status(200).json(createSuccessResponse(data));
    } catch (error) {
      return handleError(res, error);
    }
  },
};
