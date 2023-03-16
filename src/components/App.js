import '../styles/App.scss';
//import phrases from '../data/phrases.json';
import { useEffect, useState } from 'react';
import objectToExport from '../services/localStorage';

function App() {
  const [phrase, setPhrase] = useState(objectToExport.get('local', []));
  const [newPhrase, setNewPhrase] = useState({
    quote: '',
    character: '',
  });

  const [search, setSearch] = useState('');
  const [selectCharacter, setSelectCharacter] = useState('Todos');

  useEffect(() => {
    // para recuperar los datos del API.
    if (objectToExport.notIncludes('local')) {
      fetch(
        'https://beta.adalab.es/curso-intensivo-fullstack-recursos/apis/quotes-friends-tv-v1/quotes.json'
      )
        .then((response) => response.json())
        .then((data) => {
          setPhrase(data);

          objectToExport.set('local', data);
        });
    }
  }, []);

  const renderPhrase = () => {
    return (
      phrase
        //filtrar por palabra
        .filter((eachPhrase) => {
          return eachPhrase.quote
            .toLocaleLowerCase()
            .includes(search.toLocaleLowerCase());
        })
        .filter((eachPhrase) => {
          // Filtrar por personaje
          if (selectCharacter === 'Todos') {
            return true;
          } else {
            return eachPhrase.character === selectCharacter;
          }
        })

        .map((eachPhrase, i) => {
          return (
            <li key={i} className="list_phrase">
              <p className="phrase">
                <label className="contact__label">Frase: </label>
                {eachPhrase.quote}
              </p>
              <p className="character">
                <label className="contact__label">Personaje: </label>
                {eachPhrase.character}
              </p>
            </li>
          );
        })
    );
  };

  const handleNewPhrase = (ev) => {
    setNewPhrase({ ...newPhrase, [ev.target.id]: ev.target.value });
  };

  const handleClick = (ev) => {
    ev.preventDefault();
    setPhrase([...phrase, newPhrase]);
    setNewPhrase({ quote: '', character: '' });
  };

  const handleFilter = (ev) => {
    setSearch(ev.target.value);
  };
  const handleSelectCharacter = (ev) => {
    setSelectCharacter(ev.target.value);
  };

  return (
    <div className="App">
      {/* header */}
      <header className="header">
        <h1 className="header__title">Frases de Friends</h1>
        <form className="phrase__form">
          <label htmlFor="searchQuotes">Filtrar por frase </label>
          <input
            className="header__search"
            autoComplete="off"
            id="searchQuotes"
            type="search"
            name="search"
            placeholder="Filtrar por frase"
            onInput={handleFilter}
            value={search}
          />

          <label htmlFor="filters-character">Filtrar por personaje</label>
          <select
            className="select"
            name="filter character"
            id="filters-character"
            onChange={handleSelectCharacter}
            value={selectCharacter}
          >
            <option value="Todos">Todos</option>
            <option value="Ross">Ross</option>
            <option value="Monica">Monica</option>
            <option value="Joey">Joey</option>
            <option value="Phoebe">Phoebe</option>
            <option value="Chandler">Chandler</option>
            <option value="Rachel">Rachel</option>
          </select>
        </form>
      </header>
      <main>
        {/* List phrase */}
        <ul className="contact__list">{renderPhrase()}</ul>
      </main>
      {/* new phrase */}
      <form className="new-phrase__form">
        <h2 className="new-phrase_title">Añade una nueva frase</h2>
        <label htmlFor="quote" className="contact__label">
          Frase
        </label>
        <input
          className="new-phrase__input"
          type="text"
          name="quote"
          id="quote"
          placeholder="frase"
          onInput={handleNewPhrase}
          value={newPhrase.quote}
        />
        <label htmlFor="character" className="contact__label">
          Personaje
        </label>
        <input
          className="new-phrase__input"
          type="text"
          name="character"
          id="character"
          placeholder="Personaje"
          onInput={handleNewPhrase}
          value={newPhrase.character}
        />
        <input
          className="new-phrase__btn"
          type="submit"
          value="Añadir"
          onClick={handleClick}
        />
      </form>
    </div>
  );
}

export default App;
