import { Playlist } from "./components/Playlist/Playlist";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function App() {
  return (
    <SkeletonTheme
      baseColor="var(--skeleton-base)"
      highlightColor="var(--skeleton-light)"
    >
      <h1>Playlist</h1>
      <Playlist />
    </SkeletonTheme>
  );
}

export default App;
