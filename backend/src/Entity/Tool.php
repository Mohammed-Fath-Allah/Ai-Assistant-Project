<?php

namespace App\Entity;

use App\Repository\ToolRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Delete;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\Entity\AssistantTool;
use Symfony\Component\Serializer\Annotation\Groups;


#[ORM\Entity(repositoryClass: ToolRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Get(),
        new Post(security: "is_granted('ROLE_USER')"),     
        new Put(security: "is_granted('ROLE_USER')"),
        new Delete(security: "is_granted('ROLE_USER')")
    ],
    normalizationContext: ['groups' => ['tool:read']],
    denormalizationContext: ['groups' => ['tool:write']]
)]
class Tool
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['tool:read', 'tool:write'])]
    private ?string $name = null;

    #[ORM\Column(type: 'text')]
    #[Groups(['tool:read', 'tool:write'])]
    private ?string $description = null;

    #[ORM\OneToMany(mappedBy: 'tool', targetEntity: AssistantTool::class)]
    private Collection $assistantTools;

    public function __construct() { $this->assistantTools = new ArrayCollection(); }
    public function getId(): ?int { return $this->id; }
    public function getName(): ?string { return $this->name; }
    public function setName(string $name): self { $this->name = $name; return $this; }
    public function getDescription(): ?string { return $this->description; }
    public function setDescription(string $description): self { $this->description = $description; return $this; }
    public function getAssistantTools(): Collection { return $this->assistantTools; }
}
