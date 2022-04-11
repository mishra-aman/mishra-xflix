import React, { useState, useEffect } from "react";
import { Search } from "@mui/icons-material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {
  Button,
  CircularProgress,
  Grid,
  InputAdornment,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import Header from "./Header";
import { config } from "./App";
import "./Home.css";
import VideoGrid from "./VideoGrid";
import VideoUpload from "./VideoUpload";

const Home = () => {
  const initialState = {
    videoLink: "",
    title: "",
    genre: "",
    contentRating: "",
    releaseDate: null,
    previewImage: "",
  };

  const allGenres = [
    { label: "All", value: "All" },
    { label: "Education", value: "Education" },
    { label: "Sports", value: "Sports" },
    { label: "Comedy", value: "Comedy" },
    { label: "Lifestyle", value: "Lifestyle" },
  ];

  const ageGroup = [
    { label: "Any Age Group", value: "All" },
    { label: "7+", value: "7%2B" },
    { label: "12+", value: "12%2B" },
    { label: "16+", value: "16%2B" },
    { label: "18+", value: "18%2B" },
  ];

  const { enqueueSnackbar } = useSnackbar();
  const [videos, setvideos] = useState([]);
  const [genres, setGenres] = useState(["All"]);
  const [sort, setSort] = useState("releaseDate");
  const [age, setAge] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [timerId, setTimer] = useState(0);
  const [open, setOpen] = useState(false);
  const [postData, setData] = useState(initialState);

  const performAPICall = async (URL) => {
    setLoading(true);
    try {
      const response = await axios.get(URL);
      setvideos(response.data.videos);
      setLoading(false);
    } catch (e) {
      if (e.response && e.response.data.message) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Something Went Wrong!", { variant: "error" });
      }
      setLoading(false);
    }
  };

  const performSearch = async (value, genre, age) => {
    let URL = `${config.endpoint}?`;
    if (value.length) {
      URL += `title=${value}`;
    }
    if (genre.length) {
      const param = genre.join(",");
      URL[URL.length - 1] === "?"
        ? (URL += `genres=${param}`)
        : (URL += `&genres=${param}`);
    }
    if (age.length) {
      URL[URL.length - 1] === "?"
        ? (URL += `contentRating=${age}`)
        : (URL += `&contentRating=${age}`);
    }
    performAPICall(URL);
  };

  const debounceSearch = (value) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    const timeout = setTimeout(async () => {
      performSearch(value, genres, age);
    }, 500);

    setTimer(timeout);
  };

  useEffect(() => {
    let URL = config.endpoint;
    performAPICall(URL);
  }, []);

  useEffect(() => {
    performSearch("", genres, age);
  }, [genres, age]);

  const changeGenre = (e) => {
    const genreArr = [...genres];
    const index = genres.indexOf(e.target.id);
    if (index === -1) {
      if (genreArr.includes("All")) {
        genreArr.splice(genreArr.indexOf("All"), 1);
        setGenres([...genreArr, e.target.id]);
      } else {
        setGenres([...genreArr, e.target.id]);
      }
    } else {
      genreArr.splice(index, 1);
      setGenres(genreArr);
    }
  };

  const changeAge = (e) => {
    if (e.target.id !== "All") {
      setAge(e.target.id);
    } else {
      setAge("All");
    }
  };

  const handleSort = (e) => {
    setSort(e.target.value);
    const URL = `${config.endpoint}?sortBy=${e.target.value}`;
    performAPICall(URL);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const handleSubmit = async () => {
    try {
      const options = { day: "numeric", month: "short", year: "numeric" };
      const date = {
        ...postData,
        releaseDate: new Date(postData.releaseDate).toLocaleDateString(
          "en-IN",
          options
        ),
      };
      console.log(postData);
      const req = await axios.post(config.endpoint, postData);
      if (req.status === 201) {
        enqueueSnackbar("Video Uploaded", { variant: "success" });
        await axios.post(config.endpoint, date);
        setData(initialState);
        setOpen(!open);
      }
    } catch (e) {
      if (e && e.response && e.response.data) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
      } else {
        enqueueSnackbar("Something went Wrong!", { variant: "error" });
      }
    }
  };

  const handleCancel = () => {
    setData(initialState);
    handleClick();
  };

  const setPostData = (name, value) => {
    setData({
      ...postData,
      [name]: value,
    });
  };
  
  return (
    <div>
      {open && (
        <VideoUpload
          isOpen={open}
          postData={postData}
          handleSubmit={handleSubmit}
          handleChange={setPostData}
          handleClose={() => handleClick()}
          handleCancel={handleCancel}
        />
      )}
      <Box>
        <Header upload={true}>
          <Box className="search-desktop ">
            <TextField
              className="form-element"
              sx={{ color: "#606060", borderRadius: "0.25rem" }}
              size="small"
              placeholder="Search"
              variant="outlined"
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={{ color: "#fff" }}>
                    <Search />
                  </InputAdornment>
                ),
              }}
              onChange={(e) => {
                debounceSearch(e.target.value);
              }}
            />
          </Box>
          <Button
            variant="contained"
            startIcon={<FileUploadIcon />}
            color="secondary"
            style={{
              color: "#ffffff",
              padding: "4px 20px",
            }}
            onClick={() => {
              handleClick();
            }}
          >
            Upload
          </Button>
        </Header>
        <Box className="search-mobile">
          <TextField
            className="form-element"
            sx={{ color: "#9f9f9f", borderRadius: "2rem" }}
            size="small"
            placeholder="Search"
            variant="outlined"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end" sx={{ color: "#9f9f9f" }}>
                  <Search color="#606060" />
                </InputAdornment>
              ),
            }}
            onChange={(e) => {
              debounceSearch(e.target.value);
            }}
          />
        </Box>
        <Grid
          container
          spacing={1}
          direction="column"
          justifyContent="center"
          alignItems="center"
          style={{ backgroundColor: "#202020" }}
        >
          <Grid item xs={12} m={1}>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {allGenres.map((genre) => (
                <Box
                  className={
                    genres.includes(genre.value)
                      ? "genre-btn active"
                      : "genre-btn"
                  }
                  component="span"
                  key={genre.value}
                  id={genre.value}
                  onClick={(e) => changeGenre(e)}
                >
                  {genre.value}
                </Box>
              ))}
              <Box className="sort">
                <Select id="sort" value={sort} onChange={handleSort}>
                  <MenuItem
                    id="release-date-option"
                   
                    value="releaseDate"
                    selected
                  >
                    Release Date
                  </MenuItem>
                  <MenuItem id="view-count-option" value="viewCount">
                    View Count
                  </MenuItem>
                </Select>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} m={1}>
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {ageGroup.map((item) => (
                <Box
                  className={
                    age.includes(item.value)
                      ? "content-rating-btn active"
                      : "content-rating-btn"
                  }
                  key={item.value}
                  id={item.value}
                  component="span"
                  onClick={(e) => changeAge(e)}
                >
                  {item.label}
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
        <Box className="dashboard" p={2}>
          {isLoading ? (
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              sx={{ height: "75vh" }}
            >
              <Box>
                <CircularProgress />
              </Box>
            </Box>
          ) : (
            <VideoGrid videos={videos} />
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Home;