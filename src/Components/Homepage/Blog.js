import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import Image from '../../Assets/img/bg.png'

const sections = [
  { title: 'My Facebook Link', url: '#' },
  { title: 'My Youtube Link', url: '#' },
  { title: 'My Instagram Link', url: '#' },
];

const mainFeaturedPost = {
  title: 'Selamat Datang!',
  description:
    "Terimakasih telah berkunjung ke halaman web saya, semoga anda dapat menikmati tulisan-tulisan sederhana yang dapat saya sajikan",
  image: Image,
  imageText: 'main image description',
  linkText: '#'
};

const featuredPosts = [
  {
    title: 'Biografi',
    date: '09 Juni',
    description:
      'Nama saya Paksi Ringkang Gumilang Atmaja Nugraha, kelahiran Cianjur, 09 Juni 2002',
    image: Image,
    imageLabel: 'Image Text',
  },
  {
    title: 'Pengalaman Pribadi',
    date: '20 September',
    description:
      'Saat ini saya merupakan seorang mahasiswa di Universitas Suryakancana, Program Studi...',
    image: Image,
    imageLabel: 'Image Text',
  },
];


const sidebar = {
  title: 'About',
  description:
    'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  archives: [
    { title: 'March 2020', url: '#' },
    { title: 'February 2020', url: '#' },
    { title: 'January 2020', url: '#' },
    { title: 'November 1999', url: '#' },
    { title: 'October 1999', url: '#' },
    { title: 'September 1999', url: '#' },
    { title: 'August 1999', url: '#' },
    { title: 'July 1999', url: '#' },
    { title: 'June 1999', url: '#' },
    { title: 'May 1999', url: '#' },
    { title: 'April 1999', url: '#' },
  ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};


const theme = createTheme({
  palette: {
    mode: 'dark',
  },
});

export default function Blog() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Paksi Ringkang" sections={sections} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={4}>
            {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))}
          </Grid>
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main title="From the firehose" posts={null} />
            <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
              theme={theme}
            />
          </Grid>
        </main>
      </Container>
      <Footer
        title="Lotarynska"
        description="Hari demi Hari kita berjuang untuk masa depan"
      />
    </ThemeProvider>
  );
}
