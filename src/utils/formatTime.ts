export function convertTo12HourFormat(time24: string): string {
  if (!time24 || typeof time24 !== 'string') {
    return '';
  }

  const [hours, minutes] = time24.split(':');
  const hour24 = parseInt(hours, 10);
  const minute = minutes || '00';

  if (isNaN(hour24) || hour24 < 0 || hour24 > 23) {
    return time24;
  }

  const period = hour24 >= 12 ? 'PM' : 'AM';
  const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;

  return `${hour12}:${minute} ${period}`;
}

export function formatTimeRange(startTime: string, endTime: string): string {
  const formattedStart = convertTo12HourFormat(startTime);
  const formattedEnd = convertTo12HourFormat(endTime);

  if (!formattedStart || !formattedEnd) {
    return '';
  }

  return `${formattedStart} - ${formattedEnd}`;
}
