import React from "react";
import Grid from "@mui/material/Grid";
import FeaturedContent from "./FeaturedContent";
import ContentList from "./ContentList";

const Dashboard = () => {
    return(
        <React.Fragment>
            <Grid container spacing={3} sx={{ justifyContent: 'space-between'}}>
                <FeaturedContent section="Banner Homepage"/>
                <FeaturedContent section="Featured Content 1"/>
                <FeaturedContent section="Featured Content 2"/>
            </Grid>
            <Grid sx={{mt:4}}>
                <ContentList/>
            </Grid>
        </React.Fragment>
    )
}

export default Dashboard;