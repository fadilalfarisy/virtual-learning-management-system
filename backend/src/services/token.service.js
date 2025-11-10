import jwt from "jsonwebtoken";

//generate access JWT token contain id and role
const createAccessToken = ({ id, role }) =>
  jwt.sign({ id, role }, process.env.ACCESS_TOKEN, {
    expiresIn: process.env.MAX_AGE_ACCESS_TOKEN,
  });

//generate refresh JWT token contain id and role
const createRefreshToken = ({ id }) =>
  jwt.sign({ id }, process.env.REFRESH_TOKEN, {
    expiresIn: process.env.MAX_AGE_REFRESH_TOKEN,
  });

//verify access JWT token
const verifyAccessToken = (token) => {
  return jwt.verify(token, process.env.ACCESS_TOKEN, (error, decoded) => {
    if (error) return { error, decoded: null };
    return { error: null, decoded };
  });
};

//verify refresh JWT token
const verifyRefreshToken = (token) => {
  return jwt.verify(token, process.env.REFRESH_TOKEN, (error, decoded) => {
    if (error) return { error, decoded: null };
    return { error: null, decoded };
  });
};

export {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
