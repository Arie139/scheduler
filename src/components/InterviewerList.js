import React from "react";
import InterviewerListItem from "components/InterviewerListItem";
import "components/InterviewerList.scss";
import "components/InterviewerListItem.scss";

export default function InterviewerList(props) {
  const { interviewers, interviewer, setAnInterviewer} = props;
  const parsedInterviewers = interviewers.map(anInterviewer => 
    <InterviewerListItem 
      key={anInterviewer.id}
      name={anInterviewer.name}
      avatar={anInterviewer.avatar}
      selected={anInterviewer.id === interviewer}
      setAnInterviewer={() => setAnInterviewer(anInterviewer.id)}
    />
  );
  return (
    <section className="interviewers text--light">
      <h4 className="interviewers__header">Interviewer</h4>
      <ul className='interviewers__list' onClick={setAnInterviewer}>{parsedInterviewers}</ul>
    </section>
  );
}; 