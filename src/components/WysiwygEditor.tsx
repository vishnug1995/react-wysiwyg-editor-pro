import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Toolbar } from './Toolbar';
import { EmojiPicker } from './EmojiPicker';
import { ColorPicker } from './ColorPicker';
import { LinkDialog } from './LinkDialog';
import { ImageDialog } from './ImageDialog';

export interface EditorContent {
  html: string;
  text: string;
}

export interface WysiwygEditorProps {
  /** Initial content of the editor */
  initialContent?: string;
  /** Placeholder text when editor is empty */
  placeholder?: string;
  /** Callback fired when content changes */
  onChange?: (content: EditorContent) => void;
  /** Custom CSS classes for the editor container */
  className?: string;
  /** Custom CSS classes for the editor content area */
  editorClassName?: string;
  /** Whether to show the toolbar */
  showToolbar?: boolean;
  /** Whether to show the status bar */
  showStatusBar?: boolean;
  /** Custom toolbar configuration */
  toolbarConfig?: {
    showHistory?: boolean;
    showFormatting?: boolean;
    showAlignment?: boolean;
    showLists?: boolean;
    showHeaders?: boolean;
    showColors?: boolean;
    showInsert?: boolean;
    showUtility?: boolean;
  };
  /** Minimum height of the editor */
  minHeight?: string;
  /** Maximum height of the editor */
  maxHeight?: string;
  /** Whether the editor is disabled */
  disabled?: boolean;
}

export interface EditorState {
  showEmojiPicker: boolean;
  showColorPicker: boolean;
  showBackgroundPicker: boolean;
  showLinkDialog: boolean;
  showImageDialog: boolean;
  colorPickerType: 'text' | 'background';
}

export const WysiwygEditor: React.FC<WysiwygEditorProps> = ({
  initialContent = '',
  placeholder = 'Start typing your content here...',
  onChange,
  className = '',
  editorClassName = '',
  showToolbar = true,
  showStatusBar = true,
  toolbarConfig = {},
  minHeight = '24rem',
  maxHeight,
  disabled = false,
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<EditorState>({
    showEmojiPicker: false,
    showColorPicker: false,
    showBackgroundPicker: false,
    showLinkDialog: false,
    showImageDialog: false,
    colorPickerType: 'text'
  });
  const [history, setHistory] = useState<string[]>([initialContent]);
  const [historyIndex, setHistoryIndex] = useState(0);

  // Set initial content
  useEffect(() => {
    if (editorRef.current && initialContent) {
      editorRef.current.innerHTML = initialContent;
    }
  }, [initialContent]);

  const executeCommand = useCallback((command: string, value?: string) => {
    if (disabled) return;
    
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    saveToHistory();
  }, [disabled]);

  const saveToHistory = useCallback(() => {
    if (!editorRef.current) return;
    
    const content = editorRef.current.innerHTML;
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(content);
    
    if (newHistory.length > 50) {
      newHistory.shift();
    } else {
      setHistoryIndex(prev => prev + 1);
    }
    
    setHistory(newHistory);

    // Call onChange callback
    if (onChange) {
      onChange({
        html: content,
        text: editorRef.current.textContent || ''
      });
    }
  }, [history, historyIndex, onChange]);

  const undo = useCallback(() => {
    if (disabled || historyIndex <= 0) return;
    
    const newIndex = historyIndex - 1;
    setHistoryIndex(newIndex);
    if (editorRef.current) {
      editorRef.current.innerHTML = history[newIndex];
      if (onChange) {
        onChange({
          html: history[newIndex],
          text: editorRef.current.textContent || ''
        });
      }
    }
  }, [history, historyIndex, onChange, disabled]);

  const redo = useCallback(() => {
    if (disabled || historyIndex >= history.length - 1) return;
    
    const newIndex = historyIndex + 1;
    setHistoryIndex(newIndex);
    if (editorRef.current) {
      editorRef.current.innerHTML = history[newIndex];
      if (onChange) {
        onChange({
          html: history[newIndex],
          text: editorRef.current.textContent || ''
        });
      }
    }
  }, [history, historyIndex, onChange, disabled]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (disabled) return;
    
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      undo();
    } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
      e.preventDefault();
      redo();
    }
  }, [undo, redo, disabled]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const handleEmojiSelect = (emoji: string) => {
    executeCommand('insertText', emoji);
    setState(prev => ({ ...prev, showEmojiPicker: false }));
  };

  const handleColorSelect = (color: string) => {
    if (state.colorPickerType === 'text') {
      executeCommand('foreColor', color);
    } else {
      executeCommand('backColor', color);
    }
    setState(prev => ({ ...prev, showColorPicker: false }));
  };

  const handleLinkInsert = (url: string, text: string) => {
    if (text) {
      executeCommand('insertHTML', `<a href="${url}" target="_blank">${text}</a>`);
    } else {
      executeCommand('createLink', url);
    }
    setState(prev => ({ ...prev, showLinkDialog: false }));
  };

  const handleImageInsert = (url: string, alt: string) => {
    executeCommand('insertHTML', `<img src="${url}" alt="${alt}" style="max-width: 100%; height: auto;" />`);
    setState(prev => ({ ...prev, showImageDialog: false }));
  };

  const exportContent = () => {
    const content = editorRef.current?.innerHTML || '';
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const importContent = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        if (editorRef.current) {
          editorRef.current.innerHTML = content;
          saveToHistory();
        }
      };
      reader.readAsText(file);
    }
  };

  const editorStyle = {
    minHeight,
    ...(maxHeight && { maxHeight, overflowY: 'auto' as const })
  };

  return (
    <div className={`w-full bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {showToolbar && (
        <Toolbar
          executeCommand={executeCommand}
          state={state}
          setState={setState}
          undo={undo}
          redo={redo}
          canUndo={historyIndex > 0}
          canRedo={historyIndex < history.length - 1}
          exportContent={exportContent}
          importContent={importContent}
          config={toolbarConfig}
          disabled={disabled}
        />
      )}

      <div className="relative">
        <div
          ref={editorRef}
          contentEditable={!disabled}
          className={`p-6 text-gray-800 leading-relaxed focus:outline-none ${
            disabled ? 'bg-gray-50 cursor-not-allowed' : ''
          } ${editorClassName}`}
          style={{ fontSize: '16px', lineHeight: '1.6', ...editorStyle }}
          onInput={saveToHistory}
          data-placeholder={placeholder}
          suppressContentEditableWarning={true}
        />

        {state.showEmojiPicker && (
          <EmojiPicker
            onSelect={handleEmojiSelect}
            onClose={() => setState(prev => ({ ...prev, showEmojiPicker: false }))}
          />
        )}

        {state.showColorPicker && (
          <ColorPicker
            onSelect={handleColorSelect}
            onClose={() => setState(prev => ({ ...prev, showColorPicker: false }))}
            type={state.colorPickerType}
          />
        )}

        {state.showLinkDialog && (
          <LinkDialog
            onInsert={handleLinkInsert}
            onClose={() => setState(prev => ({ ...prev, showLinkDialog: false }))}
          />
        )}

        {state.showImageDialog && (
          <ImageDialog
            onInsert={handleImageInsert}
            onClose={() => setState(prev => ({ ...prev, showImageDialog: false }))}
          />
        )}
      </div>

      {showStatusBar && (
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-sm text-gray-500">
          Use Ctrl+Z to undo, Ctrl+Y to redo • Click and drag to select text • Double-click to select words
        </div>
      )}
    </div>
  );
};