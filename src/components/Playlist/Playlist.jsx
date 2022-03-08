import { useMemo, useState } from "react";
import { Search } from "./Search/Search";
import Table from "./Table/Table";
import "./Playlist.css";
import { useFetch } from "../../hooks/useFetch";

export const Playlist = () => {
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState({ column: "title", by: "asc" });

  const { loading, error, data } = useFetch(
    "https://player-homework.vercel.app/api"
  );

  const playlist = useMemo(
    () =>
      data?.playlist?.map((song) => ({
        ...song,
        durationInSec: Math.abs(song.durationInSec),
        created: new Date(song.created),
      })),
    [data]
  );

  const Body = () => {
    if (loading) return <Table.Skeleton />;
    if (error) return <Table.Error />;
    if (playlist?.length === 0) return <Table.Empty />;
    return <Table.Body playlist={playlist} filter={filter} order={order} />;
  };

  return (
    <div className="playlist-container">
      <Search setFilter={setFilter} />
      <Table order={order} setOrder={setOrder}>
        <Body />
      </Table>
    </div>
  );
};
