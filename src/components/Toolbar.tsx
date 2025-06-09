import React from 'react';
import {
  Bold, Italic, Underline, Strikethrough, AlignLeft, AlignCenter, AlignRight, AlignJustify,
  List, ListOrdered, Indent, Outdent, Palette, Link, Image, Smile, Undo, Redo,
  Type, Download, Upload, Minus
} from 'lucide-react';
import { EditorState } from './WysiwygEditor';

interface ToolbarConfig {
  showHistory?: boolean;
  showFormatting?: boolean;
  showAlignment?: boolean;
  showLists?: boolean;
  showHeaders?: boolean;
  showColors?: boolean;
  showInsert?: boolean;
  showUtility?: boolean;
}

interface ToolbarProps {
  executeCommand: (command: string, value?: string) => void;
  state: EditorState;
  setState: React.Dispatch<React.SetStateAction<EditorState>>;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
  exportContent: () => void;
  importContent: (event: React.ChangeEvent<HTMLInputElement>) => void;
  config?: ToolbarConfig;
  disabled?: boolean;
}

export const Toolbar: React.FC<ToolbarProps> = ({
  executeCommand,
  state,
  setState,
  undo,
  redo,
  canUndo,
  canRedo,
  exportContent,
  importContent,
  config = {},
  disabled = false
}) => {
  const {
    showHistory = true,
    showFormatting = true,
    showAlignment = true,
    showLists = true,
    showHeaders = true,
    showColors = true,
    showInsert = true,
    showUtility = true
  } = config;

  const buttonClass = `p-2 rounded-md hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`;

  return (
    <div className="bg-white border-b border-gray-200 p-4">
      <div className="flex flex-wrap gap-2">
        {/* History Controls */}
        {showHistory && (
          <div className="flex items-center gap-1 border-r border-gray-300 pr-3 mr-3">
            <button
              onClick={undo}
              disabled={!canUndo || disabled}
              className={`${buttonClass} ${(!canUndo || disabled) ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="Undo (Ctrl+Z)"
            >
              <Undo size={18} />
            </button>
            <button
              onClick={redo}
              disabled={!canRedo || disabled}
              className={`${buttonClass} ${(!canRedo || disabled) ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="Redo (Ctrl+Y)"
            >
              <Redo size={18} />
            </button>
          </div>
        )}

        {/* Font Family */}
        {showFormatting && (
          <>
            <select
              onChange={(e) => executeCommand('fontName', e.target.value)}
              disabled={disabled}
              className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''
              }`}
            >
              <option value="Arial">Arial</option>
              <option value="Georgia">Georgia</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Courier New">Courier New</option>
              <option value="Verdana">Verdana</option>
              <option value="Helvetica">Helvetica</option>
            </select>

            {/* Font Size */}
            <select
              onChange={(e) => executeCommand('fontSize', e.target.value)}
              disabled={disabled}
              className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''
              }`}
            >
              <option value="1">8pt</option>
              <option value="2">10pt</option>
              <option value="3">12pt</option>
              <option value="4">14pt</option>
              <option value="5">18pt</option>
              <option value="6">24pt</option>
              <option value="7">36pt</option>
            </select>
          </>
        )}

        {/* Formatting */}
        {showFormatting && (
          <div className="flex items-center gap-1 border-r border-gray-300 pr-3 mr-3">
            <button 
              onClick={() => executeCommand('bold')} 
              disabled={disabled}
              className={buttonClass} 
              title="Bold (Ctrl+B)"
            >
              <Bold size={18} />
            </button>
            <button 
              onClick={() => executeCommand('italic')} 
              disabled={disabled}
              className={buttonClass} 
              title="Italic (Ctrl+I)"
            >
              <Italic size={18} />
            </button>
            <button 
              onClick={() => executeCommand('underline')} 
              disabled={disabled}
              className={buttonClass} 
              title="Underline (Ctrl+U)"
            >
              <Underline size={18} />
            </button>
            <button 
              onClick={() => executeCommand('strikeThrough')} 
              disabled={disabled}
              className={buttonClass} 
              title="Strikethrough"
            >
              <Strikethrough size={18} />
            </button>
          </div>
        )}

        {/* Alignment */}
        {showAlignment && (
          <div className="flex items-center gap-1 border-r border-gray-300 pr-3 mr-3">
            <button 
              onClick={() => executeCommand('justifyLeft')} 
              disabled={disabled}
              className={buttonClass} 
              title="Align Left"
            >
              <AlignLeft size={18} />
            </button>
            <button 
              onClick={() => executeCommand('justifyCenter')} 
              disabled={disabled}
              className={buttonClass} 
              title="Align Center"
            >
              <AlignCenter size={18} />
            </button>
            <button 
              onClick={() => executeCommand('justifyRight')} 
              disabled={disabled}
              className={buttonClass} 
              title="Align Right"
            >
              <AlignRight size={18} />
            </button>
            <button 
              onClick={() => executeCommand('justifyFull')} 
              disabled={disabled}
              className={buttonClass} 
              title="Justify"
            >
              <AlignJustify size={18} />
            </button>
          </div>
        )}

        {/* Lists */}
        {showLists && (
          <div className="flex items-center gap-1 border-r border-gray-300 pr-3 mr-3">
            <button 
              onClick={() => executeCommand('insertUnorderedList')} 
              disabled={disabled}
              className={buttonClass} 
              title="Bulleted List"
            >
              <List size={18} />
            </button>
            <button 
              onClick={() => executeCommand('insertOrderedList')} 
              disabled={disabled}
              className={buttonClass} 
              title="Numbered List"
            >
              <ListOrdered size={18} />
            </button>
            <button 
              onClick={() => executeCommand('indent')} 
              disabled={disabled}
              className={buttonClass} 
              title="Increase Indent"
            >
              <Indent size={18} />
            </button>
            <button 
              onClick={() => executeCommand('outdent')} 
              disabled={disabled}
              className={buttonClass} 
              title="Decrease Indent"
            >
              <Outdent size={18} />
            </button>
          </div>
        )}

        {/* Headers */}
        {showHeaders && (
          <select
            onChange={(e) => e.target.value && executeCommand('formatBlock', e.target.value)}
            disabled={disabled}
            className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              disabled ? 'opacity-50 cursor-not-allowed bg-gray-100' : ''
            }`}
          >
            <option value="">Format</option>
            <option value="h1">Heading 1</option>
            <option value="h2">Heading 2</option>
            <option value="h3">Heading 3</option>
            <option value="h4">Heading 4</option>
            <option value="h5">Heading 5</option>
            <option value="h6">Heading 6</option>
            <option value="p">Paragraph</option>
          </select>
        )}

        {/* Colors */}
        {showColors && (
          <div className="flex items-center gap-1 border-r border-gray-300 pr-3 mr-3">
            <button
              onClick={() => !disabled && setState(prev => ({ ...prev, showColorPicker: !prev.showColorPicker, colorPickerType: 'text' }))}
              disabled={disabled}
              className={buttonClass}
              title="Text Color"
            >
              <Type size={18} />
            </button>
            <button
              onClick={() => !disabled && setState(prev => ({ ...prev, showColorPicker: !prev.showColorPicker, colorPickerType: 'background' }))}
              disabled={disabled}
              className={buttonClass}
              title="Background Color"
            >
              <Palette size={18} />
            </button>
          </div>
        )}

        {/* Insert */}
        {showInsert && (
          <div className="flex items-center gap-1 border-r border-gray-300 pr-3 mr-3">
            <button
              onClick={() => !disabled && setState(prev => ({ ...prev, showLinkDialog: !prev.showLinkDialog }))}
              disabled={disabled}
              className={buttonClass}
              title="Insert Link"
            >
              <Link size={18} />
            </button>
            <button
              onClick={() => !disabled && setState(prev => ({ ...prev, showImageDialog: !prev.showImageDialog }))}
              disabled={disabled}
              className={buttonClass}
              title="Insert Image"
            >
              <Image size={18} />
            </button>
            <button
              onClick={() => !disabled && setState(prev => ({ ...prev, showEmojiPicker: !prev.showEmojiPicker }))}
              disabled={disabled}
              className={buttonClass}
              title="Insert Emoji"
            >
              <Smile size={18} />
            </button>
          </div>
        )}

        {/* Utility */}
        {showUtility && (
          <div className="flex items-center gap-1">
            <button 
              onClick={() => executeCommand('removeFormat')} 
              disabled={disabled}
              className={buttonClass} 
              title="Clear Format"
            >
              <Minus size={18} />
            </button>
            <button 
              onClick={exportContent} 
              disabled={disabled}
              className={buttonClass} 
              title="Export Content"
            >
              <Download size={18} />
            </button>
            <label className={`${buttonClass} ${disabled ? 'pointer-events-none' : ''}`} title="Import Content">
              <Upload size={18} />
              <input
                type="file"
                accept=".html,.txt"
                onChange={importContent}
                disabled={disabled}
                className="hidden"
              />
            </label>
          </div>
        )}
      </div>
    </div>
  );
};