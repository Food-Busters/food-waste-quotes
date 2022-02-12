// Copied from https://github.com/Leomotors/anime-captcha
export function howFar(date: string) {
  const BuildDate = Date.parse(date);
  // Calculate how far it is from BuildDate

  const now = Date.now();
  const diff = now - BuildDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  return days > 0
    ? `${days} days ago`
    : hours > 0
    ? `${hours} hours ago`
    : minutes > 0
    ? `${minutes} minutes ago`
    : `${seconds} seconds ago`;
}
