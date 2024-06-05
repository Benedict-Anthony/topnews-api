import jwt from "jsonwebtoken";

const generateToken = (id: string, email: string) => {
  const token = jwt.sign(
    {
      id,
      email,
    },
    process.env.SECRET_KEY as string,
    {
      expiresIn: "30d",
    }
  );

  return {
    access: token,
  };
};

export { generateToken };
