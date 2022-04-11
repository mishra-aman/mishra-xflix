import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import Logo from "./Logo.svg";

const Header = (props) => {
  return (
    <Box
      className="header"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      p={1}
      style={{ backgroundColor: "#202020" }}
    >
      <Box>
        <Link to="/">
          <img src={Logo} alt="XFlix-Logo" />
        </Link>
      </Box>
      {props.children}
    </Box>
  );
};

export default Header;