import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { ClearContent } from '../../../../Store/Actions/ContentActions';
import { connect, useSelector } from 'react-redux';

const TambahContentForm = (props) => {
  useEffect(() => {
    return () => {
    }
  }, [])

  const { content } = useSelector(state => state.Content);
  
  const [paragraphContent, setparagraphContent] = useState(props.FullContent ? props.FullContent : null);
  const [Title, setTitle] = useState(content ? content.Title : "");

  const handleParagraphcontent = (e,c) => {
    if(Array.isArray(paragraphContent)){
      paragraphContent[c] = e;
      props.handleFullContentChange(paragraphContent);
    }
    else{
      props.handleFullContentChange(e);
    }
  }

  const handleParagraphCount = () => {
    // console.log(paragraphContent);
    setparagraphContent(paragraphContent.concat(paragraphContent.length + 1));
  }

  const handletitlechange = (e) => {
    props.handleTitleChange(e.currentTarget.value);
    setTitle(e.currentTarget.value);
  }

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Content Data
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          <TextField
            required
            id="Title"
            name="Title"
            label="Title"
            fullWidth
            variant="standard"
            value={Title}
            onChange={(e) => {handletitlechange(e)}}
          />
        </Grid>
        <Grid item xs={12}>
          {paragraphContent.length != 0 && Array.isArray(paragraphContent) ? 
            paragraphContent.map((val,key) => {
              return(
                <TextareaAutosize
                  minRows={4}
                  aria-label="maximum height"
                  placeholder="Maximum 4 rows"
                  key={`parag${key}`}
                  defaultValue={val}
                  onChange={(e) => handleParagraphcontent(e.currentTarget.value,key)}
                  style={{ width: '100%' }}
                />
              )
            })
          :
          <TextareaAutosize
              minRows={6}
              aria-label="maximum height"
              placeholder="Maximum 4 rows"
              defaultValue={ paragraphContent ? paragraphContent : ""}
              onChange={(e) => handleParagraphcontent(e.currentTarget.value,0)}
              style={{ width: '100%' }}
            />
          }
            
          <Button variant="contained" sx={{float: 'right'}} onClick={() => handleParagraphCount()}>Add Paragraph</Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="ShortDesc"
            name="ShortDesc"
            label="Short Description"
            fullWidth
            variant="standard"
            value={props.ShortDesc}
            onChange={(e) => {props.handleShortDescChange(e.currentTarget.value)}}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

const mapDispatchToProps = (dispatch) => {
  return{
    clearcontent: () => dispatch(ClearContent()),
  }
}

export default connect(null,mapDispatchToProps)(TambahContentForm);