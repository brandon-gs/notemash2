import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

// Iconos
import HomeIcon from '@material-ui/icons/Home';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import Person from '@material-ui/icons/Person';

// Custom Cards
import InfoProfile from './InfoProfile';
import NoteList from './NoteList';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    maxWidth: 991,
    minWidth: 336,
  },
});

export default function IconTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
    <>
      <div className="card-profile-responsive">
        <TabPanel value={value} index={0}>
          Item One
      </TabPanel>
        <TabPanel value={value} index={1}>
          <NoteList />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
      </TabPanel>
        <TabPanel value={value} index={3}>
          Item Four
      </TabPanel>
        <TabPanel value={value} index={4}>
          <InfoProfile />
        </TabPanel>
      </div>
      <div className="fixed-bottom navbar-profile">
        <Paper square className={classes.root}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="primary"
            textColor="primary"
            aria-label="icon tabs example"
          >
            <Tab icon={<HomeIcon />} aria-label="home" label="Inicio" />
            <Tab icon={<AssignmentIcon />} aria-label="notas" label="Notas" />
            <Tab icon={<PersonPinIcon />} aria-label="eventos" label="Eventos" />
            <Tab icon={<HomeIcon />} aria-label="home" label="Buscar" />
            <Tab icon={<Person />} aria-label="perfil" label="Perfil" />
            <Tab icon={<HomeIcon />} aria-label="perfil" label="Perfil" />
          </Tabs>
        </Paper>
      </div>
    </>
  );
}