export const Apps = connect(
  state => ({
    apps: Object.keys(state.apps).map(key => state.apps[key]),
    name: state.name,
    redirect: state.redirect,
    socket: state.socket
  }),
  dispatch => bindActionCreators({ createApp, updateName }, dispatch)
)(({ apps, createApp, name, redirect, socket, updateName }) => redirect !== ""
  ? <Redirect to={`/apps/${redirect}`} />
  : <div style={{ padding: "20px" }}>
    <TextField
      value={name}
      hintText={`Enter App Name ${socket}`}
      fullWidth={true}
      onKeyUp={event => {
        if (event.which === 13) {
          createApp(name);
          updateName("");
        } else if (event.which === 8) {
          updateName(name.slice(0, -1));
        } else {
          updateName(name + event.key);
        }
      }}
    />
    <div style={{ height: "70vh", overflow: "scroll" }}>
      {!!apps.length && apps.map(app => (
        <div key={app.id}>
          <Card>
            <CardHeader
              title={<Link to={`/apps/${app.id}`}>{app.name}</Link>}
              subtitle="Subtitle"
              avatar={avatar(app.files)} /> />
          </Card>
        </div>
      ))}
    </div>
    <RaisedButton
      label="Create App"
      primary={true}
      fullWidth={true}
      onClick={event => createApp(name)} />
  </div>
);

const avatar = files => `https://process.filestackapi.com/resize=width:140/${files[0].handle}`

import React from "react";
import { Link, Redirect } from "react-router-dom";
import { bindActionCreators } from "redux";
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import { connect } from "react-redux";
import { createApp, updateName } from "../data/actions";
import { createSelector } from "reselect";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";
import { Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle } from "material-ui/Toolbar";
import DropDownMenu from "material-ui/DropDownMenu";
import MenuItem from "material-ui/MenuItem";
import FontIcon from "material-ui/FontIcon";
import IconMenu from "material-ui/IconMenu";
import IconButton from "material-ui/IconButton";
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
