<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20250407152225 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE prompt DROP INDEX IDX_62EF6C38E05387EF, ADD UNIQUE INDEX UNIQ_62EF6C38E05387EF (assistant_id)
        SQL);
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql(<<<'SQL'
            ALTER TABLE prompt DROP INDEX UNIQ_62EF6C38E05387EF, ADD INDEX IDX_62EF6C38E05387EF (assistant_id)
        SQL);
    }
}
