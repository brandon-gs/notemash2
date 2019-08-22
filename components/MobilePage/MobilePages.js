import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import Icon from '@material-ui/core/Icon';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

// Icons
import AssignmentIcon from '@material-ui/icons/Assignment';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import TimerIcon from '@material-ui/icons/Timer';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import AssignmentLateIcon from '@material-ui/icons/AssignmentLate';

// Custom components
import NotePage from '../Notes/NotesMobile/NotePage';

const useStyles = makeStyles({
    root: {
        width: 991,
    },
});

export default function LabelBottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState('notas');

    function handleChange(event, newValue) {
        setValue(newValue);
    }

    function drawComponent(value) {
        switch (value) {
            case 'notas':
                return <NotePage />
            case 'logut':
                return <div>Saliendo...</div>            
            default:
                break;
        }
    }

    return (
        <div className="card-profile-responsive">
            {drawComponent(value)}
            <div className="fixed-bottom navbar-profile-bottom d-flex">
                <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
                    <BottomNavigationAction label="Notas" value="notas" icon={<AssignmentIcon />} />
                    <BottomNavigationAction label="Cerrar sesión" value="logout" icon={<TrendingUpIcon />} />
                </BottomNavigation>
            </div>
        </div>
    );
}