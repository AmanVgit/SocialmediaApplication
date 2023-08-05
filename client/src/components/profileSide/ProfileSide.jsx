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
      <LogoSearch />

      <button className="toggleProfileBtn" onClick={handleToggleProfile}>
        {showProfile ? (
          <span>
            <span className="arrow-up" />
          </span>
        ) : (
          <span>
            <span className="arrow-down" />
          </span>
        )}
      </button>

      {showProfile && (
        <div className="profile-container-mobile">
          <ProfileCard location="homepage" />
          <FollowersCard />
        </div>
      )}
    </div>
  );
};

export default ProfileSide;
