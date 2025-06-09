import React, { useRef, useState, useEffect, useCallback } from 'react';
import { Toolbar } from './Toolbar';
import { EmojiPicker } from './EmojiPicker';
import { ColorPicker } from './ColorPicker';
import { LinkDialog } from './LinkDialog';
import { ImageDialog } from './ImageDialog';

export interface EditorState {
  showEmojiPicker: boolean;
  showColorPicker: boolean;
  showBackgroundPicker: boolean;
  showLinkDialog: boolean;
  showImageDialog: boolean;
  colorPickerType: 'text' | 'background';
}

export const Editor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<EditorState>({
    showEmojiPicker: false,
    showColorPicker: false,
    showBackgroundPicker: false,
    showLinkDialog: false,
    showImageDialog: false,
    colorPickerType: 'text'
  });
  const [history, setHistory] = useState<string[]>(['']);
  const [historyIndex, setHistoryIndex] = useState(0);

  const executeCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    saveToHistory();
  }, []);

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
  }, [history, historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      if (editorRef.current) {
        editorRef.current.innerHTML = history[newIndex];
      }
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      if (editorRef.current) {
        editorRef.current.innerHTML = history[newIndex];
      }
    }
  }, [history, historyIndex]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'z' && !e.shiftKey) {
      e.preventDefault();
      undo();
    } else if ((e.ctrlKey || e.metaKey) && (e.key === 'y' || (e.key === 'z' && e.shiftKey))) {
      e.preventDefault();
      redo();
    }
  }, [undo, redo]);

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

  return (
    <div className="w-full max-w-6xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">WYSIWYG Editor</h1>
        <p className="text-gray-600">Create and edit rich text content with advanced formatting options</p>
      </div>

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
      />

      <div className="relative">
        <div
          ref={editorRef}
          contentEditable
          className="min-h-96 p-6 text-gray-800 leading-relaxed focus:outline-none"
          style={{ fontSize: '16px', lineHeight: '1.6' }}
          onInput={saveToHistory}
          placeholder="Start typing your content here..."
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

      <div className="bg-gray-50 px-6 py-3 border-t border-gray-200 text-sm text-gray-500">
        Use Ctrl+Z to undo, Ctrl+Y to redo • Click and drag to select text • Double-click to select words
      </div>
    </div>
  );
};