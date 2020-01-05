import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import yellow from '@material-ui/core/colors/yellow';

let theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: yellow,
  },
});

theme = responsiveFontSizes(theme);

export default theme;
