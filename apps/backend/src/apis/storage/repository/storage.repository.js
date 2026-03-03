import { STORAGE_PARTITIONS_MOCK_DATA } from '../mock/storage-partitions.mock.js';
import { STORAGE_SMART_MOCK_DATA } from '../mock/storage-smart.mock.js';

// 메모리 내 mutable 복사본
const partitions = STORAGE_PARTITIONS_MOCK_DATA.map((p) => ({ ...p }));
const smartInfoList = STORAGE_SMART_MOCK_DATA.map((s) => ({ ...s }));

export const storageRepository = {
  /** 파티션 목록 조회 */
  findAllPartitions() {
    return partitions;
  },

  /** 장치명으로 파티션 단건 조회 */
  findPartitionByDevice(device) {
    return partitions.find((p) => p.device === device) ?? null;
  },

  /** SMART 정보 목록 조회 */
  findAllSmartInfo() {
    return smartInfoList;
  },

  /** 장치명으로 SMART 정보 단건 조회 */
  findSmartInfoByDevice(device) {
    return smartInfoList.find((s) => s.device === device) ?? null;
  },
};
