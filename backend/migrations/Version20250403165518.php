<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250403165518 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE prompt (id INT AUTO_INCREMENT NOT NULL, assistant_id INT NOT NULL, user_message LONGTEXT NOT NULL, assistant_response LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL, INDEX IDX_62EF6C38E05387EF (assistant_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE prompt ADD CONSTRAINT FK_62EF6C38E05387EF FOREIGN KEY (assistant_id) REFERENCES assistants (id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE prompt DROP FOREIGN KEY FK_62EF6C38E05387EF
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE prompt
        SQL);
    }
}
