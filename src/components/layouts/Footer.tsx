import {
  Box,
  Container,
  Divider,
  Link,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { ROUTES } from "@utils/constants";
import { Fragment } from "react";

export default function Footer() {
  const isMobile = useMediaQuery(useTheme().breakpoints.down("md"));

  const FOOTER_LINKS = [{ text: "© Qrious Tech", route: ROUTES.HOME }];

  return (
    <Box sx={{ width: "100%", mt: "4rem", pb: "1rem" }}>
      <Container maxWidth="lg" component="footer">
        <Divider sx={{ mb: "1rem" }} />

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{ display: "flex", flexDirection: isMobile ? "column" : "row" }}
          >
            {FOOTER_LINKS.map(({ text, route }, idx) => (
              <Fragment key={idx}>
                <Link
                  href={route}
                  sx={{ textDecoration: "none", color: "#32323280" }}
                >
                  <Typography>{text}</Typography>
                </Link>
                {idx !== FOOTER_LINKS.length - 1 && !isMobile && (
                  <Typography mx="0.5rem" color="secondary.dark">
                    {" • "}
                  </Typography>
                )}
              </Fragment>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
