import React, { useEffect, useState } from "react";
import PLaylistCard from "./PLaylistCard";
import { mediaJSON } from "../../Constants";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useVideoPlayerContext } from "../Context/store";
import { setSelectedVideo } from "../Context";
import styled from "styled-components";
const PlayListContainer = styled.div({
  border: "1px solid lightgrey",
  borderRadius: "8px",
  paddingBottom: "8px",
  padding: "16px",
  background: "#FEFBF6",
});
const PlayListHeader = styled.h1({
  fontSize: "1.1rem",
  fontWeight: 600,
  marginBottom: "8px",
});

const SearchInput = styled.input({
  width: "100%",
  border: "solid 1px grey",
  padding: "8px 16px",
});
const Playlist = () => {
  const baseUrl =
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/";
  const videos = mediaJSON.categories[0].videos;
  const [playlists, setPlaylists] = useState(videos);
  const { state, dispatch } = useVideoPlayerContext();
  useEffect(() => {
    //set default value to context
    setSelectedVideo(dispatch, videos[0]);
  }, []);
  const handleOnDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const items = Array.from(playlists);
    const [reOrderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reOrderedItem);
    setPlaylists(items);
  };
  const handleSearch = (value) => {
    const list = Array.from(videos);
    const searchResult = list.filter((item) => {
      return item.title.toLowerCase().includes(value.toLowerCase());
    });
    setPlaylists(searchResult);
  };
  return (
    <PlayListContainer>
      <div
        style={{
          paddingBottom: "16px",
        }}
      >
        <PlayListHeader>Playlist</PlayListHeader>
        <SearchInput
          type="text"
          placeholder="Search"
          onChange={(evt) => handleSearch(evt.target.value)}
        />
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="playlist">
          {(provided) => (
            <ul
              style={{
                height: "70vh",
                overflow: "auto",
              }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {playlists?.length
                ? playlists.map((video, index) => {
                    return (
                      <Draggable
                        key={video.thumb}
                        draggableId={video.thumb}
                        index={index}
                      >
                        {(provided) => (
                          <li
                            onClick={() => {
                              setSelectedVideo(dispatch, video);
                            }}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                          >
                            <PLaylistCard
                              isPlaying={
                                video.title === state?.selectedVideo?.title ||
                                false
                              }
                              title={video.title}
                              subtitle={video.subtitle}
                              thumb={baseUrl + video.thumb}
                              index={index}
                            />
                          </li>
                        )}
                      </Draggable>
                    );
                  })
                : null}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </PlayListContainer>
  );
};

export default Playlist;
