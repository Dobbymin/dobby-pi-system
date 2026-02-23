/**
 * 서비스 엔티티
 * @typedef {Object} ServiceEntity
 * @property {string} name - 서비스 이름 (예: nginx.service)
 * @property {string} description - 서비스 설명
 * @property {'active'|'inactive'|'failed'} status - 서비스 상태
 * @property {'enabled'|'disabled'} enabled - 부팅 시 자동 시작 여부
 * @property {number|undefined} pid - 프로세스 ID
 * @property {string|undefined} since - 서비스 시작 시각 (ISO 8601)
 * @property {number|undefined} memory - 메모리 사용량 (bytes)
 */

/**
 * 타이머 엔티티
 * @typedef {Object} TimerEntity
 * @property {string} name - 타이머 이름 (예: apt-daily.timer)
 * @property {string} description - 타이머 설명
 * @property {string} lastTrigger - 마지막 실행 시각 (ISO 8601)
 * @property {string} nextTrigger - 다음 실행 시각 (ISO 8601)
 * @property {'active'|'inactive'} status - 타이머 상태
 */

/**
 * 소켓 엔티티
 * @typedef {Object} SocketEntity
 * @property {string} name - 소켓 이름 (예: docker.socket)
 * @property {string} description - 소켓 설명
 * @property {'active'|'inactive'} status - 소켓 상태
 * @property {string} listenAddress - 리슨 주소
 */
