import { systemRepository } from '../repository/system.repository.js';

export const systemService = {
  getInfo() {
    return systemRepository.getInfo();
  },

  getMetrics() {
    return systemRepository.getMetrics();
  },
};
