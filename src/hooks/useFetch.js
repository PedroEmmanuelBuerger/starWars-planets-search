const apiStarWars = 'https://swapi.dev/api/planets';

const useFetch = () => {
  const fetchData = async (setContextState) => {
    const results = await fetch(apiStarWars);
    const resultJson = await results.json();
    const planets = resultJson.results;
    const planetsWithoutResidents = planets.map((planet) => {
      const { residents, ...planetWithoutResidents } = planet;
      return planetWithoutResidents;
    });
    setContextState(planetsWithoutResidents);
  };
  return {
    fetchData,
  };
};

export default useFetch;
