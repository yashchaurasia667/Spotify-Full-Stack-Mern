import jwt from "jsonwebtoken";

const ensureAuthenticated = (req, res, next) => {
  const auth = req.headers["authorization"];
  if (!auth)
    return res.status(403).json({ message: "Please Log in to continue" });

  try {
    const decodedData = jwt.verify(auth, process.env.JWT_SECRET);
    req.user = decodedData;
    next();
  } catch (error) {
    return res
      .status(403)
      .json({ message: "Unauthorized, JWT is wrong or expired" });
  }
};
