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

  const spotsRemaining = (id, appointments) => {
    if (state.days.length > 0 && appointments !== {}) {
      const index = state.days.findIndex(day => day.appointments.includes(id));
      const appointmentIds = state.days[index].appointments;
      const empty = appointmentIds.filter(id => appointments[id].interview === null).length;
      return empty;
    };
  };
  
  const updateSpots = (id, appointments) => {
    const days = [...state.days];
    const index = state.days.findIndex(day => day.appointments.includes(id));
    const spots = spotsRemaining(id, appointments);
    const updatedDay = { ...days[index], spots };
    days[index] = updatedDay;
    return days;
  };

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

  useEffect(() => {
    const daysUrl = 'http://localhost:8001/api/days';
    const appointmentsUrl = 'http://localhost:8001/api/appointments';
    const interviewersUrl = 'http://localhost:8001/api/interviewers';
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

  const bookInterview = (id, interview) => {
    const appointments = updateAppointments(id, interview);
    const days = updateSpots(id, appointments);
    return axios.put('http://localhost:8001/api/appointments/' + id, {interview})
    .then((res) => {
      setState(prev => ({ ...prev, appointments, days }));
    });
  };

  const cancelInterview = (id) => {
    const appointments = updateAppointments(id);
    const days = updateSpots(id, appointments);
    return axios.delete('http://localhost:8001/api/appointments/' + id)
    .then((res) => {
      setState(prev => ({ ...prev, days, appointments }));
    });
  };

  return { state, setDay, bookInterview, cancelInterview };
};