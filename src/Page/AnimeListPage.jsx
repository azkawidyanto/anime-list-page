import { useEffect, useState } from 'react';
import AnimeListCard from '../Component/AnimeListCard';

const AnimeListPage = async () => {
  const [dataAnime, setDataAnime] = useState({});
  const [showData, setShowData] = useState(false);
  var query = `
    query ($id: Int) {
      Media(id: $id, type: ANIME) {
        id
        description
        averageScore
        genres
        duration
        chapters
        title {
          romaji
          english
          native
        }
      }
    }
  `;

  var variables = {
    page: 1,
    perPage: 10,
  };

  var url = 'https://graphql.anilist.co',
    options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        query: query,
        variables: variables,
      }),
    };

  function handleResponse(response) {
    return response.json().then(function (json) {
      return response.ok ? json : Promise.reject(json);
    });
  }

  function handleData(data) {
    let mediaArray = { ...data?.data?.Media };
    setDataAnime(dataAnime => ({
      ...dataAnime,
      ...mediaArray,
    }));
  }

  function handleError(error) {
    console.error(error);
  }

  fetch(url, options).then(handleResponse).then(handleData).catch(handleError);

  useEffect(() => {
    setDataAnime(dataAnime);
  }, [dataAnime, setDataAnime]);

  useEffect(() => {
    if (dataAnime?.length > 0) {
      setShowData(true);
    }
  }, [dataAnime, setShowData]);

  const dataArray = Object.keys(dataAnime).map(index => {
    let res = dataAnime[index];
    return res;
  });

  return (
    <div>
      <div>
        {showData &&
          dataArray?.map((element, index) => (
            <AnimeListCard
              key={index}
              description={element?.description}
              duration={element?.duration}
              title={element?.title?.english}
              genres={element?.genres}
              averageScore={element?.averageScore}
              chapters={element?.chapters}
            />
          ))}
      </div>
    </div>
  );
};

export default AnimeListPage;
