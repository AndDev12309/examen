import { useAuth } from "@/context/Auth";
import { Adb, MenuBook } from "@mui/icons-material";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface Fields {
  username: string;
  email: string;
  password: string;
}

type Navbar = {
  label: string;
  path: string;
};

const pagesUser: Navbar[] = [
  { label: "Inicio", path: "/" },
  { label: "Mis Citas", path: "/appointments" },
];

const pagesAdmin: Navbar[] = [
  { label: "Inicio", path: "/" },
  { label: "Especialidades", path: "/specialties" },
];

const settings = ["Perfil", "Logout"];

const Navbar = () => {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [navKey, setNavKey] = useState("loggetOut");

  useEffect(() => {
    if (isAuthenticated) setNavKey("loggetIn");
  }, [isAuthenticated]);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting: string) => {
    if (setting === "Logout") {
      logout();
    } else if (setting === "Perfil") {
      router.push("/profile");
    }
    setAnchorElUser(null);
  };

  return (
    <Stack spacing={3} key={navKey}>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Adb sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              component={"a"}
              href="/"
              variant="h6"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
                <MenuBook />
              </IconButton>
            </Box>
            <Adb sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              component={"a"}
              href="/"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            {user && user.role.name === "admin" ? (
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pagesAdmin.map((page: Navbar, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      router.push(page.path);
                    }}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.label}
                  </Button>
                ))}
              </Box>
            ) : (
              <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                {pagesUser.map((page: Navbar, index) => (
                  <Button
                    key={index}
                    onClick={() => {
                      router.push(page.path);
                    }}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page.label}
                  </Button>
                ))}
              </Box>
            )}
            <Box sx={{ flexGrow: 0 }}>
              {user ? (
                <>
                  <Tooltip title="Ajustes de Perfil">
                    <Box display="flex" flexDirection="row" alignItems="center">
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/2.jpg"
                        />
                        <Typography>{user.username}</Typography>
                      </IconButton>
                    </Box>
                  </Tooltip>
                  <Menu
                    sx={{ mt: "45px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                  >
                    {settings.map((setting) => (
                      <MenuItem
                        key={setting}
                        onClick={() => handleCloseUserMenu(setting)}
                      >
                        <Typography sx={{ textAlign: "center" }}>
                          {setting}
                        </Typography>
                      </MenuItem>
                    ))}
                  </Menu>
                </>
              ) : (
                <Button
                  LinkComponent={"link"}
                  onClick={() => router.push("/")}
                  variant="outlined"
                  color="secondary"
                >
                  Login
                </Button>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Stack>
  );
};

export default Navbar;
