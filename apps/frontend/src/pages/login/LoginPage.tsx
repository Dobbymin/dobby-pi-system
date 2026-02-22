import { useState } from "react";

import { useLogin } from "@/features/auth";
import { Button, Input } from "@/shared/components/ui";

export default function LoginPage() {
  const loginMutation = useLogin();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate({ username, password }, { onSuccess: () => (window.location.href = "/") });
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-slate-50 dark:bg-[#0d1117]'>
      <div className='w-full max-w-sm'>
        <div className='mb-8 text-center'>
          <h1 className='text-2xl font-bold text-slate-900 dark:text-white'>Dobby Pi System</h1>
          <p className='mt-2 text-sm text-slate-500 dark:text-slate-400'>
            라즈베리 파이 관리 대시보드
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className='rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-[#1c2127]'
        >
          <div className='flex flex-col gap-4'>
            <div className='flex flex-col gap-1.5'>
              <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                사용자명
              </label>
              <Input
                type='text'
                placeholder='admin'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className='flex flex-col gap-1.5'>
              <label className='text-sm font-medium text-slate-700 dark:text-slate-300'>
                비밀번호
              </label>
              <Input
                type='password'
                placeholder='••••••••'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {loginMutation.isError && (
              <p className='text-sm text-red-500'>
                로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.
              </p>
            )}

            <Button type='submit' className='w-full' disabled={loginMutation.isPending}>
              {loginMutation.isPending ? "로그인 중..." : "로그인"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
