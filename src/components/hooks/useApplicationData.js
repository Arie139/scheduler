import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // remaining appointment spots
  const spotsRemaining = (id, appointments) => {
    if (state.days.length > 0 && appointments !== {}) {
      const index = state.days.findIndex(day => day.appointments.includes(id));
      const appointmentIds = state.days[index].appointments;
      const empty = appointmentIds.filter(id => appointments[id].interview === null).length;
      return empty;
    };
  };
  // update remaining spots in array
  const updateSpots = (id, appointments) => {
    const days = [...state.days];
    const index = state.days.findIndex(day => day.appointments.includes(id));
    const spots = spotsRemaining(id, appointments);
    const updatedDay = { ...days[index], spots };
    days[index] = updatedDay;
    return days;
  };
  // updates appointment object
  const updateAppointments = (id, interview) => {
    const newInterview = (interview) ? {...interview} : null;
    const appointment = {
      ...state.appointments[id],
      interview: newInterview
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return appointments;
  };
  // gets information from api and setState
  useEffect(() => {
    const daysUrl = '/api/days';
    const appointmentsUrl = '/api/appointments';
    const interviewersUrl = '/api/interviewers';
    Promise.all([
      axios.get(daysUrl),
      axios.get(appointmentsUrl),
      axios.get(interviewersUrl)
    ]).then((all) => {
      const [daysData, appointmentsData, interviewersData] = all;
      setState(prev => ({...prev, days: daysData.data, appointments: appointmentsData.data, interviewers: interviewersData.data}));
    });
  }, []);
  
  const setDay = day => setState({ ...state, day });
  //creates appointment and updates state
  const bookInterview = (id, interview) => {
    const appointments = updateAppointments(id, interview);
    const days = updateSpots(id, appointments);
    return axios.put('/api/appointments/' + id, {interview})
    .then((res) => {
      setState(prev => ({ ...prev, appointments, days }));
    });
  };
  // deletes and updates api
  const cancelInterview = (id) => {
    const appointments = updateAppointments(id);
    const days = updateSpots(id, appointments);
    return axios.delete('/api/appointments/' + id)
    .then((res) => {
      setState(prev => ({ ...prev, days, appointments }));
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};