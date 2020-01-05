import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
  footer: {
    background: `rebeccapurple`,
    bottom: 0,
  },
});

const Footer: React.FC<{}> = () => {
  const classes = useStyles();
  const theme = useTheme();
  return (
    <footer className={classes.footer}>
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        <p style={{ margin: 0 }}>
          © {new Date().getFullYear()}, Built with
          {` `}
          <a href="https://www.gatsbyjs.org">Gatsby</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
