import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeftAlt } from '@fortawesome/free-solid-svg-icons';
import { faTwitterSquare } from '@fortawesome/free-brands-svg-icons';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      advice: '',
    };
  }

  componentDidMount() {
    this.handleclick();
  }

   handleclick() {
    fetch("https://api.quotable.io/random")
    .then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          items: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        })
      }
    )
   }





  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div id='quote-box'>

          <h1 id='text'><span className='quotesDesign'><FontAwesomeIcon icon={faQuoteLeftAlt} /></span>{items.content}</h1>
          <p id='author'>- {items.author}</p>
          <div id='end'>
            <div>
              <button id='new-quote' onClick={this.handleclick.bind(this)}>New Quote</button>
            </div>
            <div>
              <a id='tweet-quote' href={`https://twitter.com/intent/tweet?text=${items.content} - ${items.author}`} target='_blank' rel='noopener noreferrer'>
                <FontAwesomeIcon icon={faTwitterSquare} />
              </a>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default App;