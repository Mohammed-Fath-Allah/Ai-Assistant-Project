<?php

namespace App\Entity;

use App\Repository\KnowledgeBaseRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Assistant;

#[ORM\Entity(repositoryClass: KnowledgeBaseRepository::class)]
#[ApiResource]
class KnowledgeBase
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $fileName = null;

    #[ORM\Column(length: 255)]
    private ?string $filePath = null;

    #[ORM\Column(length: 50)]
    private ?string $type = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\ManyToOne(inversedBy: 'knowledgeBases')]
    private ?Assistant $assistant = null;

    public function getId(): ?int { return $this->id; }
    public function getFileName(): ?string { return $this->fileName; }
    public function setFileName(string $fileName): self { $this->fileName = $fileName; return $this; }
    public function getFilePath(): ?string { return $this->filePath; }
    public function setFilePath(string $filePath): self { $this->filePath = $filePath; return $this; }
    public function getType(): ?string { return $this->type; }
    public function setType(string $type): self { $this->type = $type; return $this; }
    public function getCreatedAt(): ?\DateTimeImmutable { return $this->createdAt; }
    public function setCreatedAt(\DateTimeImmutable $createdAt): self { $this->createdAt = $createdAt; return $this; }
    public function getAssistant(): ?Assistant { return $this->assistant; }
    public function setAssistant(?Assistant $assistant): self { $this->assistant = $assistant; return $this; }
}
