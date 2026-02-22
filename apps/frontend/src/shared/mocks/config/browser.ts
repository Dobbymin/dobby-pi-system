import { http, passthrough } from "msw";
import { setupWorker } from "msw/browser";

import { BASE_URL } from "../../constants";

import { handlers } from "./handlers";

const baseUrl = new URL(BASE_URL);

export const worker = setupWorker(
  ...handlers,

  http.get("*", ({ request }) => {
    const url = new URL(request.url);
    // BASE_URL과 다른 서버로 가는 요청(ex. 홈페이지 url)은 실제 네트워크로 통과
    if (url.origin !== baseUrl.origin) {
      return passthrough();
    }
  }),
);
