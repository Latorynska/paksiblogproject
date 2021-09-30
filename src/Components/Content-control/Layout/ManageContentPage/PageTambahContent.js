import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { setError, TambahContent, getSingleContent, updateContent, ClearContent, setLoading } from '../../../../Store/Actions/ContentActions';
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
  
  
  const dispatch = useDispatch();
  
  useEffect(() => {
    props.setloading(true);
    props.CID ? props.getTargetedContent(props.CID).then(()=>props.setloading(false)) : props.clearcontent();
    return () => {
      props.clearcontent();
    }
  }, []);
  
  const { TD, ContentActionsStatus, iserror } = props;
  const ContentLoading = useSelector(state => state.Content.loading);
  const [Title, setTitle] = useState( TD ? `${TD.Title}` : "");
  const [FullContent, setFullContent] = useState( TD ? TD.FullContent : []);
  const [ShortDesc, setShortDesc] = useState(TD ? TD.ShortDesc ? `${TD.ShortDesc}` : "" : "");
  const [File, setFile] = useState(null);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      title: Title,
      short: ShortDesc,
      content: FullContent,
    }
    console.log(data);
    // if(props.CID){
    //   props.updateContent(props.CID,data);
    //   props.seterror(null);
    // }
    // else{
    //   props.tambahContent(data);
    // }
  }

  const ContentisLoaded = () => {
    if(!ContentLoading){
      return (
        <TambahContentForm 
          Title={TD ? TD.Title : ""}
          FullContent={TD ? TD.FullContent : []}
          ShortDesc={TD ? TD.ShortDesc : ""}
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
      !ContentLoading ? 
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                    <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
                    <Typography component="h1" variant="h4" align="center">
                        {TD ? `Edit Content : ${TD.Title}` : "Tambah Content"}
                    </Typography>
                    {iserror ? iserror : <></>}
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
        : 
        <Loader />
    )
}

const mapStateToProps = (state,ownProps) => {
  return {
    TD: state.Content.content,
    ContentLoading: state.Content.loading,
    ContentActionsStatus: state.Content.status,
    iserror: state.Content.err,
  }
}

const mapDispatchToProps = (dispatch) => {
    return{
      tambahContent: (data) => dispatch(TambahContent(data)),
      updateContent: (CID,data) => dispatch(updateContent(CID,data)),
      getTargetedContent: (CID) => dispatch(getSingleContent(CID)),
      clearcontent: () => dispatch(ClearContent()),
      seterror: (status) => dispatch(setError(status)),
      setloading: (load) => dispatch(setLoading(load))
    }
}

export default compose(
  connect(mapStateToProps,mapDispatchToProps),
  firestoreConnect(() => [
    { collection : "Contents"}
  ])
)(PageTambahContent);
