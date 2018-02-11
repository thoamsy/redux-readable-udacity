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
  const { category, payload } = data;
  const origin = payload.body;
  payload.body = md.render(origin);
  payload.origin = origin;
  postMessage({ category, payload, postId: payload.id });
};
