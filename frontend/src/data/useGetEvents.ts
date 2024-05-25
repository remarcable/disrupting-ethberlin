export const useGetEvents = () => {
  return [
    {
      id: 1,
      startsAt: new Date("2024/05/25 00:00 UTC+2"),
      durationInMinutes: 24 * 60 - 1,
      location: "Node Café",
      title: "Mentoring + Help",
      emoji: "🤔",
    },
    {
      id: 2,
      startsAt: new Date("2024/05/25 15:30 UTC+2"),
      durationInMinutes: 150,
      location: "The Patio",
      title: "Open Jam",
      emoji: "🎸",
    },
    {
      id: 3,
      startsAt: new Date("2024/05/25 19:00 UTC+2"),
      durationInMinutes: 30,
      location: "Somewhere",
      title: "Your Subversive Event?",
      emoji: "✨",
    },
  ];
};
