import express from 'express';

import { serviceController } from '../apis/services/controller/service.controller.js';
import { validateGetServicesQuery, validateServiceName } from '../apis/services/validator/service.validator.js';

export const router = (app) => {
  const apiRouter = express.Router();

  // ── Services ──────────────────────────────────────────────
  // 고정 경로를 동적 경로보다 먼저 등록
  apiRouter.get('/services/timers', serviceController.getTimers);
  apiRouter.get('/services/sockets', serviceController.getSockets);

  apiRouter.get('/services', validateGetServicesQuery, serviceController.getServices);
  apiRouter.get('/services/:name', validateServiceName, serviceController.getServiceDetail);
  apiRouter.get('/services/:name/logs', validateServiceName, serviceController.getServiceLogs);

  apiRouter.post('/services/:name/start', validateServiceName, serviceController.startService);
  apiRouter.post('/services/:name/stop', validateServiceName, serviceController.stopService);
  apiRouter.post('/services/:name/restart', validateServiceName, serviceController.restartService);
  apiRouter.post('/services/:name/enable', validateServiceName, serviceController.enableService);
  apiRouter.post('/services/:name/disable', validateServiceName, serviceController.disableService);

  apiRouter.post('/services/timers/:name/enable', validateServiceName, serviceController.enableTimer);
  apiRouter.post('/services/timers/:name/disable', validateServiceName, serviceController.disableTimer);

  app.use('/api', apiRouter);
};
