/**
 * @swagger
 * tags:
 *   name: Storage
 *   description: 스토리지(파티션 / SMART) 관련 API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     StoragePartition:
 *       type: object
 *       properties:
 *         device:
 *           type: string
 *           example: /dev/sda1
 *         mountPoint:
 *           type: string
 *           example: /
 *         fsType:
 *           type: string
 *           example: ext4
 *         total:
 *           type: integer
 *           description: 전체 용량(bytes)
 *           example: 31675383808
 *         used:
 *           type: integer
 *           description: 사용 중 용량(bytes)
 *           example: 14763401216
 *         free:
 *           type: integer
 *           description: 여유 용량(bytes)
 *           example: 15277051904
 *         usagePercent:
 *           type: number
 *           format: float
 *           description: 사용률(%)
 *           example: 49.1
 *         inodeTotal:
 *           type: integer
 *           example: 1966080
 *         inodeUsed:
 *           type: integer
 *           example: 312450
 *         inodeFree:
 *           type: integer
 *           example: 1653630
 *         inodeUsagePercent:
 *           type: number
 *           format: float
 *           example: 15.9
 *     SmartInfo:
 *       type: object
 *       properties:
 *         device:
 *           type: string
 *           example: /dev/sda
 *         model:
 *           type: string
 *           example: Samsung SSD 870 EVO 32GB
 *         serial:
 *           type: string
 *           example: S5ESNX0T123456
 *         firmwareVersion:
 *           type: string
 *           example: SVT01B6Q
 *         healthStatus:
 *           type: string
 *           enum: [good, warning, bad]
 *           example: good
 *         temperature:
 *           type: integer
 *           description: 온도(°C)
 *           example: 33
 *         powerOnHours:
 *           type: integer
 *           description: 전원 켠 시간(시간)
 *           example: 2840
 *         reallocatedSectors:
 *           type: integer
 *           description: 재할당된 섹터 수
 *           example: 0
 */

/**
 * @swagger
 * /storage/partitions:
 *   get:
 *     summary: 파티션 목록 조회
 *     tags: [Storage]
 *     responses:
 *       200:
 *         description: 파티션 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/StoragePartition'
 */

/**
 * @swagger
 * /storage/partitions/{device}:
 *   get:
 *     summary: 파티션 단건 조회
 *     tags: [Storage]
 *     parameters:
 *       - in: path
 *         name: device
 *         required: true
 *         schema:
 *           type: string
 *         description: "URL 인코딩된 장치명 (예: %2Fdev%2Fsda1)"
 *         example: "%2Fdev%2Fsda1"
 *     responses:
 *       200:
 *         description: 파티션 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/StoragePartition'
 *       404:
 *         description: 파티션 없음
 */

/**
 * @swagger
 * /storage/smart:
 *   get:
 *     summary: SMART 디스크 상태 목록 조회
 *     tags: [Storage]
 *     responses:
 *       200:
 *         description: SMART 정보 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/SmartInfo'
 */

/**
 * @swagger
 * /storage/smart/{device}:
 *   get:
 *     summary: SMART 정보 단건 조회
 *     tags: [Storage]
 *     parameters:
 *       - in: path
 *         name: device
 *         required: true
 *         schema:
 *           type: string
 *         description: "URL 인코딩된 장치명 (예: %2Fdev%2Fsda)"
 *         example: "%2Fdev%2Fsda"
 *     responses:
 *       200:
 *         description: SMART 상세 정보
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/SmartInfo'
 *       404:
 *         description: SMART 정보 없음
 */
