import React from 'react';
import classes from "../NtfSettingsBtn/NtfSettingsBtn.module.css";
import settingsPicture from "../../../resources/images/settingsIcon.svg";

export const NtfSettingsBtn = () => {
    return (
        <div>
            <button className={classes.NtfSettingsBtn}>
                <img style={{maxWidth: '20px', maxHeight: '20px', minWidth: '20px',minHeight: '20px', borderRadius: '50%'}}
                     src={settingsPicture}
                     alt=""
                />{/*temporary fixed image*/}
            </button>
        </div>
    );
};
