import React from 'react';

// import MySvg from'./background.svg'
import styles from './styles.module.scss';

class Header  extends React.Component {

  render() {
    return (
      <>
      <br/>
      <div className='section1'>
        <img src={require('./background.svg')}/>
      </div>

      <h1 className={styles.mainHeader}> Satellites <br/>Near You </h1>
        <p className={styles.leadText}>
          When you look up at the sky – night or day, rain or shine, <br/>whether you see them or not – a number of satellites are travelling <br/>across your path. Some of them look back at you and the Earth, <br/>while others look out into the greater universe, hoping to learn something <br/>new about our cosmic neighborhood.  Satellites Near You shows <br/> the satellites that are in the immediate vicinity, along with bit of additional <br/>context about who put them there and why.
            <br/>
              <br/>
                <br/>
                <br/>
                  <br/>
                    <br/>
                      <br/>
                        <br/>
            </p>


                          <div className='section2'>
                            <h2 className={styles.secondHeader}> Visual Glossary </h2>
                            <img src={require('./glossary.svg')}/>
                          </div>
                            <br/>
                            </>);
  }
}

export default Header;
