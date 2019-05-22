/* eslint-disable react/no-array-index-key */
/* eslint-disable react/no-unused-state */
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
    padding: 25,
    display: 'flex',
    flexDirection: 'row',
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
      requirements: {
        core: {
          courses: [
            { name: 'ENGS 22', took: false },
            { name: 'ENGS 27', took: false },
            { name: 'ENGS 31', took: false },
            { name: 'ENGS 23', took: false },
            { name: 'ENGS 24', took: false },
          ],
          group1: {
            courses: [
              { name: 'ENGS 22', took: false },
              { name: 'ENGS 27', took: false },
              { name: 'ENGS 31', took: false },
            ],
          },
          group2: {
            courses: [
              { name: 'ENGS 23', took: false },
              { name: 'ENGS 24', took: false },
            ],
          },
        },
        computerScience: {
          courses: [
            { name: 'COSC 50', took: false },
            { name: 'ENGS 50', took: false },
          ],
        },
        breadth: {
          courses: [
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
          group1: {
            courses: [
              { name: 'ENGS 32', took: false },
              { name: 'ENGS 62', took: false },
              { name: 'COSC 51', took: false },
            ],
          },
          group2: {
            courses: [
              { name: 'ENGS 26', took: false },
              { name: 'ENGS 68', took: false },
              { name: 'ENGS 92', took: false },
              { name: 'COSC 60', took: false },
            ],
          },
          group3: {
            courses: [
              { name: 'ENGS 91', took: false },
              { name: 'COSC 31', took: false },
              { name: 'COSC 58', took: false },
              { name: 'ENGS 77', took: false },
            ],
          },
        },
      },
    };
  }

  checker = () => {
    const failures = [];
    // Core
    // Group 1
    let passed = true;
    // this.state.courses.filter(req => (req.name === 'ENGS 22' || req.name === 'ENGS 27' || req.name === 'ENGS 31')).forEach((req) => {
    //   if (!req.took) passed = false;
    // });
    this.state.requirements.core.group1.courses.forEach((req) => {
      if (!req.took) passed = false;
    });
    if (!passed) {
      failures.push('Engineering Core Courses / Group 1');
    }

    // Group 2
    passed = false;
    // this.state.courses.filter(req => (req.name === 'ENGS 23' || req.name === 'ENGS 24')).forEach((req) => {
    //   if (req.took) passed = true;
    // });s
    this.state.requirements.core.group2.courses.forEach((req) => {
      if (req.took) passed = true;
    });
    if (!passed) {
      failures.push('Engineering Core Courses / Group 2');
    }

    // Computer Science
    passed = false;
    this.state.requirements.computerScience.courses.forEach((req) => {
      if (req.took) passed = true;
    });
    if (!passed) {
      failures.push('Computer Science Courses');
    }

    // Breadth
    // 5 courses
    if (this.state.requirements.breadth.courses.filter(req => ((req.took))).length < 5) failures.push('Breadth / Less than 5 courses');

    // Group 1
    passed = false;
    this.state.requirements.breadth.group1.courses.forEach((req) => {
      if (req.took) passed = true;
    });
    if (!passed) {
      failures.push('Breadth / Group 1');
    }

    // Group 2
    passed = false;
    this.state.requirements.breadth.group2.courses.forEach((req) => {
      if (req.took) passed = true;
    });
    if (!passed) {
      failures.push('Breadth / Group 2');
    }

    // Group 3
    passed = false;
    this.state.requirements.breadth.group3.courses.forEach((req) => {
      if (req.took) passed = true;
    });
    if (!passed) {
      failures.push('Breadth / Group 3');
    }
    // 3 computer science
    if (this.state.requirements.breadth.courses.filter(req => ((req.name.substring(0, 4) === 'COSC') && (req.took))).length < 3) failures.push('Breadth / Less than 3 computer science courses');
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
        <CardContent id="form">
          <Typography variant="title">Degree Checker for ENGS  modified CS</Typography>
          <List className={classes.root}>
            {this.state.courses.map((req, index) => (
              <ListItem key={index} dense button onClick={() => this.handleToggle(req.name)}>
                <Checkbox
                  checked={req.took}
                  tabIndex={-1}
                  disableRipple
                  className={styles.skinnyCheckBox}
                  color="primary"
                />
                <ListItemText primary={req.name} />
              </ListItem>
            ))}
          </List>
        </CardContent>
        <CardContent id="results">
          {result}
          {why}
          <Button variant="contained" color="primary" onClick={this.reset}>Reset</Button>
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
