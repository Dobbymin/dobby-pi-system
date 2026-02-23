/**
 * @swagger
 * tags:
 *   name: Services
 *   description: systemd 서비스/타이머/소켓 관리 API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Service:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: nginx.service
 *         description:
 *           type: string
 *           example: A high performance web server and a reverse proxy server
 *         status:
 *           type: string
 *           enum: [active, inactive, failed]
 *           example: active
 *         enabled:
 *           type: string
 *           enum: [enabled, disabled]
 *           example: enabled
 *         pid:
 *           type: integer
 *           example: 1234
 *         since:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T08:00:00Z"
 *         memory:
 *           type: integer
 *           description: 메모리 사용량(bytes)
 *           example: 12582912
 *     ServiceDetail:
 *       allOf:
 *         - $ref: '#/components/schemas/Service'
 *         - type: object
 *           properties:
 *             logs:
 *               type: array
 *               items:
 *                 type: string
 *               example:
 *                 - "Jan 15 08:00:01 dobby-pi nginx[1234]: nginx: configuration file syntax is ok"
 *     Timer:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: apt-daily.timer
 *         description:
 *           type: string
 *           example: Daily apt download activities
 *         lastTrigger:
 *           type: string
 *           format: date-time
 *           example: "2024-01-15T06:00:00Z"
 *         nextTrigger:
 *           type: string
 *           format: date-time
 *           example: "2024-01-16T06:32:00Z"
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           example: active
 *     Socket:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: docker.socket
 *         description:
 *           type: string
 *           example: Docker Socket for the API
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *           example: active
 *         listenAddress:
 *           type: string
 *           example: /run/docker.sock
 */

/**
 * @swagger
 * /api/services:
 *   get:
 *     summary: 서비스 목록 조회
 *     description: systemd 서비스 목록을 조회합니다. status 필터 및 검색어를 사용할 수 있습니다.
 *     tags: [Services]
 *     parameters:
 *       - in: query
 *         name: status
 *         required: false
 *         description: "서비스 상태 필터 (active | inactive | failed)"
 *         schema:
 *           type: string
 *           enum: [active, inactive, failed]
 *       - in: query
 *         name: search
 *         required: false
 *         description: 서비스 이름 또는 설명 검색어
 *         schema:
 *           type: string
 *           example: nginx
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Service'
 *       400:
 *         description: 잘못된 쿼리 파라미터
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailResponse'
 */

/**
 * @swagger
 * /api/services/timers:
 *   get:
 *     summary: 타이머 목록 조회
 *     description: systemd 타이머 목록을 조회합니다.
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Timer'
 */

/**
 * @swagger
 * /api/services/sockets:
 *   get:
 *     summary: 소켓 목록 조회
 *     description: systemd 소켓 목록을 조회합니다.
 *     tags: [Services]
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Socket'
 */

/**
 * @swagger
 * /api/services/{name}:
 *   get:
 *     summary: 서비스 상세 조회
 *     description: 특정 서비스의 상세 정보와 최근 로그를 조회합니다.
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: 서비스 이름 (예&#58; nginx.service)
 *         schema:
 *           type: string
 *           example: nginx.service
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/ServiceDetail'
 *       404:
 *         description: 서비스를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailResponse'
 */

/**
 * @swagger
 * /api/services/{name}/logs:
 *   get:
 *     summary: 서비스 로그 조회
 *     description: 특정 서비스의 journalctl 로그를 조회합니다.
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         description: 서비스 이름
 *         schema:
 *           type: string
 *           example: nginx.service
 *     responses:
 *       200:
 *         description: 조회 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: array
 *                       items:
 *                         type: string
 *       404:
 *         description: 서비스를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailResponse'
 */

/**
 * @swagger
 * /api/services/{name}/start:
 *   post:
 *     summary: 서비스 시작
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *           example: redis.service
 *     responses:
 *       200:
 *         description: 서비스 시작 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Service'
 *       404:
 *         description: 서비스를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailResponse'
 *       409:
 *         description: 이미 실행 중
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailResponse'
 */

/**
 * @swagger
 * /api/services/{name}/stop:
 *   post:
 *     summary: 서비스 중지
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *           example: nginx.service
 *     responses:
 *       200:
 *         description: 서비스 중지 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Service'
 *       404:
 *         description: 서비스를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailResponse'
 *       409:
 *         description: 이미 중지됨
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailResponse'
 */

/**
 * @swagger
 * /api/services/{name}/restart:
 *   post:
 *     summary: 서비스 재시작
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *           example: nginx.service
 *     responses:
 *       200:
 *         description: 서비스 재시작 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Service'
 *       404:
 *         description: 서비스를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailResponse'
 */

/**
 * @swagger
 * /api/services/{name}/enable:
 *   post:
 *     summary: 서비스 부팅 시 자동 시작 활성화
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *           example: redis.service
 *     responses:
 *       200:
 *         description: 활성화 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Service'
 *       404:
 *         description: 서비스를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailResponse'
 */

/**
 * @swagger
 * /api/services/{name}/disable:
 *   post:
 *     summary: 서비스 부팅 시 자동 시작 비활성화
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *           example: nginx.service
 *     responses:
 *       200:
 *         description: 비활성화 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Service'
 *       404:
 *         description: 서비스를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailResponse'
 */

/**
 * @swagger
 * /api/services/timers/{name}/enable:
 *   post:
 *     summary: 타이머 활성화
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *           example: backup.timer
 *     responses:
 *       200:
 *         description: 타이머 활성화 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Timer'
 *       404:
 *         description: 타이머를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailResponse'
 */

/**
 * @swagger
 * /api/services/timers/{name}/disable:
 *   post:
 *     summary: 타이머 비활성화
 *     tags: [Services]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *           example: apt-daily.timer
 *     responses:
 *       200:
 *         description: 타이머 비활성화 성공
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: '#/components/schemas/BaseResponse'
 *                 - type: object
 *                   properties:
 *                     data:
 *                       $ref: '#/components/schemas/Timer'
 *       404:
 *         description: 타이머를 찾을 수 없음
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FailResponse'
 */
