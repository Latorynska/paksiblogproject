import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { AddCircleOutlineSharp, ViewList } from '@mui/icons-material';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import { useHistory } from "react-router-dom";


const NavBar = (props) => {
  let history = useHistory();
  return (
    <React.Fragment>
      <Divider/>
      <List>
        <ListItem button onClick={() => {history.push('/content-control/Dashboard')}} >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button onClick={() => {history.push('/content-control/ContentList')}}>
          <ListItemIcon>
            <ViewList />
          </ListItemIcon>
          <ListItemText primary="All content" />
        </ListItem>
      </List>
      <Divider/>
      <List>
        <ListSubheader inset>Manage Content</ListSubheader>
        <ListItem button onClick={() => {history.push('/content-control/TambahContent')}}>
          <ListItemIcon>
            <AddCircleOutlineSharp />
          </ListItemIcon>
          <ListItemText primary="Add new Content" />
        </ListItem>
      </List>
    </React.Fragment>
  )
}


export default NavBar;