import { CustomError } from '../../../utils/errors.js';
import { createErrorResponse, createSuccessResponse } from '../../../utils/responseFormatter.js';
import { storageService } from '../service/storage.service.js';

const handleError = (res, error) => {
  if (error instanceof CustomError) {
    return res.status(error.statusCode).json(createErrorResponse(error.code, error.message));
  }
  console.error('[StorageController] Unexpected error:', error);
  return res.status(500).json(createErrorResponse('INTERNAL_SERVER_ERROR', '서버 내부 오류가 발생했습니다.'));
};

export const storageController = {
  /**
   * GET /api/storage/partitions
   * 파티션 목록 조회
   */
  getPartitions(req, res) {
    try {
      const data = storageService.getPartitions();
      return res.status(200).json(createSuccessResponse(data));
    } catch (error) {
      return handleError(res, error);
    }
  },

  /**
   * GET /api/storage/smart
   * SMART 디스크 상태 목록 조회
   */
  getSmartInfo(req, res) {
    try {
      const data = storageService.getSmartInfo();
      return res.status(200).json(createSuccessResponse(data));
    } catch (error) {
      return handleError(res, error);
    }
  },

  /**
   * GET /api/storage/partitions/:device
   * 파티션 단건 조회 (device 는 URL 인코딩된 경로)
   */
  getPartitionByDevice(req, res) {
    try {
      const device = decodeURIComponent(req.params.device);
      const data = storageService.getPartitionByDevice(device);
      return res.status(200).json(createSuccessResponse(data));
    } catch (error) {
      return handleError(res, error);
    }
  },

  /**
   * GET /api/storage/smart/:device
   * SMART 정보 단건 조회 (device 는 URL 인코딩된 경로)
   */
  getSmartInfoByDevice(req, res) {
    try {
      const device = decodeURIComponent(req.params.device);
      const data = storageService.getSmartInfoByDevice(device);
      return res.status(200).json(createSuccessResponse(data));
    } catch (error) {
      return handleError(res, error);
    }
  },
};
