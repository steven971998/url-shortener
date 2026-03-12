
//To convert the given time in Milliseconds based on the input unit.

function timeToMs(value, unit) {

  const unitMap = {
    seconds: 1000,
    minutes: 60 * 1000,
    hours: 60 * 60 * 1000,
    days: 24 * 60 * 60 * 1000
  };

  if (!unitMap[unit]) {
    throw new Error("Invalid time unit for rate limiter");
  }

  return value * unitMap[unit];
}

module.exports = timeToMs;