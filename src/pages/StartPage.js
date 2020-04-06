import React from 'react';
import { Link } from 'react-router-dom';
import { useSession } from '../services/User';
import { createGame } from '../services/MasterGame';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme, withStyles } from '@material-ui/core/styles';
import {blue} from '@material-ui/core/colors'
import {red} from '@material-ui/core/colors'

const Start = () => {
  const { user } = useSession();
  return (
    <div>
      <Link to="/create" onClick={() => createGame(user)}> Nouvelle partie
      </Link>
      <br />
      <Link to="/join">
        Rejoindre une partie
      </Link>
    </div>
  );
}

export default Start;