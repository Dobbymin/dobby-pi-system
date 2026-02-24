/**
 * @swagger
 * tags:
 *   name: System
 *   description: 시스템 정보 및 메트릭 API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     SystemInfo:
 *       type: object
 *       properties:
 *         hostname:
 *           type: string
 *           example: dobby-pi
 *         osVersion:
 *           type: string
 *           example: Ubuntu 22.04.5 LTS
 *         kernel:
 *           type: string
 *           example: Linux 5.15.0-1056-raspi
 *         arch:
 *           type: string
 *           example: aarch64
 *         platform:
 *           type: string
 *           example: linux
 *         distro:
 *           type: string
 *           example: Ubuntu
 *         uptime:
 *           type: integer
 *           description: 업타임 (초)
 *           example: 1234567
 *         connectedUsers:
 *           type: integer
 *           example: 1
 *         ipAddress:
 *           type: string
 *           example: 192.168.0.10
 *     CpuInfo:
 *       type: object
 *       properties:
 *         model:
 *           type: string
 *           example: Cortex-A72
 *         usage:
 *           type: number
 *           description: 전체 CPU 사용률 (%)
 *           example: 23.5
 *         cores:
 *           type: array
 *           items:
 *             type: number
 *           description: 코어별 사용률 (%)
 *           example: [20.1, 25.3, 18.7, 30.0]
 *         speed:
 *           type: number
 *           description: 현재 클럭 (MHz)
 *           example: 1200
 *         temperature:
 *           type: number
 *           description: CPU 온도 (°C)
 *           example: 42.5
 *         throttling:
 *           type: boolean
 *           example: false
 *     MemoryInfo:
 *       type: object
 *       properties:
 *         total:
 *           type: integer
 *           description: 전체 메모리 (bytes)
 *           example: 8589934592
 *         used:
 *           type: integer
 *           example: 1288490188
 *         free:
 *           type: integer
 *           example: 5905580032
 *         cached:
 *           type: integer
 *           example: 858993459
 *         buffers:
 *           type: integer
 *           example: 214748364
 *         usagePercent:
 *           type: number
 *           example: 25.3
 *     DiskInfo:
 *       type: object
 *       properties:
 *         device:
 *           type: string
 *           example: /dev/mmcblk0p2
 *         mountPoint:
 *           type: string
 *           example: /
 *         fsType:
 *           type: string
 *           example: ext4
 *         label:
 *           type: string
 *           example: Samsung EVO Plus 64GB
 *         total:
 *           type: integer
 *           example: 68719476736
 *         used:
 *           type: integer
 *           example: 16106127360
 *         free:
 *           type: integer
 *           example: 50616406016
 *         usagePercent:
 *           type: number
 *           example: 23.5
 *         readSpeed:
 *           type: integer
 *           description: 읽기 속도 (bytes/s)
 *           example: 2097152
 *         writeSpeed:
 *           type: integer
 *           description: 쓰기 속도 (bytes/s)
 *           example: 1048576
 *     NetworkStat:
 *       type: object
 *       properties:
 *         iface:
 *           type: string
 *           example: eth0
 *         ip4:
 *           type: string
 *           example: 192.168.0.10
 *         mac:
 *           type: string
 *           example: dc:a6:32:xx:xx:xx
 *         speed:
 *           type: integer
 *           description: 링크 속도 (Mbps)
 *           example: 1000
 *         type:
 *           type: string
 *           example: wired
 *         rx:
 *           type: integer
 *           description: 수신 속도 (bytes/s)
 *           example: 5242880
 *         tx:
 *           type: integer
 *           description: 송신 속도 (bytes/s)
 *           example: 1048576
 *     SystemMetrics:
 *       type: object
 *       properties:
 *         cpu:
 *           $ref: '#/components/schemas/CpuInfo'
 *         memory:
 *           $ref: '#/components/schemas/MemoryInfo'
 *         disks:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/DiskInfo'
 *         network:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/NetworkStat'
 *         timestamp:
 *           type: integer
 *           description: Unix timestamp (ms)
 *           example: 1700000000000
 */

/**
 * @swagger
 * /api/system/info:
 *   get:
 *     summary: 시스템 기본 정보 조회
 *     description: hostname, OS 버전, 커널, 업타임, IP 주소 등 정적 정보를 반환합니다.
 *     tags: [System]
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
 *                       $ref: '#/components/schemas/SystemInfo'
 */

/**
 * @swagger
 * /api/system/metrics:
 *   get:
 *     summary: 시스템 실시간 메트릭 조회
 *     description: CPU / 메모리 / 디스크 I/O / 네트워크 트래픽 실시간 수치를 반환합니다.
 *     tags: [System]
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
 *                       $ref: '#/components/schemas/SystemMetrics'
 */
