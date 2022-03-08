import "./Avatar.css";

export const Avatar = ({ avatarURL, userName }) => {
  const initial = userName[0].toUpperCase();

  return (
    <div className="avatar">
      {avatarURL ? (
        <img src={avatarURL} alt="avatar" />
      ) : (
        <span>{initial}</span>
      )}
      <div className="tooltip">@{userName}</div>
    </div>
  );
};
