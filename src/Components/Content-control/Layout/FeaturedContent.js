import * as React from 'react';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const FeaturedContent = (props) => {
  const { ID, Title, ShortDesc, ImageUrl, Description } = props.content;
  return (
    <Grid item key={ID} xs={12} sm={6} md={4}>
        <Typography>
          {props.section}
        </Typography>
      <Card
        sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <CardMedia
          component="img"
          sx={{
            // 16:9
            width:'480px',
            height:'270px'
          }}
          image={ImageUrl}
          alt="random"
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            {Title}
          </Typography>
          <Typography>
            {ShortDesc ? ShortDesc : Description }
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View</Button>
          <Button size="small">Edit</Button>
        </CardActions>
      </Card>
    </Grid>
  )
}



export default FeaturedContent;