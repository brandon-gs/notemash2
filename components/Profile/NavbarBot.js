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
import HelloUser from './HelloUser';
import NoteList from './NoteList';

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
                return <NoteList />
            case 'calificaciones':
                return <div>Calificaciones</div>
            case 'horario':
                return <div>Horario</div>
            case 'eventos':
                return <div>Eventos</div>
            case 'importantes':
                return <div>Importantes</div>
            default:
                break;
        }
    }

    return (
        <div className="card-profile-responsive">
            <HelloUser />
            {drawComponent(value)}
            <div className="fixed-bottom navbar-profile-bottom d-flex">
                <BottomNavigation value={value} onChange={handleChange} className={classes.root}>
                    <BottomNavigationAction label="Notas" value="notas" icon={<AssignmentIcon />} />
                    <BottomNavigationAction label="Calificaciones" value="calificaciones" icon={<TrendingUpIcon />} />
                    <BottomNavigationAction label="Horario" value="horario" icon={<TimerIcon />} />
                    <BottomNavigationAction label="Eventos" value="eventos" icon={<CalendarTodayIcon />} />
                </BottomNavigation>
            </div>
        </div>
    );
}