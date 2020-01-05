import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Typography from '@material-ui/core/Typography';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';
import GitHubIcon from '@material-ui/icons/GitHub';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import { LinkButton } from './buttons';

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  buttonGroup: {
    textAlign: 'left',
    width: '100%',
  },
  button: {
    textTransform: 'none',
    width: '100%',
    display: 'flex',
    justifyContent: 'start',
    paddingLeft: '1.2rem',
  },
});

export default function Profile() {
  const classes = useStyles();
  const data = useStaticQuery(graphql`
    query {
      propic: file(relativePath: { eq: "propic.jpg" }) {
        childImageSharp {
          # Specify a fixed image and fragment.
          # The default width is 400 pixels
          fluid(maxWidth: 300) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `);

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <Img
          //className={classes.media}
          fluid={data.propic.childImageSharp.fluid}
          alt="My Face"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Senior undergraduate at Cornell University
          </Typography>
        </CardContent>
      </CardActionArea>
      <ButtonGroup
        className={classes.buttonGroup}
        orientation="vertical"
        variant="text"
        color="primary"
      >
        <Button
          className={classes.button}
          startIcon={<MailOutlineIcon />}
          href="mailto: kwf37@cornell.edu"
          size="small"
          color="primary"
        >
          kwf37@cornell.edu
        </Button>
        <Button
          className={classes.button}
          startIcon={<GitHubIcon />}
          href="https://github.com/kwf37"
          target="_blank"
          rel="noreferrer"
          size="small"
          color="primary"
        >
          kwf37
        </Button>
        <Button
          className={classes.button}
          startIcon={<LinkedInIcon />}
          href="https://www.linkedin.com/in/kenneth-fang-4958ba134/"
          target="_blank"
          rel="noreferrer"
          size="small"
          color="primary"
        >
          kenneth-fang
        </Button>
      </ButtonGroup>
    </Card>
  );
}
