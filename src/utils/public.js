export function chainDate(times, fengefu) {
  if (typeof times === "string") {
    times = times.replace(/-/g, "/");
  }
  fengefu = fengefu || "-";
  const time = new Date(times);
  const nian = time.getFullYear();
  const yue = ("00" + (time.getMonth() + 1)).slice(-2);
  const ri = ("00" + time.getDate()).slice(-2);
  const shi = ("00" + time.getHours()).slice(-2);
  const fen = ("00" + time.getMinutes()).slice(-2);
  const miao = ("00" + time.getSeconds()).slice(-2);
  return (
    nian + fengefu + yue + fengefu + ri + " " + shi + ":" + fen + ":" + miao
  );
}
