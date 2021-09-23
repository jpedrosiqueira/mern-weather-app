import React from "react";
import "../styles/searchbar.css";

class SearchBarClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputField: "",
    };
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.onChange = this.onChange.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.onSubmit(this.state.inputField);
    this.setState({
      inputField: "",
    });
  };

  onChange = (e) => {
    this.setState({ inputField: e.target.value });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={this.onChange}
            type="text"
            value={this.state.inputField}
            className="search-bar-input"
            placeholder="Type in a zip code..."
          />
        </form>
      </div>
    );
  }
}

export default SearchBarClass;
