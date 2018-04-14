import React from 'react';
import delay from '../util/delay';
import 'bulma-pageloader/dist/bulma-pageloader.min.css';

const PageLoader = () => (
  <div className="pageloader is-active">
    <span className="title">加载中♪(´ε｀ )</span>
  </div>
);
function generateAsyncComponent(loader, Placeholder = PageLoader) {
  let Component = null;
  return class AsyncComponent extends React.Component {
    state = {
      Component,
    };

    componentDidMount() {
      delay(Math.random() * 1000)
        .then(this.load)
        .then(this.updateState);
    }

    load() {
      return loader().then(ResolvedComponent => {
        // ES Module or Common JS
        Component = ResolvedComponent.default || ResolvedComponent;
      });
    }

    updateState = () => {
      // 重新进入 mount 该组件的时候，因为 Component 已经存在，免除无用的 render。
      if (this.state.Component !== Component) {
        this.setState({
          Component,
        });
      }
    };

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      if (Placeholder) {
        return <Placeholder />;
      }
      return null;
    }
  };
}
export default generateAsyncComponent;
