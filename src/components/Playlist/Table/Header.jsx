export const Header = ({ title, onClick, order }) => {
  const style = !order
    ? {
        color: "transparent",
      }
    : undefined;

  return (
    <th onClick={onClick}>
      <span>
        {title} <span style={style}>{order === "asc" ? "▲" : "▼"}</span>
      </span>
    </th>
  );
};
