// import React from 'react'

// function HomePage() {
//     return(
//         <h1 className="toplookout">Home</h1>
//     )
// }


// export default HomePage

import React from 'react';
import ItemsCarousel from 'react-items-carousel';
import range from 'lodash/range';

export default class HomePage extends React.Component {

    constructor() {
        super()
        this.state = {
            activeItemIndex: 0,
            children: []
        }
    }

  componentDidMount() {
    this.setState({
      children: this.createChildren(20),
      activeItemIndex: 0,
    });
  }

  createChildren = n => range(n).map(i => <div key={i} style={{ height: 200, background: '#333' }}><h6 style={{color: '#ffffff'}}>{i}</h6></div>);

  changeActiveItem = (activeItemIndex) => this.setState({ activeItemIndex });

  render() {
    const {
      activeItemIndex,
      children,
    } = this.state;

    return (
        <div className="toplookout">
      <ItemsCarousel
        // Placeholder configurations
        enablePlaceholder
        numberOfPlaceholderItems={5}

        // Carousel configurations
        numberOfCards={2}
        gutter={12}
        showSlither={true}
        firstAndLastGutter={true}
        freeScrolling={true}

        // Active item configurations
        requestToChangeActive={this.changeActiveItem}
        activeItemIndex={activeItemIndex}
        activePosition={'center'}

        chevronWidth={24}
        rightChevron={'>'}
        leftChevron={'<'}
        outsideChevron={false}
      >
        {children}
      </ItemsCarousel></div>
    );  
  }
} 
