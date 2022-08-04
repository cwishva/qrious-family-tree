import Footer from '@components/layouts/Footer';
import Navbar from '@components/layouts/Navbar';
import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';
import { Helmet } from 'react-helmet-async';

interface IProps {
  pageTitle: string;
  children: ReactNode;
  maxWidth: 'sm' | 'md' | 'lg';
}

export default function PageLayout({ pageTitle, children, maxWidth }: IProps) {

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="qrious"
          content="qrious family tree"
        />
      </Helmet>

      <Navbar />
      <Box
        sx={{
          position: 'relative',
          top: '3rem',
          height: 'calc(100vh - 6rem)',
          display: 'flex',
          flexDirection: 'column',
          marginTop: 2
        }}
      >
        <Container maxWidth={maxWidth} sx={{ flex: 1 }}>
          <main>{children}</main>
        </Container>
        <Footer />
      </Box>
    </>
  );
}
