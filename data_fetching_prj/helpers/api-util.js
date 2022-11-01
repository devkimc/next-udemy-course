export async function getAllEvents() {
    const response = await fetch(
        'https://nextjs-course-2460a-default-rtdb.firebaseio.com/events.json'
    );
    const data = await response.json();

    const events = [];

    for (const key in data) {
        events.push({
            id: key,
            ...data[key],
        });
    }

    return events;
}

export async function getFeaturedEvents() {
    const allEvetns = await getAllEvents();
    return allEvetns.filter((event) => event.isFeatured);
}

export async function getEventById(id) {
    const allEvetns = await getAllEvents();
    return allEvetns.find((event) => event.id === id);
}

export async function getFilteredEvents(dateFilter) {
    const { year, month } = dateFilter;

    const allEvetns = await getAllEvents();

    let filteredEvents = allEvetns.filter((event) => {
        const eventDate = new Date(event.date);
        return (
            eventDate.getFullYear() === year &&
            eventDate.getMonth() === month - 1
        );
    });

    return filteredEvents;
}
