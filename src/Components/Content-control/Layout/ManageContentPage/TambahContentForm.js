import React, { useEffect, useState,useRef } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import { ClearContent } from '../../../../Store/Actions/ContentActions';
import { connect, useSelector } from 'react-redux';

const TambahContentForm = (props) => {
  
  const { content } = useSelector(state => state.Content);
  
  const [paragraphContent, setparagraphContent] = useState(content ? content.FullContent : []);
  const [Title, setTitle] = useState(content ? content.Title : "");
  const [ShortDesc, setShortDesc] = useState(content ? content.ShortDesc : null);

  const fullC = useRef(null);
  
  useEffect(() => {
    props.handleTitleChange(props.Title);
    props.handleShortDescChange(props.ShortDesc);
    props.handleFullContentChange(props.FullContent);
    return () => {
    }
  }, [content])


  const handleParagraphcontent = (e,c) => {
    if(Array.isArray(paragraphContent)){
      paragraphContent[c] = e;
      props.handleFullContentChange(paragraphContent);
    }
    else{
      props.handleFullContentChange(e);
    }
  }

  const removeParag = (index) => {
    let buffer = [];
    paragraphContent.splice(index,1);
    paragraphContent.map((val,key) =>{
        buffer.push(val);
        fullC.current.children[key].firstElementChild.value = val;
    });
    setparagraphContent(buffer);
    props.handleFullContentChange(buffer);
    //console.log(buffer);
  }
  const handleParagraphCount = () => {
    // console.log(paragraphContent);
    setparagraphContent(paragraphContent.concat(paragraphContent.length + 1));
  }

  const handletitlechange = (e) => {
    props.handleTitleChange(e.currentTarget.value);
    setTitle(e.currentTarget.value);
  }
  const handleShortDescChange = (e) => {
    props.handleShortDescChange(e.currentTarget.value);
    setShortDesc(e.currentTarget.value)
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
          <div ref={fullC}>
          {paragraphContent.length != 0 && Array.isArray(paragraphContent) ? 
            paragraphContent.map((val,key) => {
              return(
                <Box sx={{display:'flex'}}>
                  <TextareaAutosize
                    minRows={4}
                    aria-label="maximum height"
                    placeholder="Maximum 4 rows"
                    key={`parag${key}`}
                    defaultValue={val}
                    onChange={(e) => handleParagraphcontent(e.currentTarget.value,key)}
                    style={{ width: '100%' }}
                  />
                  <Tooltip title="Hapus Paragraph" placement="top">
                    <IconButton aria-label="delete" color="error" sx={{height:'100%'}} onClick={()=>removeParag(key)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
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
          </div>
          <Button variant="contained" sx={{float: 'right'}} onClick={() => handleParagraphCount()}>Add Paragraph</Button>
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="ShortDesc"
            name="ShortDesc"
            label="Short Description"
            fullWidth
            variant="standard"
            value={ShortDesc}
            onChange={(e) => {handleShortDescChange(e)}}
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