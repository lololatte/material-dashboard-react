import Dashboard from "layouts/dashboard";
import Jobs from "layouts/jobs";
import Bookings from "layouts/bookings";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Properties",
    key: "dashboard",
    icon: <Icon fontSize="small">house</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Jobs",
    key: "jobs",
    icon: <Icon fontSize="small">work</Icon>,
    route: "/jobs",
    component: <Jobs />,
  },
  {
    type: "collapse",
    name: "Bookings",
    key: "bookings",
    icon: <Icon fontSize="small">access_time</Icon>,
    route: "/bookings",
    component: <Bookings />,
  },
  //   {
  //     type: "collapse",
  //     name: "Sign In",
  //     key: "sign-in",
  //     icon: <Icon fontSize="small">login</Icon>,
  //     route: "/authentication/sign-in",
  //     component: <SignIn />,
  //   },
  //   {
  //     type: "collapse",
  //     name: "Sign Up",
  //     key: "sign-up",
  //     icon: <Icon fontSize="small">assignment</Icon>,
  //     route: "/authentication/sign-up",
  //     component: <SignUp />,
  //   },
];

export default routes;
