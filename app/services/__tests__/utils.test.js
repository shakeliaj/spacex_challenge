import {
  getMappedData,
  getRedditDetails,
  getReused
} from '../utils';

describe('getMappedData', () => {
  test('returns mapped data for each launch', () => {
    const data = [{
      flight_number: 1,
      details: 'details',
      launch_date_utc: '2006-03-24T22:30:00.000Z',
      reuse: { item1: false, item2: true },
      links: {
        mission_patch: 'mission_patch',
        article_link: 'article_link',
        redditWeb: 'redditWeb',
        redditLink: 'redditLink'
      },
      rocket: {
        first_stage: {
          cores: [{ land_success: null }]
        }
      }
    }];
    expect(getMappedData(data)).toEqual([
      {
        article_link: 'article_link', 
        badge: 'mission_patch', 
        details: 'details', 
        id: 1, 
        land_success: null, 
        launch_date: '03/24/2006',  
        reusedItems: true, 
        rocket: {
          first_stage: {
            cores: [{
              land_success: null
            }]
          }
        }, 
        with_reddit: true
      }
    ]);
  });
});

describe('getRedditDetails', () => {
  test('return TRUE boolean value for existing reddit links', () => {
    const links = {
      redditWeb: 'redditWeb',
      redditLink: 'redditLink'
    };
    expect(getRedditDetails(links)).toEqual(true);
  });

  test('returns FALSE boolean value for non-existent reddit links', () => {
    const links = {
      redditWeb: null,
      redditLink: null
    };
    expect(getRedditDetails(links)).toEqual(false);
  });
});

describe('getReused', () => {
  test('returns TRUE boolean value for reused items', () => {
    const reuse = {
      item1: true,
      item2: false
    };
    expect(getReused(reuse)).toEqual(true);
  });

  test('returns FALSE boolean value for reused items', () => {
    const reuse = {
      item1: false,
      item2: false
    };
    expect(getReused(reuse)).toEqual(false);
  });
});

