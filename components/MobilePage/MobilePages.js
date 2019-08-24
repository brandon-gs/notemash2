import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

// Icons
import AssignmentIcon from '@material-ui/icons/Assignment';

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
                </BottomNavigation>
            </div>
        </div>
    );
}