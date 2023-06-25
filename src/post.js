import React from "react";

export default class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      userId: "",
      isCompleted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //handling the change in title input box
  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  //after input the new task updating it in the server with post api call
  handleSubmit(event) {
    event.preventDefault();

    alert("New task has been added--> " + this.state.title);
    //new data format
    var newItem = {
      userId: this.state.userId,
      title: this.state.title,
      completed: this.state.isCompleted,
    };
    //post the data
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",

      body: JSON.stringify(newItem),
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        //updating items array
        json.id = Math.random();
        this.props.onUpdateItems([json, ...this.props.items]);
      });
    this.setState({ title: "", isCompleted: false });
  }

  // checkbox handle button
  handleCheckbox(event) {
    this.setState({ isCompleted: event.target.checked });
  }

  render() {
    return (
      <div>
        <h3>Add task here</h3>
        <form onSubmit={this.handleSubmit}>
          {/* title input for new task */}
          <input
            id="titleBox"
            type="text"
            placeholder="Input the task to do "
            value={this.state.title}
            onChange={this.handleChange}
          />
          <div id="checkboxContainer">
            {/* is completed checkbox */}
            <input
              id="checkbox"
              type="checkbox"
              checked={this.isCompleted}
              onChange={this.handleCheckbox}
            />
            Is task done ?
          </div>
          {/* submit button */}
          <input type="submit" id="Btn" value="Post" />
        </form>
      </div>
    );
  }
}
