import RegisterPage from './register.page';

const index = () => {
  return (
    <>
      <title>Register</title>
      <meta name="register-description" content="This is a register page of the application" />

      {/* <!-- Open Graph / Facebook --> */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content="https://on.foundation" />
      <meta property="og:title" content="Foundation" />
      <meta property="og:description" content="A revolutionary new social platform. Own your data. Get rewarded." />
      <meta property="og:image" content="https://foundation-seo.s3.amazonaws.com/seo-logo-v2.png" />

      {/* <!-- Twitter --> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://on.foundation" />
      <meta name="twitter:title" content="Foundation" />
      <meta name="twitter:description" content="A revolutionary new social platform. Own your data. Get rewarded." />
      <meta name="twitter:image" content="https://foundation-seo.s3.amazonaws.com/seo-logo-v2.png" />

      <RegisterPage />
    </>
  );
};

export default index;
