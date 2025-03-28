const distancematrix = async (body, Key) => {
  const { origins, destinations } = body;  // On extrait les origines et destinations du body

  // Construire l'URL avec les paramètres nécessaires
  const url = new URL('https://maps.googleapis.com/maps/api/distancematrix/json');
  url.searchParams.append('origins', origins);
  url.searchParams.append('destinations', destinations);
  url.searchParams.append('key', Key);

  try {
    const response = await fetch(url, {
      method: 'POST',  // Méthode POST
      headers: {
        'User-Agent': 'undici-stream-example',
        'Content-Type': 'application/json',
      },
      // Corps de la requête (si l'API le permet, sinon, tu peux envoyer la requête sans corps)
      body: JSON.stringify(body),  
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('La réponse est:', data);
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des données:', error);
  }
};
const distancematrixt = async (distance,transport) => {
      // On extrait les origines et destinations du body
    
      const BASE_URL = 'https://impactco2.fr/api/v1/transport';
      
      const urlWithParams = `${BASE_URL}?km=${distance}&transports=${transport}`;
      console.log(`Appel API : ${urlWithParams}`);
      
      
      const response = await fetch(urlWithParams, {
        method: 'GET',  // Utilisez GET sans corps de requête
        headers: {
          'User-Agent': 'undici-stream-example',
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      const data = await response.json();
      console.log('La réponse est:', data);
      return data;
  };
  

module.exports = { distancematrix,distancematrixt };
