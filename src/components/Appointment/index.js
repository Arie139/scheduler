import React from "react";
import "./styles.scss";
import Header from './Header';
import Show from './Show';
import Empty from './Empty';
import Form from './Form';
import Status from './Status';
import Confirm from './Confirm';
import Error from './Error';
import useVisualMode from "components/hooks/useVisualMode";

export default function Appointment(props) {
  const { time, interview, interviewers, bookInterview, id, cancelInterview } = props;
  
  const { mode, transition, back } = useVisualMode(
    interview ? 'show' : 'empty'
  );
    const edit = () => {
      transition('edit');
    }  
    const save = (name, interviewer) => {
    transition('saving');
    
    const interview = {
      student: name,
      interviewer
    };

    bookInterview(id, interview)
    .then(() => {
      transition('show');
    })
    .catch((error) => {
      transition('error_save', true)
    });
  };

  const onDelete = () => {
    transition('confirm');
  };

  const onConfirm = (id) => {
    transition('deleting', true);
    cancelInterview(id)
    .then(()=> {
      transition('empty');
    })
    .catch((error) => {
      transition('error_delete', true)
    });
  };

  return (
    <article className="appointment">
      <Header time={time} />
        {mode === 'empty' && <Empty onAdd={() => transition('create')} />}
        {mode === 'show' && 
          <Show
            id={id}
            student={interview.student}
            interviewer={interview.interviewer}
            onEdit={edit}
            onDelete={onDelete}
          />
        }
        {mode === 'create' && 
          <Form interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
          />
        }
        {mode === 'edit' &&
          <Form student={interview.student}
          interviewer={interview.interviewer.id}
          interviewers={interviewers}
          onCancel={() => back()}
          onSave={save}
          />
        }
        {mode === 'saving' &&
          <Status message={'Saving'} />
        }
        {mode === 'confirm' &&
          <Confirm id={id} message="Delete the appointment?"
            onConfirm={onConfirm} onCancel={() => back()} />
        }
        {mode === 'deleting' &&
          <Status message={'Deleting'} />
        }
        {mode === 'error_save' &&
          <Error message={'Could not edit appointment'} onClose={() => back()}/>
        }
        {mode === 'error_delete' &&
          <Error message={'Could not delete appointment'} onClose={() => back()}/>
        }
    </article>
  );
}