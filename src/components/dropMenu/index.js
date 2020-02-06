import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';



const useStyles = makeStyles(theme => ({
  root: {
    color: 'white',
    marginTop: 55,
    marginRight: 450,
    position: 'absolute',
    left: 100

  },
  paper: {
    marginRight: theme.spacing(2),
  },
  menuList: {
    color: '#3f51b5'
  }
}));

export default function DropMenu(props) {
  const classes = useStyles();
  const sities = ['London', 'Los Angeles', 'Washington', 'san Francisco', 'Fresno'];

  const handleButtonClick = e => {
    props.handleClose(e)
    props.handleChooseCity(e)
  }

return (
    <div className={classes.root}>
      <Button
        ref={props.anchorRef}
        aria-controls={props.open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={props.handleToggle}
        variant="contained"
        color="primary"
      >
        Choose the city
        </Button>
      <Popper open={props.open} anchorEl={props.anchorEl} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
          >
            <Paper >
              <ClickAwayListener onClickAway={props.handleClose}>
                <MenuList className={classes.menuList} autoFocusItem={props.autoFocusItem} id="menu-list-grow" onKeyDown={props.handleListKeyDown}>
                  <MenuItem onClick={e => handleButtonClick(sities[0])}>{sities[0]}</MenuItem>
                  <MenuItem onClick={e => handleButtonClick(sities[1])}>{sities[1]}</MenuItem>
                  <MenuItem onClick={e => handleButtonClick(sities[2])}>{sities[2]}</MenuItem>
                  <MenuItem onClick={e => handleButtonClick(sities[3])}>{sities[3]}</MenuItem>
                  <MenuItem onClick={e => handleButtonClick(sities[4])}>{sities[3]}</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </div>
  );

}
