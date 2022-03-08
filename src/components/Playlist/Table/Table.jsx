import { Header } from "./Header";
import { Body } from "./Body";
import "./Table.css";
import { Skeleton } from "./Skeleton/Skeleton";
import { Message } from "./Message/Message";

const Table = ({ order, setOrder, children }) => {
  const handleOrderChange = (column) => () => {
    setOrder((order) => {
      if (order.column === column) {
        return {
          column,
          by: order.by === "asc" ? "desc" : "asc",
        };
      }
      return {
        column,
        by: "asc",
      };
    });
  };

  const orderFor = (column) => {
    if (order.column === column) {
      return order.by === "asc" ? "desc" : "asc";
    }
  };

  return (
    <div className="playlist-table-container">
      <table>
        <thead>
          <tr>
            <Header
              title="title"
              onClick={handleOrderChange("title")}
              order={orderFor("title")}
            />
            <Header
              title="added"
              onClick={handleOrderChange("created")}
              order={orderFor("created")}
            />
            <Header
              title={<img src="clock.webp" alt="duration" />}
              onClick={handleOrderChange("durationInSec")}
              order={orderFor("durationInSec")}
            />
            <Header
              title="by"
              onClick={handleOrderChange("userName")}
              order={orderFor("userName")}
            />
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  );
};

Table.Body = Body;
Table.Skeleton = Skeleton;
Table.Error = () => (
  <Message src="error.webp" alt="error" message="Oops! Something went wrong." />
);
Table.Empty = () => (
  <Message
    src="empty.webp"
    alt="empty"
    message="Seems like you haven't added any songs yet."
  />
);

export default Table;
