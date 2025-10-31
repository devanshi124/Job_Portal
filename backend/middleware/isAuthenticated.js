import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';    

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.cookies.token; // Assuming the token is stored in cookies
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized', success: false });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
      if (err) {
        return res.status(401).json({ message: 'Invalid or Expired Token', success: false });
      }
      req.id = decode.userId; // Attach user data to request object
      next(); // Proceed to the next middleware or route handler
    });
  } catch (error) {
    console.error('Authentication error:', error);
    return res.status(500).json({ message: 'Internal server error', success: false });
  }
}
export default isAuthenticated;