<?php

namespace App\Entity;

use ApiPlatform\Core\Annotation\ApiResource;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ApiResource()
 * @ORM\Entity(repositoryClass="App\Repository\GameRepository")
 */
class Game
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $mode;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $nbPlayer;

    /**
     * @ORM\Column(type="integer", nullable=true)
     */
    private $idSequence;

    
    public function getId(): ?int
    {
        return $this->id;
    }

    public function getMode(): ?int
    {
        return $this->mode;
    }

    public function setMode(?int $mode): self
    {
        $this->mode = $mode;

        return $this;
    }

    public function getNbPlayer(): ?int
    {
        return $this->nbPlayer;
    }

    public function setNbPlayer(?int $nbPlayer): self
    {
        $this->nbPlayer = $nbPlayer;

        return $this;
    }

    public function getIdSequence(): ?int
    {
        return $this->idSequence;
    }

    public function setIdSequence(?int $idSequence): self
    {
        $this->idSequence = $idSequence;

        return $this;
    }

}
