import React, { useState } from 'react';
import FollowersCard from '../FollowersCard/FollowersCard';
import LogoSearch from '../LogoSearch/LogoSearch';
import ProfileCard from '../ProfileCard/ProfileCard';

import './ProfileSide.css';

const ProfileSide = () => {
  const [showProfile, setShowProfile] = useState(false);

  const handleToggleProfile = () => {
    setShowProfile((prevShowProfile) => !prevShowProfile);
  };

  return (
    <div className="ProfileSide">

      {/* <div className="ProfileSide"> */}

      <LogoSearch />

      <button className="toggleProfileBtn" onClick={handleToggleProfile}>
        Your Profile
      </button>


      {showProfile && (
        <div className="profile-container-mobile">
          <ProfileCard location='homepage' />
          <FollowersCard />
        </div>
      )}

      {/* </div>  */}

    </div>
  )
}

export default ProfileSide