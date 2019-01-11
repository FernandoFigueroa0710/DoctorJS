import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";

const styles = {
  row: {
    display: "flex",
    justifyContent: "center"
  },
  avatar: {
    margin: 20
  },
  bigAvatar: {
    width: 60,
    height: 80
  }
};

function UserAvatar(props) {
  const { classes } = props;
  return (
    <div className={classes.row}>
      <Avatar
        alt="Fernando Figueroa"
        src="https://i.imgur.com/15515vu.png" //your picture goes here.
        className={classNames(classes.avatar, classes.bigAvatar)}
      />
    </div>
  );
}

UserAvatar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(UserAvatar);
