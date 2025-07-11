# Contributing to tr-file

Thank you for your interest in contributing to tr-file! We welcome contributions from the community.

## How to Contribute

### Reporting Bugs

If you find a bug, please create an issue on GitHub with:
- A clear description of the problem
- Steps to reproduce the issue
- Expected vs actual behavior
- Your environment (OS, Node.js version, etc.)
- Sample JSON files if relevant

### Suggesting Features

We're open to new feature suggestions! Please create an issue with:
- A clear description of the feature
- Use cases and benefits
- Examples of how it would work

### Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Test your changes thoroughly
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/tr-file.git
cd tr-file

# Install dependencies
npm install

# Link for local testing
npm link

# Test the CLI
tr_file --help
```

### Testing

Before submitting a PR, please test:

```bash
# Test basic functionality
tr_file example/en.json es,fr

# Test recursive functionality
tr_file en.json es,fr --recursive

# Test with different file structures
# Test error handling
# Test with large files
```

### Code Style

- Use consistent indentation (2 spaces)
- Follow existing code patterns
- Add comments for complex logic
- Keep functions focused and small

### Commit Messages

Use clear, descriptive commit messages:
- `feat: add recursive translation support`
- `fix: handle empty JSON files gracefully`
- `docs: update README with new examples`
- `refactor: simplify batch translation logic`

## Questions?

If you have questions about contributing, feel free to:
- Open an issue for discussion
- Contact the maintainers

Thank you for helping make tr-file better!
