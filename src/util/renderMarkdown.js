import Markdown from 'markdown-it';
import hljs from 'highlight.js';

const md = Markdown({
  breaks: true,
  linkify: true,
  typographer: true,
  highlight(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(lang, str).value;
    }
    return '';
  },
});

onmessage = ({ data }) => {
  const { useFor } = data;
  switch (useFor) {
    case 'render': {
      postMessage(md.render(data.markdown || ''));
      break;
    }
    default:
      break;
  }
};
