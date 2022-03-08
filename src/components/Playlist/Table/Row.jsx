import { Avatar } from "../../Avatar/Avatar";

export const Row = ({ song }) => {
  const created = song.created.toLocaleString("en-US").split(",")[0];
  const durationMin = Math.floor(song.durationInSec / 60);
  const durationSec = (song.durationInSec % 60).toString().padStart(2, "0");

  return (
    <tr
      style={{
        background: `linear-gradient(to right, ${song.theme}55, transparent 80%)`,
      }}
    >
      <td
        style={{
          borderLeft: `5px solid ${song.theme}`,
        }}
      >
        {song.title}
      </td>
      <td>{created}</td>
      <td>
        {durationMin}:{durationSec}
      </td>
      <td>
        <Avatar avatarURL={song.avatarURL} userName={song.userName} />
      </td>
    </tr>
  );
};
