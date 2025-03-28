const { PrismaClient } = require("../../generated/prisma");
const bcrypt = require("bcrypt");
const { StatusCodes } = require("http-status-codes");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient;


const registerUser = async (req, res) => {
  try {
    const { nom, prenom, adresse, email, password } = req.body;
    if (!nom || !prenom || !adresse || !email || !password) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        code: StatusCodes.BAD_REQUEST,
        message: "Veuillez remplir tous les champs",
        token: null,
      });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        nom,
        prenom,
        adresse,
        email,
        password: hashedPassword,
      },
    });

    if (user) {
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
        expiresIn: "1h",
      });
      return res.status(StatusCodes.ACCEPTED).json({
        code: StatusCodes.ACCEPTED,
        message: "Utilisateur créé avec succès",
        token: token,
      });
    }
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Erreur lors de la création de l'utilisateur",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      code: StatusCodes.BAD_REQUEST,
      message: "Veuillez remplir tous les champs",
      token: null,
    });
  }

  try {
    // Fetch the user from the database
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    // If user not found, return an error
    if (!user) {
      return res.status(StatusCodes.NOT_FOUND).json({
        code: StatusCodes.NOT_FOUND,
        message: "Utilisateur non trouvé",
        token: null,
      });
    }

    // Check if the provided password matches the stored hash
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(StatusCodes.UNAUTHORIZED).json({
        code: StatusCodes.UNAUTHORIZED,
        message: "Mot de passe incorrect",
        token: null,
      });
    }

    // Create a JWT token if the password is valid
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    return res.status(StatusCodes.OK).json({
      code: StatusCodes.OK,
      message: "Connexion réussie",
      token: token,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      code: StatusCodes.INTERNAL_SERVER_ERROR,
      message: "Erreur lors de la connexion",
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
