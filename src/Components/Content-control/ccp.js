import { Button } from '@mui/material';
import React from 'react';
import { signOut } from '../../Store/Actions/AuthActions';
import { connect } from 'react-redux';
import CCPFrame from './Layout/CCPFrame';
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette:{
        mode: 'dark'
    }
})

const ccp = (props) => {
    return (
        <div>
            <CCPFrame theme={theme} 
            page={props.match.params.page? props.match.params.page : "Dashboard" }
            CID={props.match.params.id ? props.match.params.id : null}
             />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        signOut : () => dispatch(signOut())
    }
}


export default connect(null, mapDispatchToProps)(ccp);
