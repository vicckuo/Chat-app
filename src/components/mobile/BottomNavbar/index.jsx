import { useState } from "react";
import { Link } from "react-router-dom"
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import TextsmsIcon from '@mui/icons-material/Textsms';
import PersonIcon from '@mui/icons-material/Person';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';
import { isMobile, isAndroid } from 'react-device-detect'

const Index = () => {
    const [value, setValue] = useState(0);
    return (
        <div>
            {(isMobile || isAndroid) && (
                // MOBILE
                <Box
                    sx={{
                        width: "100%",
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        zIndex: 99,
                    }}>
                    <BottomNavigation
                        style={{ backgroundColor: "#101434", height: "9vh" }}
                        showLabels
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                    >
                        <BottomNavigationAction style={{ color: "#A1C5DB" }} label="首页" icon={<HomeIcon />} LinkComponent={Link} to={"/"} />
                        <BottomNavigationAction style={{ color: "#A1C5DB" }} label="客服" icon={<TextsmsIcon />} LinkComponent={Link} to={"/agent"} />
                        <BottomNavigationAction style={{ color: "#A1C5DB" }} label="担保平台" icon={<LocalPoliceIcon />} LinkComponent={Link} to={"/webplatform"} />
                        <BottomNavigationAction style={{ color: "#A1C5DB" }} label="我的" icon={<PersonIcon />} LinkComponent={Link} to={"/member"} />
                    </BottomNavigation>
                </Box>
            )}
        </div>
    );
}

export default Index;
