import React, { useState } from 'react';
import { WysiwygEditor, EditorContent } from './components/WysiwygEditor';

function App() {
  const [content, setContent] = useState<EditorContent>({ html: '', text: '' });

  const handleContentChange = (newContent: EditorContent) => {
    setContent(newContent);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-4">
      <div className="container mx-auto py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">WYSIWYG Editor Demo</h1>
          <p className="text-gray-600">This is a demonstration of the react-wysiwyg-editor-pro package</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Editor</h2>
            <WysiwygEditor
              initialContent="<h2>Welcome to the WYSIWYG Editor!</h2><p>Start typing to see the magic happen. You can format text, add links, images, emojis and much more!</p>"
              placeholder="Start typing your content here..."
              onChange={handleContentChange}
              minHeight="20rem"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Live Preview</h2>
            <div className="bg-white rounded-lg shadow-lg p-6 min-h-80">
              <h3 className="text-lg font-medium mb-2">HTML Output:</h3>
              <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto mb-4 max-h-40">
                {content.html}
              </pre>
              
              <h3 className="text-lg font-medium mb-2">Rendered Content:</h3>
              <div 
                className="border border-gray-200 p-3 rounded min-h-32"
                dangerouslySetInnerHTML={{ __html: content.html }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;