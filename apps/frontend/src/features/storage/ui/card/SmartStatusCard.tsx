import { Activity, AlertTriangle } from "lucide-react";

import { useSmartInfo } from "@/entities";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared";

import { LoadingSmartStatus, SmartInfoBox } from "../../components";

export const SmartStatusCard = () => {
  const { data: smartInfoResponse, isLoading } = useSmartInfo();
  const smartInfo = smartInfoResponse?.data;

  if (isLoading) {
    return <LoadingSmartStatus />;
  }

  return (
    <Card className='flex h-full flex-col'>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          <Activity className='size-5' />
          S.M.A.R.T Health Status
        </CardTitle>
        <CardDescription>Hardware-level diagnostic information</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col'>
        {!smartInfo || smartInfo.length === 0 ? (
          <div className='text-muted-foreground flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center'>
            <AlertTriangle className='mb-2 size-8 opacity-50' />
            <p>No S.M.A.R.T data available</p>
            <p className='mt-1 text-xs'>
              S.M.A.R.T might be disabled or not supported by your drives.
            </p>
          </div>
        ) : (
          <div className='grid grid-cols-1 gap-4'>
            {smartInfo.map((info) => (
              <SmartInfoBox {...info} key={info.model} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
