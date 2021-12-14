import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import "components/InterviewerListItem.scss";

export default function InterviewerList(props) {
  const { interviewers, value, onChange} = props;
  const parsedInterviewers = interviewers.map(anInterviewer => 
    <InterviewerListItem 
      key={anInterviewer.id}
      name={anInterviewer.name}
      avatar={anInterviewer.avatar}
      selected={anInterviewer.id === value}
      setInterviewer={() => onChange(anInterviewer.id)}
    />
  );
  return (
    <section className="interviewers text--light">
      <h4 className="interviewers__header">Interviewer</h4>
      <ul className='interviewers__list'>{parsedInterviewers}</ul>
    </section>
  );
}; 