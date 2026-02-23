import { CustomError } from '../../../utils/errors.js';
import { SERVICE_ENABLED, SERVICE_STATUS } from '../model/service.model.js';
import { serviceRepository } from '../repository/service.repository.js';

export const serviceService = {
  /** 서비스 목록 조회 */
  getServices({ status, search } = {}) {
    return serviceRepository.findAll({ status, search });
  },

  /** 서비스 상세 조회 */
  getServiceDetail(name) {
    const service = serviceRepository.findByName(name);
    if (!service) {
      throw new CustomError('SERVICE_NOT_FOUND', `서비스를 찾을 수 없습니다: ${name}`, 404);
    }

    const logs = serviceRepository.findLogs(name);
    return { ...service, logs };
  },

  /** 서비스 시작 */
  startService(name) {
    const service = serviceRepository.findByName(name);
    if (!service) {
      throw new CustomError('SERVICE_NOT_FOUND', `서비스를 찾을 수 없습니다: ${name}`, 404);
    }
    if (service.status === SERVICE_STATUS.ACTIVE) {
      throw new CustomError('SERVICE_ALREADY_RUNNING', `서비스가 이미 실행 중입니다: ${name}`, 409);
    }

    const updated = serviceRepository.updateStatus(
      name,
      SERVICE_STATUS.ACTIVE,
      Math.floor(Math.random() * 9000) + 1000,
      new Date().toISOString(),
      1048576
    );

    return updated;
  },

  /** 서비스 중지 */
  stopService(name) {
    const service = serviceRepository.findByName(name);
    if (!service) {
      throw new CustomError('SERVICE_NOT_FOUND', `서비스를 찾을 수 없습니다: ${name}`, 404);
    }
    if (service.status === SERVICE_STATUS.INACTIVE) {
      throw new CustomError('SERVICE_ALREADY_STOPPED', `서비스가 이미 중지되어 있습니다: ${name}`, 409);
    }

    const updated = serviceRepository.updateStatus(name, SERVICE_STATUS.INACTIVE, undefined, undefined, 0);
    // pid, since 제거
    if (updated) {
      delete updated.pid;
      delete updated.since;
    }

    return updated;
  },

  /** 서비스 재시작 */
  restartService(name) {
    const service = serviceRepository.findByName(name);
    if (!service) {
      throw new CustomError('SERVICE_NOT_FOUND', `서비스를 찾을 수 없습니다: ${name}`, 404);
    }

    const updated = serviceRepository.updateStatus(
      name,
      SERVICE_STATUS.ACTIVE,
      Math.floor(Math.random() * 9000) + 1000,
      new Date().toISOString(),
      service.memory ?? 1048576
    );

    return updated;
  },

  /** 서비스 enable */
  enableService(name) {
    const service = serviceRepository.findByName(name);
    if (!service) {
      throw new CustomError('SERVICE_NOT_FOUND', `서비스를 찾을 수 없습니다: ${name}`, 404);
    }

    return serviceRepository.updateEnabled(name, SERVICE_ENABLED.ENABLED);
  },

  /** 서비스 disable */
  disableService(name) {
    const service = serviceRepository.findByName(name);
    if (!service) {
      throw new CustomError('SERVICE_NOT_FOUND', `서비스를 찾을 수 없습니다: ${name}`, 404);
    }

    return serviceRepository.updateEnabled(name, SERVICE_ENABLED.DISABLED);
  },

  /** 서비스 로그 조회 */
  getServiceLogs(name) {
    const service = serviceRepository.findByName(name);
    if (!service) {
      throw new CustomError('SERVICE_NOT_FOUND', `서비스를 찾을 수 없습니다: ${name}`, 404);
    }

    return serviceRepository.findLogs(name);
  },

  /** 소켓 목록 조회 */
  getSockets() {
    return serviceRepository.findAllSockets();
  },

  /** 타이머 목록 조회 */
  getTimers() {
    return serviceRepository.findAllTimers();
  },

  /** 타이머 enable */
  enableTimer(name) {
    const timer = serviceRepository.findTimerByName(name);
    if (!timer) {
      throw new CustomError('TIMER_NOT_FOUND', `타이머를 찾을 수 없습니다: ${name}`, 404);
    }

    return serviceRepository.updateTimerStatus(name, 'active');
  },

  /** 타이머 disable */
  disableTimer(name) {
    const timer = serviceRepository.findTimerByName(name);
    if (!timer) {
      throw new CustomError('TIMER_NOT_FOUND', `타이머를 찾을 수 없습니다: ${name}`, 404);
    }

    return serviceRepository.updateTimerStatus(name, 'inactive');
  },
};
