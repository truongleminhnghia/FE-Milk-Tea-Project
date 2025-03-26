import React, { useEffect, useRef } from 'react';
import grapesjs from 'grapesjs';
import 'grapesjs/dist/css/grapes.min.css';
import gjsPresetWebpage from 'grapesjs-preset-webpage';
import gjsBlocksBasic from 'grapesjs-blocks-basic';

const GrapesEditor = ({ value, onChange }) => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      const editor = grapesjs.init({
        container: '#gjs',
        height: '100%',
        width: 'auto',
        storageManager: false,
        plugins: [gjsPresetWebpage, gjsBlocksBasic],
        pluginsOpts: {
          gjsPresetWebpage: {},
          gjsBlocksBasic: {}
        },
        blockManager: {
          appendTo: '#blocks',
          blocks: [
            {
              id: 'section',
              label: 'Section',
              category: 'Basic',
              content: `
                <section class="section">
                  <h2>Section Title</h2>
                  <p>Add your content here</p>
                </section>
              `,
            },
            {
              id: 'text',
              label: 'Text',
              category: 'Basic',
              content: '<div data-gjs-type="text">Insert your text here</div>',
            },
            {
              id: 'image',
              label: 'Image',
              category: 'Basic',
              content: { type: 'image' },
              activate: true,
            }
          ]
        },
        canvas: {
          styles: [
            'https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css'
          ]
        }
      });

      // Set initial content if provided
      if (value) {
        try {
          const parsedValue = typeof value === 'string' ? JSON.parse(value) : value;
          if (parsedValue?.html) {
            editor.setComponents(parsedValue.html);
          }
          if (parsedValue?.css) {
            editor.setStyle(parsedValue.css);
          }
        } catch (e) {
          console.warn('Failed to parse initial value:', e);
        }
      }

      // Trigger initial content update
      const initialContent = {
        html: editor.getHtml(),
        css: editor.getCss()
      };
      onChange?.(JSON.stringify(initialContent));

      const updateContent = () => {
        const html = editor.getHtml();
        const css = editor.getCss();
        // Only update if there's actual content
        if (html.trim()) {
          const contentString = JSON.stringify({ html, css });
          onChange?.(contentString);
        }
      };

      // Add debounce to prevent too frequent updates
      let updateTimeout;
      const debouncedUpdate = () => {
        clearTimeout(updateTimeout);
        updateTimeout = setTimeout(updateContent, 300);
      };

      editor.on('component:update', debouncedUpdate);
      editor.on('component:add', debouncedUpdate);
      editor.on('component:remove', debouncedUpdate);

      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
  }, []);

  return (
    <div className="grapesjs-editor">
      <style>
        {`
          .grapesjs-editor {
            display: flex;
            gap: 10px;
            height: 500px;
            position: relative;
            overflow: hidden;
          }

          #gjs {
            flex: 1;
            border: 1px solid #ddd;
            min-width: 0;
            overflow: hidden;
          }

          #blocks {
            width: 200px;
            padding: 10px;
            background: #f8f9fa;
            overflow-y: auto;
            border: 1px solid #ddd;
          }

          .gjs-block {
            width: 100%;
            min-height: 60px;
            margin-bottom: 10px;
            cursor: pointer;
            background: white;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
          }

          /* Custom scrollbar for blocks panel */
          #blocks::-webkit-scrollbar {
            width: 6px;
          }

          #blocks::-webkit-scrollbar-track {
            background: #f1f1f1;
          }

          #blocks::-webkit-scrollbar-thumb {
            background: #c1c1c1;
            border-radius: 3px;
          }

          #blocks::-webkit-scrollbar-thumb:hover {
            background: #a8a8a8;
          }

          .gjs-cv-canvas {
            width: 100%;
            height: 100%;
          }
        `}
      </style>
      <div id="blocks"></div>
      <div id="gjs">
        <div className="content">
          <h2>Nội dung công thức</h2>
          <p>Bắt đầu thêm nội dung tại đây...</p>
        </div>
      </div>
    </div>
  );
};

export default GrapesEditor; 