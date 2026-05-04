import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const body = req.body || {};
  const token = body.token || req.headers.authorization || '';

  if (token) {
    try {
      const cleanToken = token.startsWith('Bearer ') ? token.split(' ')[1] : token;
      const decoded = jwt.verify(cleanToken, process.env.JWT_SECRET);
      req.user = decoded;
    } catch (err) {
      console.error('Invalid token', err);
    }
  }

  next();
};

// Function to sign a JWT for a user
export const signToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
};

// Error class for unauthorized access
export class AuthenticationError extends Error {
  constructor(message = 'Not authenticated') {
    super(message);
    this.name = 'AuthenticationError';
  }
}