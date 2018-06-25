import * as React from 'react';
import * as moment from 'moment';
import { Quote } from '../../../redux/quotes/interface';

interface Props {
  user: any;
  quotes: Quote[];
}
export default class TimeWidget extends React.Component<Props, 
{ 
  time: string, 
  componentIsMountend: boolean,
  quote: any
}> {
  constructor() {
    super();
    this.state = {
      time: this.getTime(),
      componentIsMountend: false,
      quote: {}
    };
  }
  componentDidMount() {
    const { time, componentIsMountend } = this.state;
    const { quotes } = this.props;
    this.setState({ 
      componentIsMountend: true,
      quote: quotes[Math.floor(Math.random() * quotes.length)]
    });

    setInterval(() => {
      if (time !== this.getTime() && componentIsMountend) {
        this.setState({
          time: this.getTime()
        });
      }
    }, 1000);
  }

  componentWillUnmount() {
    this.setState({ componentIsMountend: false });
  }

  getTime() {
    return moment().format('HH:mm');
  }

  render() {
    const { user } = this.props;
    const { time, quote } = this.state;
    
    return (
      <section className={`time-widget`}>
        <h1 className="time">{time}</h1>
        <h1 className="welcome">
          {new Date().getHours() >= 6 && new Date().getHours() < 12 && (<small> Good morning, </small>)}
          {new Date().getHours() >= 12 && new Date().getHours() < 17 && (<small> Good afternoon, </small>)}
          {new Date().getHours() >= 17 && new Date().getHours() < 22 && (<small> Good evening, </small>)}
          {new Date().getHours() >= 22 && new Date().getHours() < 24 && (<small> Good night, </small>)}
          {new Date().getHours() >= 1 && new Date().getHours() < 6 && (<small> Good night, </small>)}
          {user.displayName ? user.displayName : user.email}
        </h1>
        <div className="mb-wrap mb-style-3">
          <blockquote cite="http://www.gutenberg.org/ebooks/1260">
            <p>{quote.text}</p>
          </blockquote>
          <div className="mb-attribution">
            <p className="mb-author">{quote.author}</p>
            <div className="mb-thumb"/>
          </div>
        </div>
      </section>
    );
  }
}
