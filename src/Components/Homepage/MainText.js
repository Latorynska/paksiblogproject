import React from 'react';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import moment from 'moment';

const MainText = (props) => {
    const { content } = props;
    return (
        <React.Fragment>
            <Typography variant="h5" gutterBottom>
                {console.log(content)}
                {content.Title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
                {moment(content.createdAt.toDate()).calendar()}
            </Typography>
            {content.FullContent.map((val) =>{
                return(
                    <Typography mt={3}>{val}</Typography>
                )
            })}
            <Divider />
        </React.Fragment>
    )
}

export default MainText
