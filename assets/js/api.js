const buildApiURL = (bbox) => {
  const { n, e, s, w } = bbox;
  const API_URL = "https://www.hikar.org/fm/ws/bsvr.php?";

  const params = {
    bbox: `${w},${s},${e},${n}`,
    format: "json",
    poi: "all",
  };

  const queryString = Object.keys(params)
    .map((key) => key + "=" + params[key])
    .join("&");

  return API_URL + queryString;
};

const fetchPois = async (bbox) => {
  console.log(buildApiURL(bbox));
  const response = await fetch(buildApiURL(bbox));
  const { features: pois } = await response.json();
  return pois;
};

export default fetchPois;
