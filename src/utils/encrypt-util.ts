import bcrypt from "bcrypt";

export const encrypt = async (password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string | null
): Promise<boolean> => {
  if (!hashedPassword) {
    return false;
  }

  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};
