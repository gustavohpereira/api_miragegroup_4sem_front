import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from '@fullcalendar/daygrid';
import { useEffect, useState } from "react";
import { getAllMeetings } from "../../functions/meetingEndpoints";
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';
import CustomEventContent from "./customEventContent";





export default function Calendar({meetingData}) {
  
  console.log(meetingData)

  const mapMeetingToEvent = (meeting) => ({
    id: meeting.id,
    title: meeting.protocol,
    start: new Date(meeting.beginning_time),
    end: new Date(meeting.end_time),
    description: meeting.description,
    meetingTheme: meeting.meetingTheme.join(', '),
  });

  let events = [];
  if (meetingData.length != 0) {
    events = meetingData.map(mapMeetingToEvent);
  }

  return (
    <div className="w-5/6">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        locale={ptBrLocale} 
      />
    </div>
  );
}