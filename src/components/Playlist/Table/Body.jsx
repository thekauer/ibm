import { Row } from "./Row";

export const Body = ({ playlist, filter, order }) => {
  const orderBy = (a, b) => {
    if (order.by === "asc") {
      return a[order.column] > b[order.column] ? 1 : -1;
    }
    return a[order.column] < b[order.column] ? 1 : -1;
  };

  const orderedPlaylist = playlist
    .sort(orderBy)
    .filter((song) => song.title.toLowerCase().startsWith(filter));

  return orderedPlaylist?.map((song) => <Row song={song} key={song.guid} />);
};
