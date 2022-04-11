import { Card, CardContent, CardMedia, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import moment from "moment";

const VideoGrid = ({ videos }) => {
  return (
    <Grid container spacing={1}>
      {videos.length > 0 ? (
        videos.map((video) => (
          <Grid item xs={12} sm={6} md={3} key={video._id}>
            <Link
              className="video-tile-link"
              style={{ textDecoration: "none" }}
              to={`/video/${video._id}`}
            >
              <Card
              className="video-tile"
                sx={{ height: "100%" }}
                style={{ backgroundColor: "#181818", color: "#ffffff" }}
              >
                <CardMedia
                  component="img"
                  alt={video.title}
                  image={video.previewImage}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {video.title}
                  </Typography>
                  <Typography
                    className="release-date"
                    style={{ textDecorationLine: "none" }}
                    variant="body2"
                  >
                    {moment(video.releaseDate).fromNow()}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))
      ) : (
        <Box display="flex" justifyContent="center" alignItems="center">
          <Box>No videos found</Box>
        </Box>
      )}
    </Grid>
  );
};

export default VideoGrid;