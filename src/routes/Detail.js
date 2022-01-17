import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";

function Detail() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});

  const getMovie = async () => {
    const json = await (
      await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
    ).json();
    setMovie(json.data.movie);
    setLoading(false);
  };

  useEffect(() => {
    getMovie();
  }, []);

  return (
    <div>
      {loading ? (
        <h1>loading</h1>
      ) : (
        <div>
          <h1>Detail</h1>
          <Movie
            id={movie.id}
            title={movie.title}
            genres={movie.genres}
            summary={movie.description_full}
            coverImg={movie.medium_cover_image}
          />
        </div>
      )}
    </div>
  );
}

export default Detail;
