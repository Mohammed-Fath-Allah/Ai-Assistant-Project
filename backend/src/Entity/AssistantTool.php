<?php

namespace App\Entity;

use App\Repository\AssistantToolRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Delete;
use App\Entity\Assistant;
use Symfony\Component\Serializer\Annotation\Groups;

#[ORM\Entity(repositoryClass: AssistantToolRepository::class)]
#[ApiResource(
    operations: [
        new GetCollection(),
        new Get(security: "object.getAssistant().getUser() == user"),
        new Post(securityPostDenormalize: "object.getAssistant() != null and object.getAssistant().getUser() == user"),
        new Delete(security: "object.getAssistant().getUser() == user"),
    ],
    normalizationContext: ['groups' => ['assistantTool:read']],
    denormalizationContext: ['groups' => ['assistantTool:write']]
)]
class AssistantTool
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(targetEntity: Assistant::class, inversedBy: 'assistantTools')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['assistantTool:read', 'assistantTool:write'])]
    private ?Assistant $assistant = null;

    #[ORM\ManyToOne(targetEntity: Tool::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['assistantTool:read', 'assistantTool:write'])]
    private ?Tool $tool = null;

    public function getId(): ?int { return $this->id; }
    public function getAssistant(): ?Assistant { return $this->assistant; }
    public function setAssistant(?Assistant $assistant): self { $this->assistant = $assistant; return $this; }
    public function getTool(): ?Tool { return $this->tool; }
    public function setTool(?Tool $tool): self { $this->tool = $tool; return $this; }
}
