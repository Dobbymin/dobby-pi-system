import { createErrorResponse } from '../../../utils/responseFormatter.js';
import { SERVICE_STATUS } from '../model/service.model.js';

const VALID_STATUSES = Object.values(SERVICE_STATUS);

/**
 * GET /api/services 쿼리 파라미터 검증
 */
export const validateGetServicesQuery = (req, res, next) => {
  const { status } = req.query;

  if (status && !VALID_STATUSES.includes(status)) {
    return res
      .status(400)
      .json(
        createErrorResponse(
          'INVALID_STATUS',
          `status 파라미터가 유효하지 않습니다. 허용 값: ${VALID_STATUSES.join(', ')}`
        )
      );
  }

  next();
};

/**
 * :name 경로 파라미터 검증
 */
export const validateServiceName = (req, res, next) => {
  const { name } = req.params;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json(createErrorResponse('INVALID_SERVICE_NAME', '서비스 이름이 유효하지 않습니다.'));
  }

  next();
};
