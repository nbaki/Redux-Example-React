import React from 'react';

function Students(props) {
  return (
    <section id="students">
      <h3>My students List: {props.numOfStudents} students</h3>
    </section>
  )
}

export default Students;