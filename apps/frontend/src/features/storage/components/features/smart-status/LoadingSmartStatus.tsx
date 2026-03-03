import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared";

import { SmartStatusSkeleton } from "../../common";

export const LoadingSmartStatus = () => {
  return (
    <Card className='flex h-full flex-col'>
      <CardHeader>
        <CardTitle>S.M.A.R.T Health Status</CardTitle>
        <CardDescription>Loading disk health information...</CardDescription>
      </CardHeader>
      <CardContent className='flex flex-1 flex-col justify-center'>
        <div className='grid grid-cols-1 gap-4'>
          <SmartStatusSkeleton />
        </div>
      </CardContent>
    </Card>
  );
};
