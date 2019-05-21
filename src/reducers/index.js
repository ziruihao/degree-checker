import { combineReducers } from 'redux';

import CourseReducer from './course-reducer';
import RequirementReducer from './requirement-reducer';

const rootReducer = combineReducers({
  courses: CourseReducer,
  requirements: RequirementReducer,
});

export default rootReducer;
