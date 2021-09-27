import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { setError, TambahContent, getSingleContent, updateContent } from '../../../../Store/Actions/ContentActions';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TambahContentForm from './TambahContentForm';
import { compose } from 'redux';
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase';
import Loader from '../../../Layout/Loader';

function Copyright() {
    return (
      <Typography variant="body2" color="text.secondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Lotarynska
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


const theme = createTheme();

const PageTambahContent = (props) => {
  
  const { TD, ContentLoading, ContentActionsStatus } = props;
  const [Title, setTitle] = useState( TD ? `${TD.Title}` : "");
  const [FullContent, setFullContent] = useState( TD? TD.FullContent : []);
  const [ShortDesc, setShortDesc] = useState(TD ? `${TD.ShortDesc}` : "");
  const [File, setFile] = useState(null);
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    return () => {
      dispatch(setError(null));
    }
  }, [dispatch])
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: Title,
      short: ShortDesc,
      content: FullContent,
    }
    console.log(data);
    console.log(TD);
    if(props.CID){
      props.updateContent(props.CID,data);
    }
    else{
      props.tambahContent(data);
    }
  }

  const ContentisLoaded = () => {
    if(!ContentLoading){
      return (
        <TambahContentForm 
          Title={TD ? Title : ""}
          FullContent={TD ? FullContent : []}
          ShortDesc={ShortDesc}
          handleTitleChange={(e) => {setTitle(e)}} 
          handleFullContentChange={(e) => {setFullContent(e)}}
          handleShortDescChange={(e)=>{setShortDesc(e)}}
          handleFileChange={(e) => {setFile(e)}}
        />
      )
    }
    else{
      return (
        <Loader />
      )
    }
  }
    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        {TD ? `Edit Content : ${TD.Title}` : "Tambah Content"}
                    </Typography>
                    <React.Fragment>
                        <React.Fragment>
                            {ContentisLoaded()}
                            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', justifyContent: 'flex-end' }}>

                            <Button
                                variant="contained"
                                sx={{ mt: 3, ml: 1 }}
                                type="submit"
                            >
                              Submit
                            </Button>
                            </Box>
                        </React.Fragment>
                    </React.Fragment>
                    </Paper>
            </ThemeProvider>
        </React.Fragment>
    )
}

const mapStateToProps = (state,ownProps) => {
  return {
    TD: state.Content.content,
    ContentLoading: state.Content.loading,
    ContentActionsStatus: state.Content.status
  }
}

const mapDispatchToProps = (dispatch) => {
    return{
      tambahContent: (data) => dispatch(TambahContent(data)),
      updateContent: (CID,data) => dispatch(updateContent(CID,data)),
      getTargetedContent: (CID) => dispatch(getSingleContent(CID)),
    }
}

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect(() => [
    { collection : "Contents"}
  ])
)(PageTambahContent);
