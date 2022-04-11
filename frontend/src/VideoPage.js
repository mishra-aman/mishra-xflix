import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Button, Grid, Stack, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import { config } from "./App";
import Header from "./Header";
import VideoGrid from "./VideoGrid";
import moment from "moment";
import { useHistory } from "react-router-dom";
import "./VideoPage.css";

const VideoPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const { enqueueSnackbar } = useSnackbar();
  const [video, setVideo] = useState({});
  const [videos, setVideos] = useState([]);
  const [votesChange, setVotesChange] = useState({
    upVote: false,
    downVote: false,
  });
  const history = useHistory();

  const performAPICall = async (URL) => {
    try {
      let response = await axios.get(URL);
      return response.data;
    } catch (e) {
      if (e.response && e.response.data.message) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Something Went Wrong!", { variant: "error" });
      }
    }
  };

  const perfromPatchCall = async (URL, data = {}) => {
    try {
      if (data) {
        await axios.patch(URL, data);
      } else {
        await axios.patch(URL);
      }
      return true;
    } catch (e) {
      if(e.response && e.response.data.message){
        enqueueSnackbar(e.response.data.message, {variant:"error"});
      }
      else{
        enqueueSnackbar("Something Went Wrong!", {variant:"error"});
      }
    }
  };

  const getVideoDetails = async () => {
    const URL = `${config.endpoint}/${id}`;
    const path = location.pathname;
    if (path === "/video/60331f421f1d093ab5424489") {
      const response = await performAPICall(URL);
      setVideo(response);
    } else {
      history.push("/");
      enqueueSnackbar("No video found with matching id", { variant: "error" });
    }
  };

  const getVideos = async () => {
    const URL = `${config.endpoint}`;
    const response = await performAPICall(URL);
    setVideos(response.videos);
  };

  const increaseViewCount = async (id) => {
    const URL = `${config.endpoint}/${id}/views`;
    perfromPatchCall(URL);
  }

  const updateVote = async (name, id) => {
    const URL = `${config.endpoint}/${id}/votes`;
    const data = {
      vote: name,
      change: "increase"
    }
    console.log(data);
    let response = await perfromPatchCall(URL, data);
    if(response){
      setVotesChange({...votesChange, [name]: true});
    }
  }

  useEffect(() => {
    getVideoDetails();
    getVideos();
  }, []);

  useEffect(() => {
    if(video._id){
      increaseViewCount(video._id);
    }
  }, [video]);

  return (
    <Box className="videopage">
      <Header />
      <Grid container justifyContent="center">
        <Grid item xs={11} sm={10} md={8} ls={6}>
          {video._id && (
            <Box
              display="flex"
              flexDirection="column"
              justifyContent="center"
              my={1}
            >
              <Box className="video">
                <iframe
                  className="video-player"
                  src={`https://${video.videoLink}`}
                ></iframe>
              </Box>
              <Box
                className="videoDetails"
                display="flex"
                justifyContent="space-between"
                m={1}
                sx={{ flexWrap: "wrap" }}
              >
                <Box>
                  <Typography
                    sx={{ color: "#FFFFFF" }}
                    gutterBottom
                    variant="h5"
                  >
                    {video.title}
                  </Typography>
                  <Box display="flex">
                    <Typography
                      gutterBottom
                      variant="body2"
                      sx={{ color: "#C2C2C2" }}
                      mr={1}
                    >
                      {video.viewCount} views
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      sx={{ color: "#C2C2C2" }}
                      mr={1}
                    >
                      {video.contentRating}
                    </Typography>
                    <Typography
                      gutterBottom
                      variant="body2"
                      sx={{ color: "#C2C2C2" }}
                      mr={1}
                    >
                      {moment(video.releaseDate).fromNow()}
                    </Typography>
                  </Box>
                </Box>
                <Stack
                  className="likes"
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
                  my={1}
                >
                  <Button
                    variant="contained"
                    color={votesChange.upVote ? "secondary" : "tertiary"}
                    startIcon={<ThumbUpIcon />}
                    name="upVote"
                    onClick={(e) => {updateVote(e.target.name,video._id)}}
                  >
                    {video.votes ? video["votes"]["upVotes"] : null}
                  </Button>
                  <Button
                    variant="contained"
                    color={votesChange.downVote ? "secondary" : "tertiary"}
                    startIcon={<ThumbDownIcon />}
                    name="downVote"
                    onClick={(e) => {updateVote(e.target.name,video._id)}}
                  >
                    {video.votes ? video["votes"]["downVotes"] : null}
                  </Button>
                </Stack>
              </Box>
            </Box>
          )}
          {videos.length > 0 && <VideoGrid videos={videos} />}
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoPage;