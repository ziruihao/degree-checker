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
import Link from '@material-ui/core/Link';

import { addCourse, removeCourse } from '../actions/index';

const styles = {
  card: {
    width: 900,
    padding: 25,
    marginTop: 25,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inputArea: {
    display: 'flex',
    flexDirection: 'column',
  },
  skinnyCheckBox: {
    padding: 0,
  },
  mb: {
    marginBottom: 25,
  },
  mt: {
    marginTop: 25,
  },
  hover: {
    boxShadow: '6px 20px 40px -6px rgba(0,0,0,0.42)',
  },
  passed: {
    color: 'green',
  },
  reason: {
    marginBottom: 5,
  },
};


class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses: [
        { name: 'MATH 3', took: false },
        { name: 'MATH 8', took: false },
        { name: 'MATH 13', took: false },
        { name: 'COSC 1 or ENGS 20', took: false },
        { name: 'COSC 10', took: false },
        { name: 'PHYS 13', took: false },
        { name: 'PHYS 14', took: false },
        { name: 'CHEM 5', took: false },

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
        { name: 'COSC 77', took: false },

        { name: 'Project or Thesis', took: false },
        { name: 'ENGS 86', took: false },
        { name: 'ENGS 88', took: false },
        { name: 'ENGS 89/90', took: false },


      ],
    };
    this.courseNames = this.state.courses.map(course => course.name);
    this.requirements = {
      pre: {
        courses: this.courseNames.slice(0, 8),
      },
      core: {
        courses: this.courseNames.slice(8, 13),
        groupA: {
          courses: this.courseNames.slice(8, 11),
        },
        groupB: {
          courses: this.courseNames.slice(11, 13),
        },
        computerScience: {
          courses: this.courseNames.slice(13, 15),
        },
      },
      breadth: {
        courses: this.courseNames.slice(15, 26),
        groupA: {
          courses: this.courseNames.slice(15, 18),
        },
        groupB: {
          courses: this.courseNames.slice(18, 22),
        },
        groupC: {
          courses: this.courseNames.slice(22, 26),
        },
      },
      culm: {
        courses: this.courseNames.slice(26, this.courseNames.length + 1),
      },
    };
  }

  checker = () => {
    const failures = [];
    // Prerequisites
    let passed = true;
    this.state.courses.filter(req => (this.requirements.pre.courses.includes(req.name))).forEach((req) => {
      if (!req.took) passed = false;
    });
    if (!passed) {
      failures.push('Prerequisites / Need all courses');
    }
    // Core
    // Group A
    passed = true;
    this.state.courses.filter(req => (this.requirements.core.groupA.courses.includes(req.name))).forEach((req) => {
      if (!req.took) passed = false;
    });
    if (!passed) {
      failures.push('Engineering Core Courses / Need all courses from Group 1');
    }

    // Group B
    passed = false;
    this.state.courses.filter(req => (this.requirements.core.groupB.courses.includes(req.name))).forEach((req) => {
      if (req.took) passed = true;
    });
    if (!passed) {
      failures.push('Engineering Core Courses / Need at least one course from Group 2');
    }

    // Computer Science
    passed = false;
    this.state.courses.filter(req => (this.requirements.core.computerScience.courses.includes(req.name))).forEach((req) => {
      if (req.took) passed = true;
    });
    if (!passed) {
      failures.push('Computer Science Courses / Need either COSC 50 or ENGS 50');
    }

    // Breadth
    // 5 courses
    if (this.state.courses.filter(req => ((this.requirements.breadth.courses.includes(req.name) && (req.took)))).length < 5) failures.push('Breadth / Need at least 5 courses');

    // Group A
    passed = false;
    this.state.courses.filter(req => (this.requirements.breadth.groupA.courses.includes(req.name))).forEach((req) => {
      if (req.took) passed = true;
    });
    if (!passed) {
      failures.push('Breadth / Need at least one from Group 1');
    }

    // Group B
    passed = false;
    this.state.courses.filter(req => (this.requirements.breadth.groupB.courses.includes(req.name))).forEach((req) => {
      if (req.took) passed = true;
    });
    if (!passed) {
      failures.push('Breadth / Need at least one from Group 2');
    }

    // Group C
    passed = false;
    this.state.courses.filter(req => (this.requirements.breadth.groupC.courses.includes(req.name))).forEach((req) => {
      if (req.took) passed = true;
    });
    if (!passed) {
      failures.push('Breadth / Need at least one from Group 3');
    }
    // 3 computer science
    if (this.state.courses.filter(req => ((this.requirements.breadth.courses.includes(req.name)) && (req.name.substring(0, 4) === 'COSC') && (req.took))).length < 3) failures.push('Breadth / Need at least 3 computer science courses');

    // Culminating
    passed = false;
    this.state.courses.filter(req => (this.requirements.culm.courses.includes(req.name))).forEach((req) => {
      if (req.took) passed = true;
    });
    if (!passed) {
      failures.push('Culminating Experience / Need at least one culminating experience');
    }
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

  renderCheckList = () => {
    const { classes } = this.props;
    return (
      <div id="checkList">
        <div id="pre">
          <Typography variant="h5">Prerequisites</Typography>
          <List className={classes.root}>
            {
              this.state.courses.filter(req => (this.requirements.pre.courses.includes(req.name))).map((req, index) => (
                <ListItem key={index} dense button onClick={() => this.handleToggle(req.name)}>
                  <Checkbox
                    checked={req.took}
                    tabIndex={-1}
                    disableRipple
                    className={classes.skinnyCheckBox}
                    color="primary"
                  />
                  <ListItemText primary={req.name} />
                </ListItem>
              ))
            }
          </List>
        </div>
        <div id="core">
          <Typography variant="h5">Core</Typography>
          <Typography variant="subheading">Group A</Typography>
          <List className={classes.root}>
            {
              this.state.courses.filter(req => (this.requirements.core.groupA.courses.includes(req.name))).map((req, index) => (
                <ListItem key={index} dense button onClick={() => this.handleToggle(req.name)}>
                  <Checkbox
                    checked={req.took}
                    tabIndex={-1}
                    disableRipple
                    className={classes.skinnyCheckBox}
                    color="primary"
                  />
                  <ListItemText primary={req.name} />
                </ListItem>
              ))
            }
          </List>
          <Typography variant="subheading">Group B</Typography>
          <List className={classes.root}>
            {
              this.state.courses.filter(req => (this.requirements.core.groupB.courses.includes(req.name))).map((req, index) => (
                <ListItem key={index} dense button onClick={() => this.handleToggle(req.name)}>
                  <Checkbox
                    checked={req.took}
                    tabIndex={-1}
                    disableRipple
                    className={classes.skinnyCheckBox}
                    color="primary"
                  />
                  <ListItemText primary={req.name} />
                </ListItem>
              ))
            }
          </List>
          <Typography variant="subheading">Computer Science</Typography>
          <List className={classes.root}>
            {
              this.state.courses.filter(req => (this.requirements.core.computerScience.courses.includes(req.name))).map((req, index) => (
                <ListItem key={index} dense button onClick={() => this.handleToggle(req.name)}>
                  <Checkbox
                    checked={req.took}
                    tabIndex={-1}
                    disableRipple
                    className={classes.skinnyCheckBox}
                    color="primary"
                  />
                  <ListItemText primary={req.name} />
                </ListItem>
              ))
            }
          </List>
        </div>
        <div id="core">
          <Typography variant="h5">Breadth</Typography>
          <Typography variant="subheading">Group A</Typography>
          <List className={classes.root}>
            {
              this.state.courses.filter(req => (this.requirements.breadth.groupA.courses.includes(req.name))).map((req, index) => (
                <ListItem key={index} dense button onClick={() => this.handleToggle(req.name)}>
                  <Checkbox
                    checked={req.took}
                    tabIndex={-1}
                    disableRipple
                    className={classes.skinnyCheckBox}
                    color="primary"
                  />
                  <ListItemText primary={req.name} />
                </ListItem>
              ))
            }
          </List>
          <Typography variant="subheading">Group B</Typography>
          <List className={classes.root}>
            {
              this.state.courses.filter(req => (this.requirements.breadth.groupB.courses.includes(req.name))).map((req, index) => (
                <ListItem key={index} dense button onClick={() => this.handleToggle(req.name)}>
                  <Checkbox
                    checked={req.took}
                    tabIndex={-1}
                    disableRipple
                    className={classes.skinnyCheckBox}
                    color="primary"
                  />
                  <ListItemText primary={req.name} />
                </ListItem>
              ))
            }
          </List>
          <Typography variant="subheading">Group C</Typography>
          <List className={classes.root}>
            {
              this.state.courses.filter(req => (this.requirements.breadth.groupC.courses.includes(req.name))).map((req, index) => (
                <ListItem key={index} dense button onClick={() => this.handleToggle(req.name)}>
                  <Checkbox
                    checked={req.took}
                    tabIndex={-1}
                    disableRipple
                    className={classes.skinnyCheckBox}
                    color="primary"
                  />
                  <ListItemText primary={req.name} />
                </ListItem>
              ))
            }
          </List>
        </div>
        <div id="culm">
          <Typography variant="h5">Culminating</Typography>
          <List className={classes.root}>
            {
              this.state.courses.filter(req => (this.requirements.culm.courses.includes(req.name))).map((req, index) => (
                <ListItem key={index} dense button onClick={() => this.handleToggle(req.name)}>
                  <Checkbox
                    checked={req.took}
                    tabIndex={-1}
                    disableRipple
                    className={classes.skinnyCheckBox}
                    color="primary"
                  />
                  <ListItemText primary={req.name} />
                </ListItem>
              ))
            }
          </List>
        </div>
      </div>

    );
  }

  render() {
    const { classes } = this.props;
    const failures = this.checker();
    let result = <Typography variant="title" className={[classes.passed, classes.mb]}>Passed!</Typography>;
    let why = '';

    if (failures.length > 0) {
      result = <Typography variant="title" color="error" className={classes.mb}>Failed, missing the following:</Typography>;
      why = failures.map(failure => <Typography variant="body1" key={failure} className={classes.reason} color="error">{failure}</Typography>);
    }
    return (
      <Card className={classes.card}>
        <CardContent id="form">
          <Typography variant="title" className={classes.mb}>Degree Checker for ENGS modified CS</Typography>
          {this.renderCheckList()}
        </CardContent>
        <CardContent id="results" className={classes.hover}>
          {result}
          {why}
          <Button variant="contained" color="primary" className={[classes.mt, classes.mb]} onClick={this.reset}>Reset</Button>
          <Typography variant="body1"><Link href="https://github.com/ziruihao/degree-checker-client">Github</Link></Typography>
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
