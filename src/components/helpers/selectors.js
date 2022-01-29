// helper function for returning appointment array by day
export function getAppointmentsForDay(state, day) {
  
  const dayAppointments = [];
  if (state.length === 0 || !state || !state.days || !state.appointments) {
    return dayAppointments;
  }
  if (!(state.days).find(dayObj => dayObj['name'] === day)) {
    return dayAppointments;
  }
  const dayAppointmentIds = (state.days).find(dayObj => dayObj['name'] === day).appointments;
  
  for (let appointment in (state.appointments)) {
    if (dayAppointmentIds.includes(Number(appointment))) {
      dayAppointments.push(state.appointments[appointment]);
    }
  }
  return dayAppointments;
};
// function returning interview object by interview id
export function getInterview(state, interview) {
  if (!interview || !state) {
    return null;
  }
  const { student, interviewer }  = interview;
  const interviewers = state.interviewers;

  const interviewObj = {
    student: student,
    interviewer: {
      id: interviewer,
      name: interviewers[interviewer].name,
      avatar: interviewers[interviewer].avatar
    }
  };

  return interviewObj;
};
// function returning array of interviewers by day
export function getInterviewersForDay(state, day) {
  const {days, interviewers} = state;
  if (!days || !state) {
    return null;
  }
  const foundDay = days.find(oneDay => oneDay.name === day);
  const foundInterviewers = [];
  if (!foundDay) {
    return foundInterviewers;
  };

  foundDay.interviewers.forEach(interviewer => foundInterviewers.push(interviewers[interviewer]));
  return foundInterviewers;
};