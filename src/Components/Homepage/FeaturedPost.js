import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import moment from 'moment';

function FeaturedPost(props) {
  const { post } = props;

  const handleClick = (e) => {
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
  }
  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" onClick={(e) => {props.onClick();handleClick(e)}}>
        <Card sx={{ display: 'flex' }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post.Title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post.updatedAt ? moment(post.updatedAt.toDate()).calendar() : moment(post.createdAt.toDate()).calendar()}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post.ShortDesc}
            </Typography>
            <Typography variant="subtitle1" color="primary">
              Lanjutkan Membaca.....
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            image={post.ImageUrl}
            alt={post.ImageUrl}
          />
        </Card>
      </CardActionArea>
    </Grid>
  );
}

export default FeaturedPost;
