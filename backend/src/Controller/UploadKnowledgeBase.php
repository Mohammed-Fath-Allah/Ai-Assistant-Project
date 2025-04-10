<?php
namespace App\Controller;

use App\Entity\Assistant;
use App\Entity\KnowledgeBase;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpKernel\Attribute\AsController;
// use Symfony\Component\Security\Core\Security;
// use Symfony\Component\DependencyInjection\Attribute\Autowire;

#[AsController]
class UploadKnowledgeBase
{
    public function __invoke(Request $request, EntityManagerInterface $em): JsonResponse
    {   
        $file = $request->files->get('file');
        $fileName = $request->request->get('filename');
        $assistantIri = $request->request->get('assistant');

        if (!$file || !$fileName || !$assistantIri) {
            return new JsonResponse(['error' => 'Missing data'], 400);
        }

        $assistantId = basename($assistantIri);
        $assistant = $em->getRepository(Assistant::class)->find($assistantId);

        if (!$assistant) {
            return new JsonResponse(['error' => 'Invalid assistant'], 400);
        }

        $kb = new KnowledgeBase();
        $kb->setFile($file);
        $kb->setFileName($fileName);
        $kb->setAssistant($assistant);
        $kb->setCreatedAt(new \DateTimeImmutable());

        $em->persist($kb);
        $em->flush();
        return new JsonResponse(['message' => 'File uploaded successfully', 'fileName' => $kb->getFileName()]);
    }
}

