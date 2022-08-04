import { ReactComponent as Logo } from "@assets/icons/qrious.svg";
import { AppBar, Container } from "@mui/material";
import { ROUTES } from "@utils/constants";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <AppBar color="primary" position="absolute" elevation={0}>
      <Container
        maxWidth={"lg"}
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          height: "4rem",
        }}
      >
        <Link to={ROUTES.HOME} style={{ paddingTop: 10}}>
          <Logo width="200" height="50"/>
        </Link>
      </Container>
    </AppBar>
  );
}
