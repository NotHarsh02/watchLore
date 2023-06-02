import React ,{useEffect}from 'react';
import "./modal.css"

import { BallClipRotate } from 'react-pure-loaders';

export default class AwesomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    document.body.classList.add('white-bg');
  }

  componentWillUnmount() {
    document.body.classList.remove('white-bg');
  }
  render() {
    return (
      <div className='center'>
        <BallClipRotate
          color={'#123abc'}
          loading={this.state.loading}
        />
      </div>
    )
  }
}