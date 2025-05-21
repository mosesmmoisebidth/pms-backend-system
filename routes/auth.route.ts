import { Router } from "express";
import { validationMiddleware } from "../middleware/validator.middleware";
import { EmailDto, LoginDto, RegisterDto, ResetPasswordDto, VerifyEmailDto } from "../dtos/auth.dto";
import AuthController from "../controllers/auth.controller";
const router = Router();
/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Log in user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginDto'
 *     responses:
 *       200:
 *         description: Successful login
 */
router.post("/login", [validationMiddleware(LoginDto)], AuthController.login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterDto'
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post("/register", [validationMiddleware(RegisterDto)], AuthController.registerUser);

/**
 * @swagger
 * /auth/send-reset-password-email:
 *   post:
 *     summary: Send password reset email
 *     tags: [Auth]
 */
router.post("/send-reset-password-email", [validationMiddleware(EmailDto)], AuthController.requestPasswordReset);

/**
 * @swagger
 * /auth/reset-password/{token}:
 *   post:
 *     summary: Reset user password
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPasswordDto'
 */
router.post("/reset-password/:token", [validationMiddleware(ResetPasswordDto)], AuthController.resetPassword);

/**
 * @swagger
 * /auth/verify-email/{token}:
 *   post:
 *     summary: Verify email
 *     tags: [Auth]
 */
router.post("/verify-email/:token", [validationMiddleware(VerifyEmailDto)], AuthController.verifyEmail);

/**
 * @swagger
 * /auth/send-verification-email:
 *   post:
 *     summary: Send email verification link
 *     tags: [Auth]
 */
router.post("/send-verification-email", [validationMiddleware(EmailDto)], AuthController.sendVerificationEmail);

export default router;