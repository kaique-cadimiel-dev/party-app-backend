import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import request from 'supertest';
import app from '../app.ts';
import * as userService from '../services/userService.ts';

// Mocking the user service to avoid hitting actual Firebase during tests
vi.mock('../services/userService', () => ({
  createUser: vi.fn(),
  getUserById: vi.fn(),
}));

describe('User API Endpoints', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('POST /api/users', () => {
    it('should create a new user and return 201', async () => {
      const mockUser = { uid: '123', email: 'test@example.com' };
      (userService.createUser as Mock).mockResolvedValue(mockUser);

      const response = await request(app)
        .post('/api/users')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(201);
      expect(response.body.user).toEqual(mockUser);
      expect(userService.createUser).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });

    it('should return 400 if user creation fails', async () => {
      (userService.createUser as Mock).mockRejectedValue(new Error('Firebase error'));

      const response = await request(app)
        .post('/api/users')
        .send({ email: 'test@example.com', password: 'password123' });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Firebase error');
    });
  });

  describe('GET /api/users/:id', () => {
    it('should return user data for a valid ID', async () => {
      const mockUser = { uid: '123', email: 'test@example.com' };
      (userService.getUserById as Mock).mockResolvedValue(mockUser);

      const response = await request(app).get('/api/users/123');

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockUser);
      expect(userService.getUserById).toHaveBeenCalledWith('123');
    });

    it('should return 404 if user is not found', async () => {
      (userService.getUserById as Mock).mockRejectedValue(new Error('User not found'));

      const response = await request(app).get('/api/users/999');

      expect(response.status).toBe(404);
      expect(response.body.error).toBe('User not found');
    });
  });
});
