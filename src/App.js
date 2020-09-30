import React, { useEffect, useState } from 'react';
import Tmdb from './Tmdb'
import MovieList from './components/MovieList';
import './App.css'
import FeaturedMovie from './components/FeaturedMovies'
import Header from './components/Header';


export default () => {
  const [movieList, setMovieList] = useState([])
  const [featuredData, setFeaturedData] = useState(null)
  const [blackHeader, setBlackHeader] = useState(false)

  useEffect(() => {
    const loadAll = async () => {
      // get all list
      let list = await Tmdb.getHomeList()
      setMovieList(list)

      // get Featured
      let originals = list.filter(item => item.slug === 'originais')
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]

      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv')
      setFeaturedData(chosenInfo)
    }

    loadAll()
  }, [])


  useEffect(() => {
    const scrollListerner = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true)
      }else{
        setBlackHeader(false)
      }
    }

    window.addEventListener('scroll', scrollListerner)
    return () => {
      window.removeEventListener('scroll', scrollListerner)
    }

  }, [])


  return (
    <div className="Page">

      <Header black={blackHeader} />

      {featuredData &&
        <FeaturedMovie item={featuredData} />
      }
      <section className="Lists">
        {movieList.map((item, key) => (
          <MovieList key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com <span role="img" arial-label="coração"> Feito em React por CarlosWev</span>
      </footer>

      {movieList.length <= 0 && 
        <div className="loading">
          <img src="https://www.filmelier.com/pt/br/news/wp-content/uploads/2020/03/netflix-loading.gif" alt="Carregando" />
        </div>
      }
    </div>
    
  );
}


