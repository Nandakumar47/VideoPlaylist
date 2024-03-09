import "./App.css";
import CustomVideoPlayer from "./Components/CustomVideoPlayer";
import Playlist from "./Components/Playlist";

function App() {
  return (
    <div className="videoPlayer grid grid-cols-12">
      <div className="col-span-4 md:col-span-9 bg-gray-200">
        <CustomVideoPlayer />
      </div>
      <div className="col-span-8 md:col-span-3 bg-gray-300">
        <Playlist />
      </div>
    </div>
  );
}

export default App;
