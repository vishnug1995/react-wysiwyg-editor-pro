// Main exports for the npm package
export { WysiwygEditor } from './components/WysiwygEditor';
export type { WysiwygEditorProps, EditorContent } from './components/WysiwygEditor';

// Export individual components if users want to customize
export { Toolbar } from './components/Toolbar';
export { EmojiPicker } from './components/EmojiPicker';
export { ColorPicker } from './components/ColorPicker';
export { LinkDialog } from './components/LinkDialog';
export { ImageDialog } from './components/ImageDialog';

// Export types
export type { EditorState } from './components/Editor';