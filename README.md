# React WYSIWYG Editor Pro

A powerful, feature-rich WYSIWYG editor for React applications with advanced formatting options, emoji picker, and more.

## Features

- 🎨 **Rich Text Formatting**: Bold, italic, underline, strikethrough, colors, and more
- 📝 **Advanced Typography**: Multiple font families, sizes, and heading styles
- 🎯 **Text Alignment**: Left, center, right, and justify alignment options
- 📋 **Lists & Indentation**: Bulleted lists, numbered lists, and indentation controls
- 😀 **Emoji Picker**: Comprehensive emoji picker with categories and search
- 🎨 **Color Picker**: Text and background color customization with presets
- 🔗 **Link & Image Support**: Easy insertion of links and images
- ↩️ **Undo/Redo**: Full history management with keyboard shortcuts
- 📤 **Import/Export**: Save and load content as HTML files
- 🎛️ **Customizable Toolbar**: Configure which tools to show/hide
- 📱 **Responsive Design**: Works great on desktop and mobile
- ♿ **Accessibility**: Keyboard navigation and screen reader support
- 🎨 **Tailwind CSS**: Styled with Tailwind CSS for easy customization

## Installation

```bash
npm install react-wysiwyg-editor-pro
```

## Basic Usage

```tsx
import React, { useState } from 'react';
import { WysiwygEditor, EditorContent } from 'react-wysiwyg-editor-pro';

function App() {
  const [content, setContent] = useState<EditorContent>({ html: '', text: '' });

  const handleContentChange = (newContent: EditorContent) => {
    setContent(newContent);
    console.log('HTML:', newContent.html);
    console.log('Text:', newContent.text);
  };

  return (
    <div>
      <WysiwygEditor
        initialContent="<p>Welcome to the editor!</p>"
        placeholder="Start typing..."
        onChange={handleContentChange}
      />
    </div>
  );
}
```

## Advanced Usage

### Custom Toolbar Configuration

```tsx
<WysiwygEditor
  toolbarConfig={{
    showHistory: true,
    showFormatting: true,
    showAlignment: true,
    showLists: true,
    showHeaders: true,
    showColors: true,
    showInsert: true,
    showUtility: false, // Hide utility buttons
  }}
  onChange={handleContentChange}
/>
```

### Styling and Layout

```tsx
<WysiwygEditor
  className="my-custom-editor"
  editorClassName="custom-content-area"
  minHeight="300px"
  maxHeight="600px"
  showToolbar={true}
  showStatusBar={false}
  onChange={handleContentChange}
/>
```

### Disabled State

```tsx 
<WysiwygEditor
  disabled={true}
  initialContent="<p>This editor is read-only</p>"
/>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialContent` | `string` | `''` | Initial HTML content of the editor |
| `placeholder` | `string` | `'Start typing your content here...'` | Placeholder text when editor is empty |
| `onChange` | `(content: EditorContent) => void` | `undefined` | Callback fired when content changes |
| `className` | `string` | `''` | Custom CSS classes for the editor container |
| `editorClassName` | `string` | `''` | Custom CSS classes for the editor content area |
| `showToolbar` | `boolean` | `true` | Whether to show the toolbar |
| `showStatusBar` | `boolean` | `true` | Whether to show the status bar |
| `toolbarConfig` | `ToolbarConfig` | `{}` | Custom toolbar configuration |
| `minHeight` | `string` | `'24rem'` | Minimum height of the editor |
| `maxHeight` | `string` | `undefined` | Maximum height of the editor |
| `disabled` | `boolean` | `false` | Whether the editor is disabled |

## Types

### EditorContent

```tsx
interface EditorContent {
  html: string;  // HTML content
  text: string;  // Plain text content
}
```

### ToolbarConfig

```tsx
interface ToolbarConfig {
  showHistory?: boolean;     // Undo/Redo buttons
  showFormatting?: boolean;  // Bold, italic, underline, etc.
  showAlignment?: boolean;   // Text alignment buttons
  showLists?: boolean;       // List and indentation buttons
  showHeaders?: boolean;     // Heading format dropdown
  showColors?: boolean;      // Color picker buttons
  showInsert?: boolean;      // Link, image, emoji buttons
  showUtility?: boolean;     // Clear format, import/export
}
```

## Keyboard Shortcuts

- `Ctrl+Z` / `Cmd+Z`: Undo
- `Ctrl+Y` / `Cmd+Y`: Redo
- `Ctrl+B` / `Cmd+B`: Bold
- `Ctrl+I` / `Cmd+I`: Italic
- `Ctrl+U` / `Cmd+U`: Underline

## Styling

The editor uses Tailwind CSS classes. You can customize the appearance by:

1. **Overriding CSS classes**: Use the `className` and `editorClassName` props
2. **Custom CSS**: Target the editor elements with your own CSS
3. **Tailwind customization**: Extend your Tailwind config

### Example Custom Styling

```css
.my-custom-editor {
  border: 2px solid #3b82f6;
  border-radius: 12px;
}

.my-custom-editor .custom-content-area {
  font-family: 'Georgia', serif;
  line-height: 1.8;
}
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### 1.0.2
- Initial release
- Full WYSIWYG editing capabilities
- Emoji picker with categories
- Color picker with presets
- Link and image insertion
- Import/export functionality
- Customizable toolbar
- TypeScript support