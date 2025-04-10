<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;

#[AsController]
class LoginController
{
    #[Route('/api/login', name: 'api_login', methods: ['POST', 'OPTIONS'])]
    public function __invoke(
        Request $request,
        EntityManagerInterface $em,
        UserPasswordHasherInterface $passwordHasher
    ): JsonResponse {
        if ($request->getMethod() === 'OPTIONS') {
            return new JsonResponse([], 204);
        }

        $data = json_decode($request->getContent(), true);

        // Basic email & password check
        if (empty($data['email']) || empty($data['password'])) {
            return new JsonResponse(['error' => 'Email and password are required'], 400);
        }

        $user = $em->getRepository(User::class)->findOneBy(['email' => $data['email']]);

        // Validate credentials
        if (!$user || !$passwordHasher->isPasswordValid($user, $data['password'])) {
            return new JsonResponse(['error' => 'Invalid credentials'], 401);
        }

        // Return basic user info (no token yet)
        $userData = [
            'id' => $user->getId(),
            'name' => $user->getName(),
            'email' => $user->getEmail(),
            'createdAt' => $user->getCreatedAt()->format('Y-m-d H:i:s'),
        ];

        return new JsonResponse(['status' => 'Login successful', 'user' => $userData], 200);
    }
}
