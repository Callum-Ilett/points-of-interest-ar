import { getLocation, setCurrentLocation } from "./assets/js/location.js";
import fetchPois from "./assets/js/api.js";
import renderPois from "./assets/js/render.js";

window.onload = async () => {
  if (navigator.serviceWorker) {
    navigator.serviceWorker.register("sw.js");
  }

  const [latitude, longitude] = await getLocation();
  setCurrentLocation(latitude, longitude);

  // const bbox = {
  //   n: (latitude + 0.01).toFixed(2),
  //   e: (longitude + 0.01).toFixed(2),
  //   s: latitude.toFixed(2),
  //   w: longitude.toFixed(2),
  // };

  const bbox = {
    n: parseFloat((latitude + 0.01).toFixed(2)),
    e: parseFloat((longitude + 0.01).toFixed(2)),
    s: parseFloat(latitude.toFixed(2)),
    w: parseFloat(longitude.toFixed(2)),
  };

  // const bbox = {
  //   n: parseFloat((50.90576).toFixed(2)),
  //   e: parseFloat(-(1.40056).toFixed(2)),
  //   s: parseFloat((50.90154).toFixed(2)),
  //   w: parseFloat(-(1.41226).toFixed(2)),
  // };

  const pois = fetchPois(bbox);

  pois.then((data) => renderPois(data));
};
