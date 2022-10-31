import React, { Fragment } from "react";
import { getAllEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/events-search";
import { useRouter } from "next/router";

export default function AllEventsPage() {
    const router = useRouter();
    const events = getAllEvents();

    const findEventsHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    };

    return (
        <Fragment>
            <EventSearch onSearch={findEventsHandler} />
            <EventList items={events} />
            {/* <iframe
                width="200"
                height="200"
                src="https://www.youtube.com/embed/fl2TrA0l-Xg"
                title="곰주먹 김정균 vs 비밀병희 임병희 [블랙컴뱃03]"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
            ></iframe> */}
        </Fragment>
    );
}
