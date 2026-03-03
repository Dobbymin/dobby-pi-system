import { CustomError } from '../../../utils/errors.js';
import { storageRepository } from '../repository/storage.repository.js';

export const storageService = {
  /** 파티션 목록 조회 */
  getPartitions() {
    return storageRepository.findAllPartitions();
  },

  /** SMART 정보 목록 조회 */
  getSmartInfo() {
    return storageRepository.findAllSmartInfo();
  },

  /** 장치명으로 파티션 단건 조회 */
  getPartitionByDevice(device) {
    const partition = storageRepository.findPartitionByDevice(device);
    if (!partition) {
      throw new CustomError('PARTITION_NOT_FOUND', `파티션을 찾을 수 없습니다: ${device}`, 404);
    }
    return partition;
  },

  /** 장치명으로 SMART 정보 단건 조회 */
  getSmartInfoByDevice(device) {
    const smart = storageRepository.findSmartInfoByDevice(device);
    if (!smart) {
      throw new CustomError('SMART_INFO_NOT_FOUND', `SMART 정보를 찾을 수 없습니다: ${device}`, 404);
    }
    return smart;
  },
};
