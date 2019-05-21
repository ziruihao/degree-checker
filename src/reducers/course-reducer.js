// import { ActionTypes } from '../actions';

const courses = {
  ENGS22: false,
  ENGS27: false,
  ENGS31: false,
  ENGS23: false,
  ENGS24: false,
  COSC50: false,
  ENGS50: false,
  ENGS32: false,
  ENGS62: false,
  COSC51: false,
  ENGS26: false,
  ENGS68: false,
  ENGS92: false,
  COSC60: false,
  ENGS91: false,
  COSC31: false,
  COSC58: false,
  ENGS77: false,
};

const CourseReducer = (state = courses, action) => {
  switch (action.type) {
    // case ActionTypes.ADD_COURSE:
    //   return Object.assign({}, state, {});
    // case ActionTypes.REMOVE_COURSE:
    //   return state.filter(courseName => courseName !== action.payload);
    default:
      return state;
  }
};

export default CourseReducer;
