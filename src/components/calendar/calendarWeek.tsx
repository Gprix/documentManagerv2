export interface CalendarWeekProps {
  startDate: Date;
  appointments: unknown[];
  selectedHour: unknown;
  renderAppointment: unknown;
  clientNames: unknown[];
  fullDocs: unknown[];
}

const CalendarWeek = (props: CalendarWeekProps) => {
  const { appointments, clientNames, fullDocs } = props;
  const { renderAppointment, selectedHour, startDate } = props;

  const days = [];

  startDate.setDate(startDate.getDate() - ((startDate.getDay() + 7) % 7));

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + i);
    days.push(currentDate);
  }

  const ordenarPorHora = (citaA: object, citaB: object) => {
    // @ts-ignore
    const horaA = citaA.hour.split(":")[0];
    // @ts-ignore
    const minutoA = citaA.hour.split(":")[1];
    // @ts-ignore
    const horaB = citaB.hour.split(":")[0];
    // @ts-ignore
    const minutoB = citaB.hour.split(":")[1];

    if (horaA === horaB) {
      return minutoA.localeCompare(minutoB);
    }

    return horaA.localeCompare(horaB);
  };

  let count = 0;

  return (
    <div className="flex flex-row w-full h-full gap-2">
      {days.map((date) => {
        const citas = appointments
          // @ts-ignore
          .map((fecha, indice) => ({
            fecha,
            indice,
            // @ts-ignore
            hour: selectedHour[indice],
          }))
          // @ts-ignore
          .filter((fecha) => fecha.fecha === date.toDateString());

        const citasOrdenadas = citas.sort(ordenarPorHora);

        count += 1;

        return (
          <div key={count} className="flex-grow h-[60vh]">
            <div className="flex justify-center mb-3 font-bold">
              {date
                .toLocaleDateString("es-PE", { weekday: "long" })
                .charAt(0)
                .toUpperCase()}
              {date.toLocaleDateString("es-PE", { weekday: "long" }).slice(1)}
            </div>
            <div
              key={date.toDateString()}
              className="border-2 border-gray-300 rounded-md hover:bg-gray-100 h-full"
            >
              <div className="flex justify-center text-2xl font-semibold center mt-5">
                {date.toLocaleDateString() ===
                new Date().toLocaleDateString() ? (
                    <div
                      key={date.toLocaleDateString()}
                      className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-[#FAFAFA] text-l"
                    >
                      {date.getDate()}
                    </div>
                  ) : (
                    date.getDate()
                  )}
              </div>
              <div>
                {citasOrdenadas.map((cita) =>
                  // @ts-ignore
                  renderAppointment(
                    clientNames[cita.indice],
                    // @ts-ignore
                    selectedHour[cita.indice],
                    fullDocs.find(
                      // @ts-ignore
                      (tmp) => tmp.clientName === clientNames[cita.indice]
                    )
                  )
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CalendarWeek;
