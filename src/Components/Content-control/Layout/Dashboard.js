import React from "react";
import Grid from "@mui/material/Grid";
import FeaturedContent from "./FeaturedContent";
import ContentList from "./ContentList";
import Loader from "../../Layout/Loader";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase';

const Dashboard = (props) => {
    const { banner } = props;
    if(isLoaded(banner) && !isEmpty(banner)){
        return(
            <React.Fragment>
                <Grid container spacing={3} sx={{ justifyContent: 'space-between'}}>
                    <FeaturedContent section="Banner Homepage" content={banner}/>
                </Grid>
                <Grid sx={{mt:4}}>
                    <ContentList/>
                </Grid>
            </React.Fragment>
        )
    }
    else{
        return(
            <Loader />
        )
    }
}

const mapStateToProps = (state) => {
    const Contents = state.firestore.data.Contents;
    const banner = Contents ? Contents["mainbanner"] : null;
    return{
      banner: banner,
      loading: state.Blog.loading,
      err: state.Blog.err
    }
  }

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => [
        { collection : "Contents"}
    ])
)(Dashboard);