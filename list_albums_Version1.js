// Si tu es en Node.js >= 18, fetch est déjà global
// Sinon, décommente la ligne suivante et installe node-fetch : npm install node-fetch
// import fetch from 'node-fetch';

const TOKEN = 'ya29.a0AW4XtxiKGixo-hjpi0fjzxwT8kTpVxtHcMHUYXGDbnWU83oUQrBYmOcF3BKKsEGGn1voc7Bp0dsCzVdm8IF0D-N4iVv5yF7eDoa12hUL25kilXjMDCtTlbJnjsjyr7x_uoP0Lu6ckDi7NFabPg83XWKYz7MuHWnh4uxsmTWhaCgYKAW4SARQSFQHGX2Mi5nsQZs4KUOUy__qB7Pu06g0175';

async function getAllAlbums() {
  let albums = [];
  let pageToken = null;

  do {
    let url = "https://photoslibrary.googleapis.com/v1/albums?pageSize=50";
    if (pageToken) url += "&pageToken=" + pageToken;
    const response = await fetch(url, {
      headers: {
        Authorization: "Bearer " + TOKEN
      }
    });
    const data = await response.json();
    albums = albums.concat(data.albums || []);
    pageToken = data.nextPageToken;
    console.log(`Récupéré ${albums.length} albums...`);
  } while (pageToken);

  return albums;
}

getAllAlbums().then(albums => {
  console.log(`\nNombre total d'albums : ${albums.length}\n`);
  albums.forEach(a => {
    const nbPhotos = a.mediaItemsCount || "0";
    const id = a.id || "";
    console.log(`Titre : ${a.title}\n  Photos : ${nbPhotos}\n  ID : ${id}\n`);
  });
}).catch(console.error);