import PageWrapper from '@/components/PageWrapper';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { userService } from '@/shared/services/user.service';

export default function Users() {
  const { data } = userService.userGetAllUsers();
  console.log('data', data);

  return (
    <PageWrapper>
      <div>
        Users
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Create project</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent></CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
