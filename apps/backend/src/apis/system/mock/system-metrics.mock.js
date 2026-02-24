/**
 * 라즈베리파이 4B 시스템 메트릭 mock 기본값
 * 호출마다 약간의 랜덤성을 부여해 실시간처럼 보이게 합니다.
 */

const rand = (min, max) => Math.random() * (max - min) + min;
const randInt = (min, max) => Math.floor(rand(min, max));

export const generateSystemMetricsMock = () => {
  const cpuUsage = rand(5, 55);
  const cores = [rand(4, 60), rand(3, 55), rand(5, 65), rand(4, 50)];

  return {
    cpu: {
      model: 'Cortex-A72',
      usage: parseFloat(cpuUsage.toFixed(1)),
      cores: cores.map((c) => parseFloat(c.toFixed(1))),
      speed: parseFloat(rand(600, 1500).toFixed(0)), // MHz
      temperature: parseFloat(rand(38, 55).toFixed(1)), // °C
      throttling: cpuUsage > 85,
    },
    memory: {
      total: 8 * 1024 * 1024 * 1024, // 8GB
      used: Math.floor(rand(1.0, 3.5) * 1024 * 1024 * 1024),
      free: Math.floor(rand(3.0, 6.0) * 1024 * 1024 * 1024),
      cached: Math.floor(rand(0.5, 1.5) * 1024 * 1024 * 1024),
      buffers: Math.floor(rand(0.1, 0.4) * 1024 * 1024 * 1024),
      usagePercent: parseFloat(rand(15, 45).toFixed(1)),
    },
    disks: [
      {
        device: '/dev/mmcblk0p2',
        mountPoint: '/',
        fsType: 'ext4',
        label: 'Samsung EVO Plus 64GB',
        total: 64 * 1024 * 1024 * 1024,
        used: Math.floor(rand(12, 24) * 1024 * 1024 * 1024),
        free: Math.floor(rand(38, 50) * 1024 * 1024 * 1024),
        usagePercent: parseFloat(rand(20, 38).toFixed(1)),
        readSpeed: Math.floor(rand(500, 8000) * 1024), // bytes/s
        writeSpeed: Math.floor(rand(200, 4000) * 1024), // bytes/s
      },
    ],
    network: [
      {
        iface: 'eth0',
        ip4: '192.168.0.10',
        mac: 'dc:a6:32:xx:xx:xx',
        speed: 1000,
        type: 'wired',
        rx: Math.floor(rand(0.5, 15) * 1024 * 1024), // bytes/s
        tx: Math.floor(rand(0.1, 5) * 1024 * 1024), // bytes/s
      },
    ],
    timestamp: Date.now(),
  };
};
