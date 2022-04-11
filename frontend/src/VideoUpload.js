import CloseIcon from "@mui/icons-material/Close";
import { Box, Button, MenuItem, Stack } from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import React from "react";
import DatePicker from "@mui/lab/DatePicker";
import './VideoUpload.css'

const VideoUpload = (props) => {
  const {
    isOpen,
    handleClose,
    postData,
    handleChange,
    handleSubmit,
    handleCancel,
  } = props;

  const allGenres = ["Education", "Sports", "Lifestyle", "Comedy"];

  const ageArray = ["7+", "12+", "16+", "18+"];

  return (
    <div>
      <Dialog open={isOpen} onClose={handleClose} sx={{ color: "#383838" }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <DialogTitle sx={{ fontWeight: "400" }}>Upload Video</DialogTitle>
          <Box paddingRight="24px" color="#FFF">
            <span onClick={() => handleClose()} style={{ cursor: "pointer" }}>
              <CloseIcon />
            </span>
          </Box>
        </Stack>
        <DialogContent>
          <Stack spacing={2} paddingBottom={2} direction="column">
            <TextField
              className="form-element"
              id="outlined-helpertext"
              label="Video Link"
              name="videoLink"
              value={postData.videoLink}
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              helperText="This link will be used to derive the video"
              fullWidth
            />
            <TextField
              className="form-element"
              id="outlined-helpertext"
              label="Thumbnail Image Link"
              name="previewImage"
              value={postData.previewImage}
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              helperText="This link will be used to preview the thumbnail image"
              fullWidth
            />
            <TextField
              className="form-element"
              id="outlined-helpertext"
              label="Title"
              name="title"
              value={postData.title}
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              helperText="This link will be used to derive the video"
              fullWidth
            />
            <TextField
              className="form-element"
              id="outlined-select"
              select
              label="Genre"
              name="genre"
              value={postData.genre}
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              helperText="Genre will help in categorizing your videos"
              fullWidth
            >
              {allGenres.map((genre) => (
                <MenuItem key={genre} value={genre}>
                  {genre}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              className="form-element"
              id="outlined-helpertext"
              select
              label="Suitable age group for the clip"
              name="contentRating"
              value={postData.contentRating}
              onChange={(e) => {
                handleChange(e.target.name, e.target.value);
              }}
              helperText="This will be used to filter videos on age group suitablity"
              fullWidth
            >
              {ageArray.map((age) => (
                <MenuItem key={age} value={age}>
                  {age}
                </MenuItem>
              ))}
            </TextField>
            <DatePicker
              label="Release Date"
              helperText="This will be used to sort videos"
              value={postData.releaseDate}
              onChange={(newValue) => {
                handleChange("releaseDate", newValue);
              }}
              renderInput={(params) => (
                <TextField {...params} className="form-element" />
              )}
            />
          </Stack>
        </DialogContent>
        <Stack
          direction="row"
          justifyContent="flex-start"
          paddingBottom={2}
          px={3}
        >
          <Button
            variant="contained"
            onClick={() => handleSubmit()}
            style={{ color: "#FFF"}}
            sx={{
              backgroundColor: "#EE1520",
              fontSize: "13px",
              ":hover": { backgroundColor: "#EE1520" },
            }}
          >
            UPLOAD VIDEO
          </Button>
          <Box onClick={handleCancel} className="cancel">
            CANCEL
          </Box>
        </Stack>
      </Dialog>
    </div>
  );
};

export default VideoUpload;