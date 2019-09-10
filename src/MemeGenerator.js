import React from "react";

class MemeGenerator extends React.Component {
  constructor(props) {
    super();
    this.state = {
      topText: "",
      bottomText: "",
      image: "http://i.imgflip.com/1bij.jpg",
      allMemeImgs: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    fetch("https://api.imgflip.com/get_memes")
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        else {
          return response.json();
        }
      })
      .then(response => {
        const { memes } = response.data;
        this.setState({ allMemeImgs: memes });
      });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleClick(event) {
    event.preventDefault();
    const number = Math.floor(Math.random() * this.state.allMemeImgs.length);
    const index = this.state.allMemeImgs[number].url;
    this.setState({
      image: index
    });
  }
  render() {
    return (
      <div>
        <form className="meme-form" onSubmit={this.handleClick}>
          <input
            type="text"
            name="topText"
            value={this.state.topText}
            placeholder="Top Text"
            onChange={this.handleChange}
          />
          <br />
          <input
            name="bottomText"
            value={this.state.bottomText}
            placeholder="Bottom Text"
            onChange={this.handleChange}
          />
          <br />
          <button>Gen</button>
          <br />
        </form>
        <div className="meme">
          <img src={this.state.image} alt="" />
          <h2 className="top">{this.state.topText}</h2>
          <h2 className="bottom">{this.state.bottomText}</h2>
        </div>
      </div>
    );
  }
}
export default MemeGenerator;
