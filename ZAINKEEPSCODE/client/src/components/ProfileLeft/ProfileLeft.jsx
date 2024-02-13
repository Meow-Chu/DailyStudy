import React from "react";
import LogoSearch from "../LogoSearch/LogoSearch";
import FollowersCard from "../FollowersCard/FollowersCard";
import InfoCard from "../InfoCard/InfoCard";
import "../profileSide/ProfileSide.css";

function ProfileLeft() {
  return (
    <div className="ProfileSide">
      <LogoSearch />
      <InfoCard />
      <FollowersCard />
    </div>
  );
}

export default ProfileLeft;
