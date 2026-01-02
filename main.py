import sys
from src.cli import run_cli

def main():
    """Main entry point for the application."""
    try:
        run_cli()
    except KeyboardInterrupt:
        print("\n\nApplication interrupted by user. Exiting.")
        sys.exit(0)

if __name__ == "__main__":
    main()