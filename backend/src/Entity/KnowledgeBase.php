<?php

namespace App\Entity;

use App\Repository\KnowledgeBaseRepository;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiResource;
use App\Entity\Assistant;
use Symfony\Component\HttpFoundation\File\File;
use Vich\UploaderBundle\Mapping\Annotation as Vich;
use Symfony\Component\Validator\Constraints as Assert;
use Symfony\Component\Serializer\Annotation\Groups;
use App\Controller\UploadKnowledgeBase;
use phpDocumentor\Reflection\Types\Nullable;

#[ORM\Entity(repositoryClass: KnowledgeBaseRepository::class)]
#[ApiResource(
    security: "is_granted('ROLE_USER')",
    securityPostDenormalize: "object.getUser() == user",
    normalizationContext: ['groups' => ['knowledge:read']],
    denormalizationContext: ['groups' => ['knowledge:write']],
    input: false,
    operations: [
        new \ApiPlatform\Metadata\Post(
            controller: UploadKnowledgeBase::class,
            name: 'post_knowledge_base_upload'
        )
    ]
)]
#[Vich\Uploadable]
class KnowledgeBase
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['knowledge:read'])]
    private ?int $id = null;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    #[Groups(['knowledge:read'])]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\ManyToOne(inversedBy: 'knowledgeBases')]
    #[Groups(['knowledge:read', 'knowledge:write'])]
    private ?Assistant $assistant = null;

    
    #[Vich\UploadableField(mapping: "knowledge_file", fileNameProperty: "fileName")]
    #[Assert\File(
        maxSize: "10M",
        mimeTypes: ["application/pdf", "text/plain", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "text/csv"]
    )]
    #[Groups(['knowledge:write', 'knowledge:read'])]
    private ?File $file = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['knowledge:read' , 'knowledge:write'])]
    private ?string $fileName = null;

    #[ORM\Column(type: 'datetime_immutable', nullable: true)]
    #[Groups(['knowledge:read'])]
    private ?\DateTimeImmutable $updatedAt = null;

    public function getId(): ?int { return $this->id; }
    public function getFileName(): ?string { return $this->fileName; }
    public function setFileName(string $fileName): self { $this->fileName = $fileName; return $this; }
    public function getCreatedAt(): ?\DateTimeImmutable { return $this->createdAt; }
    public function setCreatedAt(\DateTimeImmutable $createdAt): self { $this->createdAt = $createdAt; return $this; }
    public function getAssistant(): ?Assistant { return $this->assistant; }
    public function setAssistant(?Assistant $assistant): self { $this->assistant = $assistant; return $this; }
    public function setUpdatedAt(?\DateTimeInterface $updatedAt): void{$this->updatedAt = $updatedAt;}
    public function getUpdatedAt(): ?\DateTimeInterface{return $this->updatedAt;}
    public function getFile():?File{return $this->file;}
    public function setFile(?File $file = null): void
        {
            $this->file = $file;
            if ($file) {
                $this->updatedAt = new \DateTimeImmutable();
            }
        }  
}
