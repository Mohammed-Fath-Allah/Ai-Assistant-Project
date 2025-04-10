<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250410110931 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            CREATE TABLE assistant_tool (id INT AUTO_INCREMENT NOT NULL, assistant_id INT NOT NULL, tool_id INT NOT NULL, INDEX IDX_E3A431B4E05387EF (assistant_id), INDEX IDX_E3A431B48F7B22CC (tool_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE assistants (id INT AUTO_INCREMENT NOT NULL, user_id INT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT DEFAULT NULL, created_at DATETIME NOT NULL, embed_type VARCHAR(255) NOT NULL, INDEX IDX_EA18B435A76ED395 (user_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE knowledge_base (id INT AUTO_INCREMENT NOT NULL, assistant_id INT DEFAULT NULL, created_at DATETIME DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)', file_name VARCHAR(255) DEFAULT NULL, updated_at DATETIME DEFAULT NULL COMMENT '(DC2Type:datetime_immutable)', INDEX IDX_AF81B455E05387EF (assistant_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE tool (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, description LONGTEXT NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(100) NOT NULL, email VARCHAR(180) NOT NULL, api_token VARCHAR(255) DEFAULT NULL, roles JSON NOT NULL, password VARCHAR(255) NOT NULL, created_at DATETIME DEFAULT NULL, UNIQUE INDEX UNIQ_8D93D6495E237E06 (name), UNIQUE INDEX UNIQ_8D93D649E7927C74 (email), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE assistant_tool ADD CONSTRAINT FK_E3A431B4E05387EF FOREIGN KEY (assistant_id) REFERENCES assistants (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE assistant_tool ADD CONSTRAINT FK_E3A431B48F7B22CC FOREIGN KEY (tool_id) REFERENCES tool (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE assistants ADD CONSTRAINT FK_EA18B435A76ED395 FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE knowledge_base ADD CONSTRAINT FK_AF81B455E05387EF FOREIGN KEY (assistant_id) REFERENCES assistants (id)
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE prompt DROP INDEX IDX_62EF6C38E05387EF, ADD UNIQUE INDEX UNIQ_62EF6C38E05387EF (assistant_id)
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
            ALTER TABLE assistant_tool DROP FOREIGN KEY FK_E3A431B4E05387EF
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE assistant_tool DROP FOREIGN KEY FK_E3A431B48F7B22CC
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE assistants DROP FOREIGN KEY FK_EA18B435A76ED395
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE knowledge_base DROP FOREIGN KEY FK_AF81B455E05387EF
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE assistant_tool
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE assistants
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE knowledge_base
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE tool
        SQL);
        $this->addSql(<<<'SQL'
            DROP TABLE user
        SQL);
        $this->addSql(<<<'SQL'
            ALTER TABLE prompt DROP INDEX UNIQ_62EF6C38E05387EF, ADD INDEX IDX_62EF6C38E05387EF (assistant_id)
        SQL);
    }
}
