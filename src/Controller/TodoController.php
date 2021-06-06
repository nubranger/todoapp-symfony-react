<?php

namespace App\Controller;

use App\Entity\Todo;
use App\Repository\TodoRepository;
use Doctrine\ORM\EntityManagerInterface;
use Exception;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\IsGranted;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;

class TodoController extends AbstractController
{
    private $entityManager;
    private $todoRepository;
    private $serializer;

    public function __construct(SerializerInterface $serializer, EntityManagerInterface $entityManager, TodoRepository $todoRepository)
    {
        $this->entityManager = $entityManager;
        $this->todoRepository = $todoRepository;
        $this->serializer = $serializer;
    }

    /**
     * @Route("/todolist", name="todo_list", methods={"GET"})
     */
    public function read(): JsonResponse
    {
        try {
            $todos = $this->todoRepository->findAll();
            return $this->json($todos, 200);

        } catch (Exception $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * @Route("/create", name="todo_create", methods={"POST"})
     * @IsGranted("ROLE_ADMIN")
     */
    public function create(Request $request): JsonResponse
    {
        $data = $request->getContent();
        try {
            $todo = $this->serializer->deserialize($data, Todo::class, "json");
            $this->entityManager->persist($todo);
            $this->entityManager->flush();
            return $this->json($todo, 201);
        } catch (Exception $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * @Route("/delete/{id}", name="todo_delete", methods={"DELETE"})
     * @IsGranted("ROLE_ADMIN")
     */
    public function delete($id): JsonResponse
    {
        try {
            $todo = $this->entityManager->getRepository(Todo::class)->find($id);

            if (!$todo) {
                return $this->json([
                    'status' => 400,
                    'message' => "Can't find id $id"
                ], 400);
            }

            $this->entityManager->remove($todo);
            $this->entityManager->flush();
            return $this->json($todo, 202);

        } catch (Exception $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

    /**
     * @Route("/edit/{id}", name="todo_edit", methods={"PUT"})
     * @IsGranted("ROLE_ADMIN")
     */
    public function edit($id, Request $request): JsonResponse
    {

        try {
            $todo = $this->entityManager->getRepository(Todo::class)->find($id);

            if (!$todo) {
                return $this->json([
                    'status' => 400,
                    'message' => "Can't find id $id"
                ], 400);
            }

            $data = json_decode($request->getContent(), true);

            $todo->setTask($data['task']);
            $todo->setDescription($data['description']);

            $this->entityManager->persist($todo);
            $this->entityManager->flush();
            return $this->json($todo, 204);

        } catch (Exception $e) {
            return $this->json([
                'status' => 400,
                'message' => $e->getMessage()
            ], 400);
        }
    }

}


