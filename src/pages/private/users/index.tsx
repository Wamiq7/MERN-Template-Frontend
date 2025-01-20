import { CustomPagination } from '@/components/CustomPagination';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { userService } from '@/shared/services/user.service';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

export default function Users() {
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 9,
  });

  const { data, isLoading } = userService.useGetAllUsers(pagination.page, pagination.limit);

  const handlePageChange = (newPage: number) => {
    setPagination((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <div className="container mx-auto min-h-[calc(100dvh-134px)] w-full max-w-6xl p-4 md:p-6">
      <h1 className="mb-4 text-heading-lg font-semibold">Users</h1>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      ) : (
        <div>
          <div className="grid w-full grid-cols-3 items-start justify-center gap-4">
            {data?.data.map((user) => (
              <Card>
                <CardHeader>
                  <CardTitle>{user.name}</CardTitle>
                  <CardDescription>{user.email}</CardDescription>
                </CardHeader>
                <CardContent>{user.dateOfBirth}</CardContent>
              </Card>
            ))}
          </div>
          {data?.pagination && <CustomPagination data={data?.pagination} onPageChange={handlePageChange} />}
        </div>
      )}
    </div>
  );
}
