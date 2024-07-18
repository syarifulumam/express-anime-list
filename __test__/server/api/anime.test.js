const Request = require('supertest');

const TestHelper = require('../../../server/helpers/TestHelper');
const GeneralHelper = require('../../../server/helpers/GeneralHelper');
const anime = require('../../../server/api/anime');

let server;
describe('Anime', () => {
  beforeAll(() => {
    server = TestHelper.createTestServer('/api/v1/anime', anime);
  });

  afterAll(async () => {
    await server.close();
  });

  describe('Get All Anime', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500, when get error', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });

      const response = await Request(server).get('/api/v1/anime/list');
      expect(response.status).toBe(500);
    });
    test('should return 200', async () => {
      const response = await Request(server).get('/api/v1/anime/list');
      expect(response.status).toBe(200);
    });
  });

  describe('Get Anime By Id', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });
      const response = await Request(server).get('/api/v1/anime/detail//19902');
      expect(response.status).toBe(500);
    });
    test('should return 200', async () => {
      const response = await Request(server).get('/api/v1/anime/detail/19902');
      expect(response.status).toBe(200);
    });
    test('should return 404', async () => {
      const response = await Request(server).get('/api/v1/anime/detail/999999');
      expect(response.status).toBe(404);
    });
    test('should return 404', async () => {
      const response = await Request(server).get('/api/v1/anime/detail/aaa');
      expect(response.status).toBe(400);
    });
  });

  describe('Filter Anime By Genre and Status', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });
      const response = await Request(server)
        .post('/api/v1/anime/filter')
        .send({ genre: 'shounen', status: 'FINISHED' });
      expect(response.status).toBe(500);
    });
    test('should return 200', async () => {
      const response = await Request(server)
        .post('/api/v1/anime/filter')
        .send({ genre: 'shounen', status: 'FINISHED' });
      expect(response.status).toBe(200);
    });
    test('should return 400 for empty genre', async () => {
      const response = await Request(server).post('/api/v1/anime/filter').send({ genre: '', status: 'FINISHED' });
      expect(response.status).toBe(400);
    });
    test('should return 400 for invalid genre type', async () => {
      const response = await Request(server).post('/api/v1/anime/filter').send({ genre: 1, status: 'FINISHED' });
      expect(response.status).toBe(400);
    });
    test('should return 400 for invalid status value', async () => {
      const response = await Request(server).post('/api/v1/anime/filter').send({ genre: 'shounen', status: 'abc' });
      expect(response.status).toBe(400);
    });
  });

  describe('Get Anime By Type', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });
      const response = await Request(server).get('/api/v1/anime/type?nameType=UNKNOWN');
      expect(response.status).toBe(500);
    });
    test('should return 200', async () => {
      const response = await Request(server).get('/api/v1/anime/type?nameType=UNKNOWN');
      expect(response.status).toBe(200);
    });
    test('should return 404 for invalid type', async () => {
      const response = await Request(server).get('/api/v1/anime/type?nameType=abc');
      expect(response.status).toBe(404);
    });
    test('should return 400 for empty type', async () => {
      const response = await Request(server).get('/api/v1/anime/type?nameType=');
      expect(response.status).toBe(400);
    });
  });

  describe('Search Episode Anime', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });
    test('should return 500', async () => {
      const mockError = new Error('An internal server error occurred');
      jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
        throw mockError;
      });
      const response = await Request(server).get('/api/v1/anime/episode').send({ title: 'Naruto', episode: 220 });
      expect(response.status).toBe(500);
    });
    test('should return 200', async () => {
      const response = await Request(server).get('/api/v1/anime/episode').send({ title: 'Naruto', episode: 220 });
      expect(response.status).toBe(200);
    });
    test('should return 400 for empty title', async () => {
      const response = await Request(server).get('/api/v1/anime/episode').send({ title: '', episode: 220 });
      expect(response.status).toBe(400);
    });
    test('should return 400 for invalid episode', async () => {
      const response = await Request(server).get('/api/v1/anime/episode').send({ title: 'Naruto', episode: 'abc' });
      expect(response.status).toBe(400);
    });
    test('should return 404 for title not found', async () => {
      const response = await Request(server).get('/api/v1/anime/episode').send({ title: 'abc', episode: 220 });
      expect(response.status).toBe(404);
    });
  });

  // describe('Search Anime', () => {
  //   beforeEach(() => {
  //     jest.clearAllMocks();
  //   });
  //   test('should return 500', async () => {
  //     const mockError = new Error('An internal server error occurred');
  //     jest.spyOn(GeneralHelper, 'readLargeFile').mockImplementationOnce(() => {
  //       throw mockError;
  //     });
  //     const response = await Request(server).post('/api/v1/anime/search').send({ name: 'Naruto' });
  //     expect(response.status).toBe(500);
  //   });

  //   test('should return 400', async () => {
  //     const response = await Request(server).post('/api/v1/anime/search').send({ movie: 'Naruto' });
  //     expect(response.status).toBe(400);
  //   });

  //   test('should return 404, anime not found', async () => {
  //     const response = await Request(server).post('/api/v1/anime/search').send({ name: 'Ashiap Man' });
  //     expect(response.status).toBe(404);
  //   });

  //   test('should return 200', async () => {
  //     const response = await Request(server).post('/api/v1/anime/search').send({ name: 'Naruto' });
  //     expect(response.status).toBe(200);
  //   });
  // });
});
