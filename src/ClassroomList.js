import React from 'react';

function ClassroomList(props) {
  return (
    <tr>
      <td>{props.classroom.class}</td>
      <td>{props.classroom.name}</td>
    </tr>
  )
};

export default ClassroomList;