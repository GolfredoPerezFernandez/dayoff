
 function getSiteURL(){
  let url ='http://localhost:3000/';
  url = url.includes('http') ? url : `https://${url}`;
  url = url.endsWith('/') ? url : `${url}/`;
  return url;
}

export const config = {
  site: { name: 'Devias Kit', description: '', themeColor: '#090a0b', url: getSiteURL() },
};
