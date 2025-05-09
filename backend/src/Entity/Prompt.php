<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use App\Repository\PromptRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Entity\Assistant;

#[ORM\Entity(repositoryClass: PromptRepository::class)] 
#[ApiResource(
    operations: [
        new GetCollection(),
        new Get(security: "object.getAssistant() != null and object.getAssistant().getUser() == user"),
        new Post(securityPostDenormalize: "object.getAssistant() != null and object.getAssistant().getUser() == user"),
        new Put(security: "object.getAssistant() != null and object.getAssistant().getUser() == user"),
        new Delete(security: "object.getAssistant() != null and object.getAssistant().getUser() == user"),
    ],
    normalizationContext: ['groups' => ['prompt:read']],
    denormalizationContext: ['groups' => ['prompt:write']]
)]
class Prompt
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: 'integer')]
    #[Groups(['prompt:read', 'assistant:read'])]
    private ?int $id = null;

    #[ORM\Column(type: 'text')]
    #[Groups(['prompt:read', 'prompt:write', 'assistant:read'])]
    private string $userMessage;

    #[ORM\Column(type: 'text', nullable: true)] 
    #[Groups(['prompt:read', 'prompt:write', 'assistant:read'])] 
    private ?string $assistantResponse = null;

    #[ORM\Column(type: 'datetime')]
    #[Groups(['prompt:read', 'assistant:read'])]
    private \DateTimeInterface $createdAt;

    #[ORM\OneToOne(inversedBy: 'prompt', targetEntity: Assistant::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['prompt:read', 'prompt:write'])]
    private ?Assistant $assistant = null;

    
    public function __construct()
    {
        $this->createdAt = new \DateTime(); 
    }


    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUserMessage(): string
    {
        return $this->userMessage;
    }

    public function setUserMessage(string $userMessage): self
    {
        $this->userMessage = $userMessage;

        return $this;
    }

    public function getAssistantResponse(): ?string
    {
        return $this->assistantResponse;
    }

    public function setAssistantResponse(?string $assistantResponse): self
    {
        $this->assistantResponse = $assistantResponse;

        return $this;
    }

    public function getCreatedAt(): \DateTimeInterface
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeInterface $createdAt): self
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getAssistant(): ?Assistant
    {
        return $this->assistant;
    }

    public function setAssistant(?Assistant $assistant): self
    {
        $this->assistant = $assistant;

        return $this;
    }
}
