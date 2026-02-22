export const mockServiceLogs: Record<string, string[]> = {
  "nginx.service": [
    "Jan 15 08:00:01 dobby-pi nginx[1234]: nginx: the configuration file /etc/nginx/nginx.conf syntax is ok",
    "Jan 15 08:00:01 dobby-pi nginx[1234]: nginx: configuration file /etc/nginx/nginx.conf test is successful",
    "Jan 15 08:00:01 dobby-pi systemd[1]: Started A high performance web server and a reverse proxy server.",
    "Jan 15 08:00:02 dobby-pi nginx[1234]: 2024/01/15 08:00:02 [notice] 1234#1234: using the 'epoll' event method",
    "Jan 15 08:00:02 dobby-pi nginx[1234]: 2024/01/15 08:00:02 [notice] 1234#1234: nginx/1.24.0",
    'Jan 15 08:05:00 dobby-pi nginx[1234]: 192.168.1.1 - - [15/Jan/2024:08:05:00 +0000] "GET / HTTP/1.1" 200 612',
    'Jan 15 08:10:00 dobby-pi nginx[1234]: 192.168.1.2 - - [15/Jan/2024:08:10:00 +0000] "GET /api/health HTTP/1.1" 200 17',
  ],
  "sshd.service": [
    "Jan 15 07:55:00 dobby-pi sshd[892]: Server listening on 0.0.0.0 port 22.",
    "Jan 15 07:55:00 dobby-pi sshd[892]: Server listening on :: port 22.",
    "Jan 15 07:55:01 dobby-pi systemd[1]: Started OpenSSH server daemon.",
    "Jan 15 09:00:00 dobby-pi sshd[892]: Accepted publickey for pi from 192.168.1.100 port 52341 ssh2",
    "Jan 15 09:00:01 dobby-pi sshd[892]: pam_unix(sshd:session): session opened for user pi by (uid=0)",
  ],
  "docker.service": [
    'Jan 15 08:01:00 dobby-pi dockerd[1456]: time="2024-01-15T08:01:00Z" level=info msg="Starting up"',
    'Jan 15 08:01:01 dobby-pi dockerd[1456]: time="2024-01-15T08:01:01Z" level=info msg="Loading containers: start."',
    'Jan 15 08:01:05 dobby-pi dockerd[1456]: time="2024-01-15T08:01:05Z" level=info msg="Loading containers: done."',
    'Jan 15 08:01:05 dobby-pi dockerd[1456]: time="2024-01-15T08:01:05Z" level=info msg="Docker daemon" commit=v24.0.7',
    "Jan 15 08:01:05 dobby-pi systemd[1]: Started Docker Application Container Engine.",
  ],
};
