import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';

const TambahContentForm = (props) => {
  const [paragraphCount, setparagraphCount] = useState(props.FullContent ? props.FullContent.length :  0);
  const [paragraphContent, setparagraphContent] = useState(props.FullContent? props.FullContent : []);

  const handleParagraphcontent = (e,c) => {
    paragraphContent[c] = e;
    props.handleFullContentChange(paragraphContent);
  }
  const handleParagraphCount = (e) => {
    // console.log(paragraphContent);
    setparagraphCount(paragraphCount + 1);
    setparagraphContent(paragraphContent.concat(paragraphCount));
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
            value={props.Title}
            onChange={(e) => {props.handleTitleChange(e.currentTarget.value)}}
          />
        </Grid>
        <Grid item xs={12}>
          {paragraphContent.length != 0 ? 
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


export default TambahContentForm;