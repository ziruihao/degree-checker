
export const ActionTypes = {
  ADD_COURSE: 'ADD_COURSE',
  REMOVE_COURSE: 'REMOVE_COURSE',
};

export function addCourse(courseName) {
  return {
    type: ActionTypes.ADD_COURSE,
    payload: courseName,
  };
}

export function removeCourse(courseName) {
  return {
    type: ActionTypes.REMOVE_COURSE,
    payload: courseName,
  };
}
