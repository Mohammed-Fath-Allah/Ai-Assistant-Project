<?php

namespace App\Entity;

use App\Repository\AssistantToolRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Assistant;

#[ORM\Entity(repositoryClass: AssistantToolRepository::class)]
#[ApiResource]
class AssistantTool
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'assistantTools')]
    private ?Assistant $assistant = null;

    #[ORM\ManyToOne(inversedBy: 'assistantTools')]
    private ?Tool $tool = null;

    public function getId(): ?int { return $this->id; }
    public function getAssistant(): ?Assistant { return $this->assistant; }
    public function setAssistant(?Assistant $assistant): self { $this->assistant = $assistant; return $this; }
    public function getTool(): ?Tool { return $this->tool; }
    public function setTool(?Tool $tool): self { $this->tool = $tool; return $this; }
}
