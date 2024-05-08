
import React from 'react';


function VerticalSpacing(props) {
  return (
    <div>
        {
          lineBreaks(parseInt(props.rows))
        }
    </div>
  );
}

function lineBreaks(rows) {
  const lineBreaksArray = [];

  for (let i = 0; i < rows; i++) {
    lineBreaksArray.push(<br key={i} />);
  }

  return lineBreaksArray;
}

export default VerticalSpacing;