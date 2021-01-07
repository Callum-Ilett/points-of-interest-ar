const scene = document.querySelector("a-scene");

const renderPois = (pois) => {
  pois.forEach((poi) => {
    const { name, amenity, website } = poi.properties || {};
    const [longitude, latitude, z] = poi.geometry.coordinates;

    if (name && amenity) {
      renderLink(name, website, latitude, longitude);
      renderModel(amenity, latitude, longitude);
    }
  });
};

const renderModel = (amenity, latitude, longitude) => {
  const model = document.createElement("a-image");

  let modelSrc;

  if (amenity === "restaurant") {
    modelSrc = "assets/images/restaurant-icon.png";
  } else if (amenity === "cafe") {
    modelSrc = "assets/images/coffee-icon.png";
  } else {
    modelSrc = "assets/images/beer-icon.png";
  }

  const modelAttributes = {
    "gps-entity-place": `latitude: ${latitude}; longitude: ${longitude};`,
    src: modelSrc,
    "look-at": "[gps-camera]",
    scale: "8 8 8",
  };

  setEntityAttributes(model, modelAttributes);

  scene.appendChild(model);
};

const renderLink = (name, website, latitude, longitude) => {
  const link = document.createElement("a-link");

  const linkAttributes = {
    "gps-entity-place": `latitude: ${latitude}; longitude: ${longitude}`,
    title: name,
    href: website,
    scale: "8 8 8",
  };

  setEntityAttributes(link, linkAttributes);
  scene.appendChild(link);
};

const setEntityAttributes = (entity, attributes) => {
  Object.keys(attributes).forEach((key) =>
    entity.setAttribute(key, attributes[key])
  );
};

export default renderPois;
