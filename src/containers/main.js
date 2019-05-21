/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable max-len */
import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

import { addCourse, removeCourse } from '../actions/index';

const styles = {
  card: {
    width: 800,
  },
  pos: {
    marginBottom: 12,
  },
  inputArea: {
    display: 'flex',
    flexDirection: 'column',
  },
  skinnyCheckBox: {
    padding: 0,
  },
};


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [
        { name: 'ENGS 22', took: false },
        { name: 'ENGS 27', took: false },
        { name: 'ENGS 31', took: false },
        { name: 'ENGS 23', took: false },
        { name: 'ENGS 24', took: false },
        { name: 'COSC 50', took: false },
        { name: 'ENGS 50', took: false },
        { name: 'ENGS 32', took: false },
        { name: 'ENGS 62', took: false },
        { name: 'COSC 51', took: false },
        { name: 'ENGS 26', took: false },
        { name: 'ENGS 68', took: false },
        { name: 'ENGS 92', took: false },
        { name: 'COSC 60', took: false },
        { name: 'ENGS 91', took: false },
        { name: 'COSC 31', took: false },
        { name: 'COSC 58', took: false },
        { name: 'ENGS 77', took: false },
      ],
    };
  }

  checker = () => {
    const failures = [];
    // Core
    // Group 1
    let passed = true;
    this.state.courses.filter(req => (req.name === 'ENGS 22' || req.name === 'ENGS 27' || req.name === 'ENGS 31')).forEach((req) => {
      if (!req.took) passed = false;
    });
    if (!passed) {
      failures.push('Engineering Core Courses / Group 1');
    }

    // Group 2
    passed = false;
    this.state.courses.filter(req => (req.name === 'ENGS 23' || req.name === 'ENGS 24')).forEach((req) => {
      if (req.took) passed = true;
    });
    if (!passed) {
      failures.push('Engineering Core Courses / Group 2');
    }

    // Computer Science
    passed = false;
    this.state.courses.filter(req => (req.name === 'COSC 50' || req.name === 'ENGS 50')).forEach((req) => {
      if (req.took) passed = true;
    });
    if (!passed) {
      failures.push('Computer Science Courses');
    }

    // Breadth
    // 5 courses
    if (this.state.courses.filter(req => (req.name === 'ENGS 32' || req.name === 'ENGS 62' || req.name === 'COSC 51' || req.name === 'ENGS 26' || req.name === 'ENGS 68' || req.name === 'ENGS 92' || req.name === 'COSC 60' || req.name === 'ENGS 91' || req.name === 'COSC 31' || req.name === 'COSC 58' || req.name === 'COSC 77')).length < 5) failures.push('Breadth / Less than 5 courses');

    // Group 1
    passed = false;
    this.state.courses.filter(req => (req.name === 'ENGS 32' || req.name === 'ENGS 62' || req.name === 'COSC 51')).forEach((req) => {
      if (req.took) passed = true;
    });
    if (!passed) {
      failures.push('Breadth / Group 1');
    }

    // Group 2
    passed = false;
    this.state.courses.filter(req => (req.name === 'ENGS 26' || req.name === 'ENGS 68' || req.name === 'ENGS 92' || req.name === 'COSC 60')).forEach((req) => {
      if (req.took) passed = true;
    });
    if (!passed) {
      failures.push('Breadth / Group 2');
    }

    // Group 3
    passed = false;
    this.state.courses.filter(req => (req.name === 'ENGS 91' || req.name === 'COSC 31' || req.name === 'COSC 58' || req.name === 'COSC 77')).forEach((req) => {
      if (req.took) passed = true;
    });
    if (!passed) {
      failures.push('Breadth / Group 3');
    }
    // 3 computer science
    if (this.state.courses.filter(req => (req.name.substring(0, 4) === 'COSC')).length < 3) failures.push('Breadth / Less than 3 computer science courses');

    return failures;
  }

  handleToggle = async (courseName) => {
    const coursesCopy = await Object.assign([], this.state.courses);
    await coursesCopy.forEach((req) => {
      if (req.name === courseName) {
        req.took = !req.took;
      }
    });
    this.setState({ courses: coursesCopy });
  }

  reset = async () => {
    const coursesCopy = await Object.assign([], this.state.courses);
    await coursesCopy.forEach((req) => {
      req.took = false;
    });
    this.setState({ courses: coursesCopy });
  }

  render() {
    const { classes } = this.props;
    const failures = this.checker();
    let result = <Typography variant="h5" className={styles.passed}>Passed</Typography>;
    let why = '';

    if (failures.length > 0) {
      result = <Typography variant="h5" color="error">Failed</Typography>;
      why = failures.map(failure => <Typography variant="body1" color="error">{failure}</Typography>);
    }
    return (
      <Card className={classes.card}>
        <CardContent>
          <Typography variant="title">Degree Checker for ENGS  modified CS</Typography>
          <List className={classes.root}>
            {this.state.courses.map(req => (
              <ListItem key={req.name} dense button onClick={() => this.handleToggle(req.name)}>
                <Checkbox
                  checked={req.took}
                  tabIndex={-1}
                  disableRipple
                  className={styles.skinnyCheckBox}
                />
                <ListItemText primary={req.name} />
              </ListItem>
            ))}
          </List>
          {result}
          {why}
          <Button variant="contained" onClick={this.reset}>Reset</Button>
        </CardContent>
      </Card>
    );
  }
}

const mapStateToProps = state => (
  {
    courses: state.courses,
  }
);

export default withRouter(connect(mapStateToProps, { addCourse, removeCourse })(withStyles(styles)(Main)));
