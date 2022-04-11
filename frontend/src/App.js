import "./App.css";
import Home from "./Home";
import { Route, Switch } from "react-router";
import VideoPage from "./VideoPage";
import DateAdapter from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";

export const config = {
  endpoint:
    "https://726feec8-9478-4888-aabf-9bd147df2b75.mock.pstmn.io/v1/videos",
};

const App = () => {
  return (
    <div className="App">
      <Switch>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <Route exact path="/" component={Home} />
          <Route exact path="/video/:id" component={VideoPage} />
        </LocalizationProvider>
      </Switch>
    </div>
  );
};

export default App;