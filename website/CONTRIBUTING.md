# Contributing to MOSAIC

Thank you for your interest in contributing! We welcome contributions from everyone.

## 📋 How to Contribute

### Reporting Bugs

If you find a bug, please open an issue with:
- A clear, descriptive title
- Steps to reproduce the issue
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Your environment (browser, OS, etc.)

### Suggesting Features

We welcome feature suggestions! Please open an issue with:
- A clear description of the feature
- Use cases and benefits
- Any implementation ideas you have

### Adding Projects

To add a new open-source project to the catalog:

1. Fork the repository
2. Edit `src/data/software.json` and add your project entry
3. Ensure all required fields are filled
4. Test locally with `npm run dev`
5. Submit a pull request

**Required fields:**
- `name`: Project name
- `description`: Brief description
- `url`: Project URL
- `platform`: Platform (github, gitlab, huggingface, etc.)
- `type`: Type (library, model, dataset, tool, etc.)
- `domain`: Research domain
- `tags`: Array of relevant tags
- `status`: "active" or "archived"
- `created_at`: Creation date (YYYY-MM-DD)

### Code Contributions

1. **Fork** the repository
2. **Clone** your fork: `git clone https://github.com/YOUR_USERNAME/mosaic-website.git`
3. **Create a branch**: `git checkout -b feature/your-feature-name`
4. **Make your changes**
5. **Test** your changes: `npm run dev` and `npm run build`
6. **Commit**: `git commit -m 'Add some feature'`
7. **Push**: `git push origin feature/your-feature-name`
8. **Submit a Pull Request**

## 💻 Development Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Coding Standards

- Use Vue 3 Composition API
- Follow existing code style and structure
- Add comments for complex logic
- Keep components small and focused
- Use Tailwind CSS for styling
- Ensure responsive design

## 🧪 Testing

Before submitting a PR:
- Test your changes locally
- Verify responsive design on mobile/tablet/desktop
- Check browser console for errors
- Test all navigation and links

## 📄 Commit Messages

Write clear, descriptive commit messages:
- Use present tense ("Add feature" not "Added feature")
- Be concise but descriptive
- Reference issues when applicable

Examples:
- `Add new filtering feature to catalog`
- `Fix mobile navigation bug #123`
- `Update README with deployment instructions`

## 🤝 Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help maintain a positive environment

## 📧 Questions?

If you have questions, feel free to:
- Open an issue
- Join our Discord community
- Contact the maintainers

Thank you for contributing! 🎉
