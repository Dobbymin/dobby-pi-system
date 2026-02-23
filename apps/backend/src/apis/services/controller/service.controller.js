import { CustomError } from '../../../utils/errors.js';
import { createErrorResponse, createSuccessResponse } from '../../../utils/responseFormatter.js';
import { serviceService } from '../service/service.service.js';

const handleError = (res, error) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json(createErrorResponse(error.code, error.message));
  }
  console.error('[ServiceController] Unexpected error:', error);
  return res.status(500).json(createErrorResponse('INTERNAL_SERVER_ERROR', '서버 내부 오류가 발생했습니다.'));
};

export const serviceController = {
  /**
   * GET /api/services
   * 서비스 목록 조회
   */
  getServices(req, res) {
    try {
      const { status, search } = req.query;
      const data = serviceService.getServices({ status, search });
      return res.status(200).json(createSuccessResponse(data));
    } catch (error) {
      return handleError(res, error);
    }
  },

  /**
   * GET /api/services/timers
   * 타이머 목록 조회
   */
  getTimers(req, res) {
    try {
      const data = serviceService.getTimers();
      return res.status(200).json(createSuccessResponse(data));
    } catch (error) {
      return handleError(res, error);
    }
  },

  /**
   * GET /api/services/sockets
   * 소켓 목록 조회
   */
  getSockets(req, res) {
    try {
      const data = serviceService.getSockets();
      return res.status(200).json(createSuccessResponse(data));
    } catch (error) {
      return handleError(res, error);
    }
  },

  /**
   * GET /api/services/:name
   * 서비스 상세 조회 (로그 포함)
   */
  getServiceDetail(req, res) {
    try {
      const { name } = req.params;
      const data = serviceService.getServiceDetail(name);
      return res.status(200).json(createSuccessResponse(data));
    } catch (error) {
      return handleError(res, error);
    }
  },

  /**
   * GET /api/services/:name/logs
   * 서비스 로그 조회
   */
  getServiceLogs(req, res) {
    try {
      const { name } = req.params;
      const data = serviceService.getServiceLogs(name);
      return res.status(200).json(createSuccessResponse(data));
    } catch (error) {
      return handleError(res, error);
    }
  },

  /**
   * POST /api/services/:name/start
   * 서비스 시작
   */
  startService(req, res) {
    try {
      const { name } = req.params;
      const data = serviceService.startService(name);
      return res.status(200).json(createSuccessResponse(data));
    } catch (error) {
      return handleError(res, error);
    }
  },

  /**
   * POST /api/services/:name/stop
   * 서비스 중지
   */
  stopService(req, res) {
    try {
      const { name } = req.params;
      const data = serviceService.stopService(name);
      return res.status(200).json(createSuccessResponse(data));
    } catch (error) {
      return handleError(res, error);
    }
  },

  /**
   * POST /api/services/:name/restart
   * 서비스 재시작
   */
  restartService(req, res) {
    try {
      const { name } = req.params;
      const data = serviceService.restartService(name);
      return res.status(200).json(createSuccessResponse(data));
    } catch (error) {
      return handleError(res, error);
    }
  },

  /**
   * POST /api/services/:name/enable
   * 서비스 enable
   */
  enableService(req, res) {
    try {
      const { name } = req.params;
      const data = serviceService.enableService(name);
      return res.status(200).json(createSuccessResponse(data));
    } catch (error) {
      return handleError(res, error);
    }
  },

  /**
   * POST /api/services/:name/disable
   * 서비스 disable
   */
  disableService(req, res) {
    try {
      const { name } = req.params;
      const data = serviceService.disableService(name);
      return res.status(200).json(createSuccessResponse(data));
    } catch (error) {
      return handleError(res, error);
    }
  },

  /**
   * POST /api/services/timers/:name/enable
   * 타이머 enable
   */
  enableTimer(req, res) {
    try {
      const { name } = req.params;
      const data = serviceService.enableTimer(name);
      return res.status(200).json(createSuccessResponse(data));
    } catch (error) {
      return handleError(res, error);
    }
  },

  /**
   * POST /api/services/timers/:name/disable
   * 타이머 disable
   */
  disableTimer(req, res) {
    try {
      const { name } = req.params;
      const data = serviceService.disableTimer(name);
      return res.status(200).json(createSuccessResponse(data));
    } catch (error) {
      return handleError(res, error);
    }
  },
};
