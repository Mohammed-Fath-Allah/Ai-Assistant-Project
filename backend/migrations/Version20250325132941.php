<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250325132941 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE assistant_tool (id INT AUTO_INCREMENT NOT NULL, assistant_id INT DEFAULT NULL, tool_id INT DEFAULT NULL, INDEX IDX_E3A431B4E05387EF (assistant_id), INDEX IDX_E3A431B48F7B22CC (tool_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE assistants (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL, embed_type VARCHAR(255) NOT NULL, INDEX IDX_EA18B435A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE knowledge_base (id INT AUTO_INCREMENT NOT NULL, assistant_id INT DEFAULT NULL, file_name VARCHAR(255) NOT NULL, file_path VARCHAR(255) NOT NULL, type VARCHAR(50) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_AF81B455E05387EF (assistant_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE tool (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, email VARCHAR(180) NOT NULL, api_token VARCHAR(255) DEFAULT NULL, roles JSON NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE messenger_messages (id BIGINT AUTO_INCREMENT NOT NULL, body LONGTEXT NOT NULL, headers LONGTEXT NOT NULL, queue_name VARCHAR(190) NOT NULL, created_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', available_at DATETIME NOT NULL COMMENT \'(DC2Type:datetime_immutable)\', delivered_at DATETIME DEFAULT NULL COMMENT \'(DC2Type:datetime_immutable)\', INDEX IDX_75EA56E0FB7336F0 (queue_name), INDEX IDX_75EA56E0E3BD61CE (available_at), INDEX IDX_75EA56E016BA31DB (delivered_at), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE assistant_tool ADD CONSTRAINT FK_E3A431B4E05387EF FOREIGN KEY (assistant_id) REFERENCES assistants (id)');
        $this->addSql('ALTER TABLE assistant_tool ADD CONSTRAINT FK_E3A431B48F7B22CC FOREIGN KEY (tool_id) REFERENCES tool (id)');
        $this->addSql('ALTER TABLE assistants ADD CONSTRAINT FK_EA18B435A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE knowledge_base ADD CONSTRAINT FK_AF81B455E05387EF FOREIGN KEY (assistant_id) REFERENCES assistants (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE assistant_tool DROP FOREIGN KEY FK_E3A431B4E05387EF');
        $this->addSql('ALTER TABLE assistant_tool DROP FOREIGN KEY FK_E3A431B48F7B22CC');
        $this->addSql('ALTER TABLE assistants DROP FOREIGN KEY FK_EA18B435A76ED395');
        $this->addSql('ALTER TABLE knowledge_base DROP FOREIGN KEY FK_AF81B455E05387EF');
        $this->addSql('DROP TABLE assistant_tool');
        $this->addSql('DROP TABLE assistants');
        $this->addSql('DROP TABLE knowledge_base');
        $this->addSql('DROP TABLE tool');
        $this->addSql('DROP TABLE user');
        $this->addSql('DROP TABLE messenger_messages');
    }
}
