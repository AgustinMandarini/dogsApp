import React from "react";
import style from "./ProfileDetails.module.css";

const ProfileDetails = ({ title, code = "" }) => (
  <div className={style.profile_details}>
    <span className={style.profile_details__title}>{title}</span>
    <div className={style.profile_details__container}>
      <div className={style.profile_details__wrapper}>
        <pre className={style.profile_details__body}>{code}</pre>
      </div>
    </div>
  </div>
);

export default ProfileDetails;
