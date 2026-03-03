/**
 * 스토리지 파티션 엔티티
 * @typedef {Object} StoragePartitionEntity
 * @property {string} device       - 장치명 (예: /dev/sda1)
 * @property {string} mountPoint   - 마운트 포인트 (예: /)
 * @property {string} fsType       - 파일시스템 유형 (예: ext4)
 * @property {number} total        - 전체 용량 (bytes)
 * @property {number} used         - 사용 중 용량 (bytes)
 * @property {number} free         - 여유 용량 (bytes)
 * @property {number} usagePercent - 사용률 (%)
 * @property {number|undefined} inodeTotal        - 전체 inode 수
 * @property {number|undefined} inodeUsed         - 사용 중 inode 수
 * @property {number|undefined} inodeFree         - 여유 inode 수
 * @property {number|undefined} inodeUsagePercent - inode 사용률 (%)
 */

/**
 * SMART 디스크 상태 엔티티
 * @typedef {Object} SmartInfoEntity
 * @property {string} device             - 장치명 (예: /dev/sda)
 * @property {string} model              - 모델명
 * @property {string} serial             - 시리얼 번호
 * @property {string} firmwareVersion    - 펌웨어 버전
 * @property {'good'|'warning'|'bad'} healthStatus - 건강 상태
 * @property {number} temperature        - 온도 (°C)
 * @property {number} powerOnHours       - 전원 켠 시간 (시간)
 * @property {number} reallocatedSectors - 재할당된 섹터 수
 */
