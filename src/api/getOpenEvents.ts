export const getOpenEvents = async () => {
  const url = import.meta.env.VITE_PUBLIC_BASE_URL + "v1/events/openEvents";
  const res = await fetch(url);

  if (!res.ok) {
    const body = await res.json();
    console.log(body);
    return;
  }

  const body = await res.json();
  const { events } = body;
  return events;
};
