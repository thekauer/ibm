import "./Message.css";

export const Message = ({ src, alt, message }) => {
  return (
    <tr>
      <td colSpan={5} rowSpan={5}>
        <div className="message">
          <img src={src} alt={alt} />
          <span>{message}</span>
        </div>
      </td>
    </tr>
  );
};
