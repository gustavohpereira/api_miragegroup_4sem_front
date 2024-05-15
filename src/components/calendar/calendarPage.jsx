import { useEffect, useState } from "react";
import Calendar from "./calendar";
import { getAllMeetings } from "../../functions/meetingEndpoints";

export default function CalendarPage() {

    const [meetings, setMeetings] = useState();


    useEffect(() => {
        async function fetchMeetings() {
          const meetingsResponse = await getAllMeetings();
          setMeetings(meetingsResponse);
        }
        fetchMeetings();
      }, []);

      if (meetings != undefined) {
        console.log(meetings)

        return (
            <div>
                <Calendar meetingData={meetings}></Calendar>
            </div>
        )
      }
}