# In-Memory Console App (Phase 1)

This project implements a simple To-Do list application that operates entirely in memory, without any external database or persistent storage. It demonstrates basic CRUD (Create, Read, Update, Delete) operations through a command-line interface (CLI).

## Phase 1 Status: Successfully Completed

All core functionalities for the in-memory console application have been implemented and are ready for use.

## How to Run

To run the application, navigate to the project's root directory in your terminal and execute the following command:

```bash
python main.py
```

This will start the To-Do list CLI, allowing you to add, view, complete, and delete tasks.

## Project Structure

- `src/models.py`: Defines the `Task` data structure.
- `src/services.py`: Contains the in-memory business logic for task management.
- `src/cli.py`: Implements the command-line interface for user interaction.
- `main.py`: The entry point of the application.
- `tests/test_services.py`: Unit tests for the `TaskService`.
- `CONSTITUTION.md`: Outlines the project's core principles and conventions.
- `CLAUDE.md`: Placeholder for AI integration context.
