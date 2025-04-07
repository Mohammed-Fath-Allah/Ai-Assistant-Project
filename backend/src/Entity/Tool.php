<?php

namespace App\Entity;

use App\Repository\ToolRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use App\Entity\AssistantTool;


#[ORM\Entity(repositoryClass: ToolRepository::class)]
#[ApiResource(
    security: "is_granted('ROLE_USER')",
    securityPostDenormalize: "object.getUser() == user"
)]
class Tool
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\Column(type: 'text')]
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
