import moment from 'moment';

export function getRedditDetails(links) {
  const reddit = Object.keys(links).filter(i => i.includes('reddit'));
  for(let item of reddit) {
    if(links[item] !== null) {
      return true;
    }
  }
  return false;
}

export function getReused(obj) {
  return Object.values(obj).every(i => i === false) ? false : true;
}

export function getMappedData(data) {
  return data.map(item => {
    const { 
      flight_number,
      details,
      launch_date_utc,
      rocket,
      links,
      reuse
    } = item;
    return {
      badge: links.mission_patch,
      article_link: links.article_link,
      with_reddit: getRedditDetails(links),
      id: flight_number,
      details,
      launch_date: moment(launch_date_utc).format('L'),
      rocket,
      land_success: rocket.first_stage.cores[0].land_success,
      reusedItems: getReused(reuse)
    };
  });
}