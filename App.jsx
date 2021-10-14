import React, {useState} from 'react';
import {Container} from './App.styles';
import music from './music.json';
import './app.css'
import {debounce} from 'lodash'

const App = () => {

  const [musicData, setMusicData] = useState(music);

  const handleInputChange = (e) => {
    const lowerText = e.target.value.toLowerCase();
    const filtered = music.filter((item) => {
      if (item.title.toLowerCase().includes(lowerText) || item.artist.toLowerCase().includes(lowerText) ||  item.year.toString().toLowerCase().includes(lowerText)){
        return item;
      }
    })
    setMusicData(filtered)
    if (filtered.length === 0) {
      const filteredGenre = [];
      music.forEach((item) => {
        item.genres.forEach((genre) => {
          if(genre.toLowerCase().includes(lowerText)) {
            filteredGenre.push(item)
          }
        })
      })
      setMusicData(filteredGenre)
    }
  }
  
  return (
    <Container>
      <div style={{textAlign: "center"}}>
        <h1>Music Search</h1>
      </div>
      <div className="search-container">
        <label style={{paddingRight: "10px"}} for="search">Type To Search For A Song</label>
        <input onChange={debounce(handleInputChange, 500)} name="search"></input>
      </div>
      <div className="music-container">
      {musicData.length
      ?
        musicData.map((item) => {
          return (
            <div className="single-music-container">
              <ul key={item.id}>
                <li><span className="title">Artist:</span> {item.artist}</li>
                <li><span className="title">Title:</span> {item.title}</li>
                <li><span className="title">Year:</span> {item.year}</li>
                <li><span className="title">Genre:</span> {item.genres}</li>
              </ul>
            </div>
         )
        }) 
      :
      <h2 style={{textAlign: "center"}} >Sorry, We Dont Have That Song 😢</h2>}
      </div>
    </Container>
  );
};

export default App;
