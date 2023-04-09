const AnimeListCard = props => {
  return (
    <div className="card">
      <div className="container-data">
        <h2>{props?.title}</h2>
        <h3>{`Description ${props?.description}`}</h3>
        <h3>{`Genres ${props?.genres?.map(element => element)}`}</h3>
        <h3>{`Duration ${props?.duration}`}</h3>
        <h3>{`Chapter ${props?.chapter}`}</h3>
        <h3>{`Average Score ${props?.averageScore}`}</h3>
      </div>
    </div>
  );
};

export default AnimeListCard;
