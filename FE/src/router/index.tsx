import { Route, Routes } from "react-router-dom";
import LeaderBoard from "../pages/Leaderboard";
import Home from "../pages/Home";
import UserAcount from "../pages/UserAccount";
import Works from "../pages/Works";
import DetailWork from "../pages/DetailWork";
import SignUp from "../pages/SignUp";
import CreateOrganization from "../pages/CreateDAO";
import DetailDao from "../pages/DetailDao";

export default function Router() {
  return (
    <Routes>
      <Route path="/" Component={Home} />
      <Route path="/create-dao" Component={CreateOrganization} />
      <Route path="/leader-board" Component={LeaderBoard} />
      <Route path="/sign-up" Component={SignUp} />
      <Route path="/user-acount/:id" Component={UserAcount} />
      <Route path="/works" Component={Works} />
      <Route path="/work/:id" Component={DetailWork} />
      <Route path="/dao/:id" Component={DetailDao} />
    </Routes>
  );
}
