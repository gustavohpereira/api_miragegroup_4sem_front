import React from 'react';

const CustomEventContent = ({ event }) => {
  return (
    <div className="">
      <div className="">
        <p><strong>Titulo:</strong> {event.title}</p>
        {/* Adicione mais informações conforme necessário */}
      </div>
    </div>
  );
};

export default CustomEventContent;