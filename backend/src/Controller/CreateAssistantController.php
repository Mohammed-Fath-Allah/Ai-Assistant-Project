<?php
namespace App\Controller;

use App\Entity\Assistant;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

class CreateAssistantController extends AbstractController
{
    private $em;

    public function __construct(EntityManagerInterface $em)
    {
        $this->em = $em;
    }

    #[Route('/api/assistants', name: 'create_assistant', methods: ['POST'])]
    public function createAssistant(Request $request): Response
    {
        $data = json_decode($request->getContent(), true);

        $assistant = new Assistant();
        $assistant->setName($data['name']);
        $assistant->setDescription($data['description']);
        $assistant->setEmbedType($data['personality']);
        $assistant->setCreatedAt(new \DateTime());
        // Associate the assistant with the currently logged-in user
        $assistant->setUser($this->getUser());

        // Process file uploads
        foreach ($data['knowledgeSources'] as $file) {
            $knowledgeBase = new KnowledgeBase();
            $knowledgeBase->setFile($file);  // Assuming KnowledgeBase has a file field
            $assistant->addKnowledgeBase($knowledgeBase);
        }

        $this->em->persist($assistant);
        $this->em->flush();

        return $this->json($assistant, 201);
    }
}
