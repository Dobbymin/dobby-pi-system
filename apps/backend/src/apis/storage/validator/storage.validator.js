import { createErrorResponse } from '../../../utils/responseFormatter.js';

/**
 * :device 경로 파라미터 검증
 * device 는 URL 인코딩된 값(/dev/sda1 → %2Fdev%2Fsda1)으로 전달됨
 */
export const validateDeviceParam = (req, res, next) => {
  const { device } = req.params;

  if (!device || typeof device !== 'string' || device.trim() === '') {
    return res.status(400).json(createErrorResponse('INVALID_DEVICE_PARAM', '장치명이 유효하지 않습니다.'));
  }

  next();
};
