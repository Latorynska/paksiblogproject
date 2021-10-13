import * as React from 'react';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { ThemeProvider } from '@mui/material/styles';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import Loader from '../Layout/Loader';

function Sidebar(props) {
  const { description, social, title, contents } = props;

  const handleClick = (e,data) => {
    e.preventDefault();
    const anchor = (e.target.ownerDocument || document).querySelector(
      '#maincontent',
    );
    if (anchor) {
      anchor.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
    setTimeout(function() {
      
      props.changeActiveContent(data);
    }, 250);
    
  }

  return (
      <Grid item xs={12} md={4}>
        
      <ThemeProvider theme={props.theme}>
        <Paper elevation={0} sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography>{description}</Typography>
        </Paper>
    </ThemeProvider>
        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Archives
        </Typography>
        {contents ? contents.map((archive,index) => (
          archive ? 
          <Link 
            display="block"
            underline="none"
            href="#"
            onClick={(e) => {handleClick(e,archive[1])}} key={archive[0]}
            >
            {archive[1].Title}
          </Link>
          : <></>
        )) :
          <Loader />
          
        }

        <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
          Social
        </Typography>
        {social.map((network) => (
          <Link
            display="block"
            variant="body1"
            href="#"
            key={network.name}
            sx={{ mb: 0.5 }}
            href="https://github.com/Latorynska"
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <network.icon />
              <span>{network.name}</span>
            </Stack>
          </Link>
        ))}
      </Grid>
  );
}

Sidebar.propTypes = {
  description: PropTypes.string.isRequired,
  social: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.elementType.isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
  title: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const Contents = state.firestore.data.Contents;
  const finalC = Object.entries(Contents).filter(value => value[0] != "mainbanner");
  return {
    contents : finalC
  }
}

export default compose(connect(mapStateToProps), firestoreConnect(() => [
  {collection :'Contents'}
]))(Sidebar);