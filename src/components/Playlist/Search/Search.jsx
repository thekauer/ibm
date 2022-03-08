import "./PlaylistSearch.css";

export const Search = ({ setFilter }) => {
  const handleChange = (event) => {
    setFilter(event.target.value.toLowerCase());
  };

  return (
    <div className="playlist-search">
      <input type="text" onChange={handleChange} placeholder="Song title" />
      <button>
        <img src="search.webp" alt="search icon" />
      </button>
    </div>
  );
};
