import bcryptjs from "bcryptjs";

const encrypt = async (passwordPlain) => {
  const hash = await bcryptjs.hash(passwordPlain, 10);

  return hash;
};

const compare = async (passwordPlain, hashPassword) => {
  return await bcryptjs.compare(passwordPlain, hashPassword);
};

export { encrypt, compare };
