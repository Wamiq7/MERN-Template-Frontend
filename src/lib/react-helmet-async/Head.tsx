import type { FC } from 'react';
import { Helmet } from 'react-helmet-async';

type HeadProps = {
  title: string;
  description: string;
};

export const Head: FC<HeadProps> = ({ title, description }) => {
  return (
    <Helmet title={title} defaultTitle="React-Vite-TailwindCSS-Starter">
      <meta name="description" content={description} />
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
    </Helmet>
  );
};
