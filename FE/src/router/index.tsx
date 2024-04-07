import { BrowserRouter, Route, Routes } from "react-router-dom";
import LeaderBoard from "../pages/Leaderboard";
import Home from "../pages/Home";
import UserAcount from "../pages/UserAccount";
import Works from "../pages/Works";
import DetailWork from "../pages/DetailWork";
import SignUp from "../pages/SignUp";

export default function Router() {
  return (
    <BrowserRouter future={{ v7_startTransition: true }}>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/leader-board" Component={LeaderBoard} />
        <Route path="/sign-up" Component={SignUp} />
        <Route path="/user-acount/:id" Component={UserAcount} />
        <Route path="/works" Component={Works} />
        <Route path="/works/:id" Component={DetailWork} />
      </Routes>
    </BrowserRouter>
  );
}
