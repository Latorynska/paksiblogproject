import React from "react";
import Grid from "@mui/material/Grid";
import FeaturedContent from "./FeaturedContent";
import ContentList from "./ContentList";
import Loader from "../../Layout/Loader";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isEmpty, isLoaded } from 'react-redux-firebase';

const Dashboard = (props) => {
    const { banner, bannerid, contents, featured1, featuredid1 } = props;
    if((isLoaded(banner) && !isEmpty(banner)) && (!isEmpty(featuredid1))){
        return(
            <React.Fragment>
                <Grid container spacing={3} sx={{ justifyContent: 'space-between'}}>
                    <FeaturedContent section="Banner Homepage" content={banner} ID={bannerid}/>
                    <FeaturedContent section="Featured Content 1" content={featured1 ? featured1 : "" } ID={featuredid1} />
                    <FeaturedContent section="Featured Content 2" content={featured1 ? featured1 : ""} ID={featuredid1}/>
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
    const ControlDisplay = state.firestore.data.ControlDisplay;
    const featured1id = ControlDisplay ? ControlDisplay["Controller"].featured1 : "";
    const bannerid = ControlDisplay ? ControlDisplay["Controller"].banner : "";
    const banner = Contents ? Contents[bannerid] : null;
    const featured1 = Contents ? Contents[featured1id] : null;
    return{
      contents: Contents,
      banner: banner,
      bannerid: bannerid,
      featuredid1: featured1id,
      loading: state.Blog.loading,
      err: state.Blog.err,
      featured1: featured1
    }
  }

export default compose(
    connect(mapStateToProps),
    firestoreConnect(() => [
        'Contents',
        'ControlDisplay'
      ])
)(Dashboard);