import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { getFilteredEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

function FilteredEventsPage(props) {
    // const router = useRouter();

    // const filterData = router.query.slug;

    // if (!filterData) {
    //     return <p className='center'>Loading...</p>;
    // }

    // const filterdYear = filterData[0];
    // const filterdMonth = filterData[1];

    // const numYear = +filterdYear;
    // const numMonth = +filterdMonth;

    if (props.hasError) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>Invalid filter</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const filteredEvents = props.events;

    if (!filteredEvents || filteredEvents.length === 0) {
        return (
            <Fragment>
                <ErrorAlert>
                    <p>No events found for the chosen filter!</p>
                </ErrorAlert>
                <div className='center'>
                    <Button link='/events'>Show All Events</Button>
                </div>
            </Fragment>
        );
    }

    const date = new Date(props.date.year, props.date.month - 1);

    return (
        <Fragment>
            <ResultsTitle date={date} />
            <EventList items={filteredEvents} />
        </Fragment>
    );
}

export async function getServerSideProps(context) {
    const { params } = context;

    const filterData = params.slug;

    const filterdYear = filterData[0];
    const filterdMonth = filterData[1];

    const numYear = +filterdYear;
    const numMonth = +filterdMonth;

    if (
        isNaN(numYear) ||
        isNaN(numMonth) ||
        numYear > 2030 ||
        numYear < 2021 ||
        numMonth < 1 ||
        numMonth > 12
    ) {
        return {
            props: { hasError: true },
            // notFound: true,
            // redirect: {
            //     destination: '/error'
            // }
        };
    }

    const filteredEvents = await getFilteredEvents({
        year: numYear,
        month: numMonth,
    });
    return {
        props: {
            events: filteredEvents,
            date: {
                year: numYear,
                month: numMonth,
            },
        },
    };
}

export default FilteredEventsPage;
