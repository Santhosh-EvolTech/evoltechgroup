import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Profile from "./scenes/profile";
import Team from "./scenes/team";
import AllBlogs from "./scenes/blog";
import Careers from "./scenes/career";
import AllPositions from "./pages/careers";
import JobPost from "./pages/careers/apply";
import Login from "./auth/login";
import Signup from "./auth/signup";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import VerifyEmail from "./auth/verifyEmail";
import { getEmailVerified, isUserValid } from "./lib/pocketbase";
import Home from "./pages/Home";
import Loader from "./components/Loader";
import Blogs from "./pages/blogs";
import BlogPost from "./pages/blogs/post";
import ContactSubmissions from "./scenes/contact-submissions";
import CareerSubmissions from "./scenes/career-submissions";
import { ParamsContext } from "./context/ParamsContext";
// import AboutUs from "./pages/AboutUs";
function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const [details, setDetails] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const { params } = useContext(ParamsContext);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  }, []);

  useEffect(() => {
    isUserValid &&
      getEmailVerified().then((res) => {
        setDetails(res);
      });
  }, []);
  // TODO: build a logic for routes
  useEffect(() => {
    if (
      isUserValid &&
      details?.verified &&
      (location.pathname === "/verifyEmail" || location.pathname === "/") &&
      location.pathname !== "/team" &&
      location.pathname !== "/blog" &&
      location.pathname !== "/career" &&
      location.pathname !== "/career-submissions" &&
      location.pathname !== "/contact-submissions"
    ) {
      navigate("/profile");
    } else if (
      location.pathname?.includes(
        "/" || "/login" || "/signup" || "verifyEmail" || "profile"
      ) &&
      isUserValid &&
      !details?.verified
    ) {
      navigate("/verifyEmail");
    } else if (
      !isUserValid &&
      location.pathname !== "/signup" &&
      location.pathname !== "/" &&
      location.pathname !== "/blogs" &&
      location.pathname !== "/blogs/post" &&
      location.pathname !== "/careers" &&
      location.pathname !== "/careers/apply"
    ) {
      navigate("/login");
    }
  }, [location.pathname, navigate, details?.verified]);
  useEffect(() => {
    if (
      (location.pathname === "/blogs/post" ||
        location.pathname === "/blogs/post/") &&
      Object.keys(params).length === 0
    ) {
      navigate("/blogs");
    }
    if (
      (location.pathname === "/careers/apply" ||
        location.pathname === "/careers/apply/") &&
      Object.keys(params).length === 0
    ) {
      navigate("/careers");
    }
  }, [location.pathname, navigate, params]);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />{" "}
        {isLoading ? (
          <Loader />
        ) : (
          <div className="app">
            {!(
              location.pathname === "/" ||
              location.pathname === "/blogs" ||
              location.pathname?.includes("/post") ||
              location.pathname === "/careers" ||
              location.pathname?.includes("/apply")
            ) ? (
              isUserValid ? (
                <>
                  {details?.verified && <Sidebar isSidebar={isSidebar} />}
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} isSidebar={isSidebar} />
                    <Routes>
                      {!details?.verified && (
                        <Route path="/verifyEmail" element={<VerifyEmail />} />
                      )}
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/team" element={<Team />} />
                      <Route path="/blog" element={<AllBlogs />} />
                      <Route path="/career" element={<Careers />} />
                      <Route
                        path="/career-submissions"
                        element={<CareerSubmissions />}
                      />
                      <Route
                        path="/contact-submissions"
                        element={<ContactSubmissions />}
                      />
                    </Routes>
                  </main>
                </>
              ) : (
                <>
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} isSidebar={isSidebar} />
                    <Routes>
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<Signup />} />
                    </Routes>
                  </main>
                </>
              )
            ) : (
              <main className="content">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/blogs/post" element={<BlogPost />} />
                  <Route path="/careers" element={<AllPositions />} />
                  <Route path="/careers/apply" element={<JobPost />} />
                  {/* <Route path="/AboutUs" element={<AboutUs />} /> */}
                </Routes>
              </main>
            )}
          </div>
        )}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
