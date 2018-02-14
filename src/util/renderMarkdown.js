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


const renderPost = (post) => {
  const origin = post.body;
  post.body = md.render(origin);
  post.origin = origin;
};
onmessage = ({ data }) => {
  const { category, payload } = data;
  if (Array.isArray(payload)) {
    payload.forEach(renderPost);
  } else {
    renderPost(payload);
  }
  postMessage({ category, payload, postId: payload.id });
};
