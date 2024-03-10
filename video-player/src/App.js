import "./App.css";
import { VideoPlayerProvider } from "./Components/Context/store";
import CustomVideoPlayer from "./Components/CustomVideoPlayer";
import NavBar from "./Components/NavBar";
import Playlist from "./Components/Playlist";
import VideoFooter from "./Components/VideoFooter";
import { mediaJSON } from "./Constants";
function App() {
  return (
    <div>
      <NavBar />
      <VideoPlayerProvider>
        <div className="videoPlayer grid grid-cols-12 gap-8 p-7">
          <div className="col-span-12   md:col-span-8">
            <CustomVideoPlayer />
            <VideoFooter />
          </div>
          <div className="col-span-12  md:col-span-4 ">
            <Playlist />
          </div>
        </div>
      </VideoPlayerProvider>
    </div>
  );
}

export default App;
