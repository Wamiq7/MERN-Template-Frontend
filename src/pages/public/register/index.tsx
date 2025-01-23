import { Head } from '@/lib/react-helmet-async/Head';
import RegisterPage from './register.page';

const index = () => {
  return (
    <>
      <Head title="Register" description="This is a register page of the application" />
      <RegisterPage />
    </>
  );
};

export default index;
