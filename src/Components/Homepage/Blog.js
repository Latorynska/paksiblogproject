import React, { Component, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase';
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
import { getBanner } from '../../Store/Actions/BlogActions';
import Loader from '../Layout/Loader';

const sections = [
  { title: 'My Facebook Link', url: '#' },
  { title: 'My Youtube Link', url: '#' },
  { title: 'My Instagram Link', url: '#' },
];

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
  title: 'Tentang Kami',
  description:
    'Merupakan Website yang dibuat untuk memenuhi kebutuhan pendidikan sebagai seorang mahasiswa, dan hanya dikembangkan oleh satu orang disela-sela waktu luang',
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
class Blog extends Component {

  constructor(props){
    super(props);
    this.state = {
      activeContent: ''
    }
  }
  changeActiveContent = (e) => {
    this.setState({activeContent: e});
  }
  render() {    
    const { err, banner, loading, featured1, featured2, contents } = this.props;
    

    if(isLoaded(banner) && !isEmpty(banner) && isLoaded(featured1)){
      const mainFeaturedPost = {
        title: banner.Title,
        FullContent: banner.FullContent,
        image: banner.ImageUrl,
        imageText: 'main image',
      };
      return(
          
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Header title="Paksi Ringkang" sections={sections} />
          <main>
            <MainFeaturedPost post={mainFeaturedPost} />
            <Grid container spacing={4}>
              <FeaturedPost key={featured1.Title} post={featured1} onClick={()=> {this.changeActiveContent(featured1)}} />
              <FeaturedPost key={featured2.Title} post={featured2} onClick={()=> {this.changeActiveContent(featured2)}} />
            </Grid>
            <div id="maincontent"></div>
            <Grid container spacing={5} sx={{ mt: 3 }}>
                {
                (isLoaded(featured1) && !isEmpty(featured1)) ? 
                    <Main title="Konten Kami" posts={this.state.activeContent ? this.state.activeContent : this.props.match.params.CID ? contents[this.props.match.params.CID] : featured2} />
                :
                    <Loader />
                }
                  <Sidebar
                    title={sidebar.title}
                    description={sidebar.description}
                    social={sidebar.social}
                    changeActiveContent={(x) => {this.changeActiveContent(x)}}
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
      )
    }
    else{
      return (
        <Loader />
      )
    }
  }
}

const mapStateToProps = (state, ownProps) => {
  const Contents = state.firestore.data.Contents;
  const ControlDisplay = state.firestore.data.ControlDisplay;
  const featured1id = ControlDisplay ? ControlDisplay["Controller"].featured1 : "";
  const featured2id = ControlDisplay ? ControlDisplay["Controller"].featured2 : "";
  const bannerid = ControlDisplay ? ControlDisplay["Controller"].banner : "";
  const banner = Contents ? Contents[bannerid] : null;
  const featured1 = Contents ? Contents[featured1id] : null;
  const featured2 = Contents ? Contents[featured2id] : null;
  return{
    banner: banner,
    loading: state.Blog.loading,
    err: state.Blog.err,
    featured1: featured1,
    featured2: featured2,
    contents: Contents
  }
}
const mapDispatchToProps = (dispatch) => {
  return{
    getbanner: () => dispatch(getBanner())
  }
}

export default compose(
    connect(mapStateToProps,mapDispatchToProps),
    firestoreConnect(() => [
      'Contents',
      'ControlDisplay'
    ])
  )(Blog);