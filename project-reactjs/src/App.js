import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import CharacterList from './pages/characterList';
import CharacterByLocation from './pages/characterByLocation';
import DetailCharacter from './pages/detailCharacter';
import NotFound from './pages/notFound';
import ResponsiveAppBar from './components/appBar'

import { useQuery, gql } from '@apollo/client';
import { useEffect } from 'react';

const GET_DATA = gql`
  {
    characters {
      results {
        id,
        name,
        status,
        gender,
        species
      }
    }
  }`


function App() {
  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return "Loading...";
  if (error) return <pre>{error.message}</pre>
  
  return (
    <Router>
      <ResponsiveAppBar />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/characterlist" element={<CharacterList />} />
          <Route path="/characterbylocation" element={<CharacterByLocation />} />
          <Route path="/detailcharacter" element={<DetailCharacter />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* {data && (
          <>
            {data.characters.results.map((character) => (
              <p key={character.id}>{character.name}</p>
            ))}
          </>
        )} */}
      </div>
    </Router>
  );
}

export default App;
