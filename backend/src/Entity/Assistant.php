<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use App\Entity\User;
use App\Entity\KnowledgeBase;
use App\Entity\AssistantTool;
use App\Entity\Prompt;
use App\Repository\AssistantRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Table(name: "assistants")]
#[ORM\Entity(repositoryClass: AssistantRepository::class)]
#[ApiResource(
    security: "is_granted('ROLE_USER')",
    operations: [
        new Get(),
        new GetCollection(),
        new Post(security: "is_granted('ROLE_USER')"),
        new Put(security: "object.getUser() == user"),
        new Delete(security: "object.getUser() == user")
    ],
    // securityPostDenormalize: "object.getUser() == user",
    normalizationContext: ['groups' => ['assistant:read']],
    denormalizationContext: ['groups' => ['assistant:write']]
)]
class Assistant
{   
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column(type: "integer")]
    private ?int $id = null;

    #[ORM\Column(type: "string", length: 255)]
    #[Groups(['assistant:read', 'assistant:write'])]
    private string $name;

    #[ORM\Column(type: "text" , nullable: true)]
    #[Groups(['assistant:read', 'assistant:write'])]
    private ?string $description = null;

    #[ORM\Column(type: "datetime", nullable: false)]
    private \DateTimeInterface $createdAt;

    #[ORM\Column(length: 255)]
    #[Groups(['assistant:read', 'assistant:write'])]
    private ?string $embedType = null;

    #[ORM\ManyToOne(targetEntity: User::class, inversedBy: "assistants")]
    #[ORM\JoinColumn(nullable: false, onDelete: "CASCADE")]
    private ?User $user = null;

    #[ORM\OneToMany(mappedBy: "assistant", targetEntity: KnowledgeBase::class, cascade: ["persist", "remove"])]
    private Collection $knowledgeBases;

    #[ORM\OneToMany(mappedBy: 'assistant', targetEntity: AssistantTool::class, cascade: ['persist', 'remove'])]
    #[Groups(['assistant:read', 'assistant:write'])]
    private Collection $assistantTools;

    #[ORM\OneToOne(mappedBy: 'assistant', targetEntity: Prompt::class, cascade: ['persist', 'remove'])]
    #[Groups(['assistant:read', 'assistant:write'])]
    private ?Prompt $prompt = null;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->knowledgeBases = new ArrayCollection();
        $this->assistantTools = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }
    
    public function getName(): string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }
    
    public function setDescription(?string $description): self
    {
        $this->description = $description;
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

    public function getEmbedType(): ?string
    {
        return $this->embedType;
    }

    public function setEmbedType(string $embedType): self
    {
        $this->embedType = $embedType;
        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;
        return $this;
    }

    public function getPrompt(): ?Prompt
    {
        return $this->prompt;
    }

    public function setPrompt(?Prompt $prompt): self
    {
        $this->prompt = $prompt;

        if ($prompt !== null && $prompt->getAssistant() !== $this) {
            $prompt->setAssistant($this);
        }

        return $this;
    }

    #[Groups(['assistant:read'])]
    public function getTools(): array
    {
        return $this->assistantTools->map(fn($at) => $at->getTool())->toArray();
    }

    public function getKnowledgeBases(): Collection
    {
        return $this->knowledgeBases;
    }

    public function addKnowledgeBase(KnowledgeBase $knowledgeBase): self
    {
        if (!$this->knowledgeBases->contains($knowledgeBase)) {
            $this->knowledgeBases[] = $knowledgeBase;
            $knowledgeBase->setAssistant($this);
        }
        return $this;
    }

    public function removeKnowledgeBase(KnowledgeBase $knowledgeBase): self
    {
        if ($this->knowledgeBases->contains($knowledgeBase) and $knowledgeBase->getAssistant() === $this) 
            {   
                $this->knowledgeBases->removeElement($knowledgeBase);
                $knowledgeBase->setAssistant(null);
            }
        return $this;
    }

    public function getAssistantTools(): Collection
    {
        return $this->assistantTools;
    }

    public function addAssistantTool(AssistantTool $assistantTool): self
    {
        if (!$this->assistantTools->contains($assistantTool)) {
            $this->assistantTools[] = $assistantTool;
            $assistantTool->setAssistant($this);
        }
        return $this;
    }

    public function removeAssistantTool(AssistantTool $assistantTool): self
    {
        if ($this->assistantTools->removeElement($assistantTool)) {
            if ($assistantTool->getAssistant() === $this) {
                $assistantTool->setAssistant(null);
            }
        }
        return $this;
    }
    
}
