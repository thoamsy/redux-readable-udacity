import React from 'react';
import ContentLoader from 'react-content-loader';
const Instgram = () => <ContentLoader type="instgram" />;

function generateAsyncComponent(loader, Placeholder = Instgram) {
  let Component = null;
  return class AsyncComponent extends React.Component {
    state = {
      Component,
    };

    componentWillMount() {
      console.log('You will show me how many times you can be invoked.');
      AsyncComponent.load().then(this.updateState);
    }

    static load() {
      return loader().then(ResolvedComponent => {
        Component = ResolvedComponent.default || ResolvedComponent;
      });
    }

    updateState = () => {
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
        return <Placeholder {...this.props} />;
      }
      return null;
    }
  };
}
export default generateAsyncComponent;
