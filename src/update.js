import { eventWrapper } from "@testing-library/user-event/dist/utils";
import React from "react";

export default class PutForm extends React.Component {
  //state format
  constructor(props) {
    super(props);
    this.state = {
      title: props.selectedItem ? props.selectedItem.title : "",
      userId: "",
      isCompleted: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCheckbox = this.handleCheckbox.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //title box handler
  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  //submit handler for updation of a existing task
  handleSubmit(event) {
    event.preventDefault();

    const { title, isCompleted } = this.state;
    const clickedId = localStorage.getItem("clicked");

    //data format
    const updatedItem = {
      ...this.props.selectedItem,
      title: title,
      completed: isCompleted,
    };

    //updating a task with put api call
    fetch(
      `https://jsonplaceholder.typicode.com/todos/${this.props.selectedItem.id}`,
      {
        method: "PUT",

        body: JSON.stringify(updatedItem),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log("updated data", json);
        alert("New task has been updated--> " + this.state.title);
        const updatedItem = this.props.items.map((item) => {
          if (item.id == parseInt(clickedId)) {
            return json;
          }
          return item;
        });
        this.props.onUpdateItems(updatedItem);
      });
  }

  //checkbox handler
  handleCheckbox(event) {
    this.setState({ isCompleted: event.target.checked });
  }

  render() {
    const { items } = this.props;
    return (
      <div>
        <h3>Update task here</h3>
        <form onSubmit={this.handleSubmit}>
          {/* title */}
          <input
            id="titleBox"
            type="text"
            placeholder={this.state.title}
            value={this.state.title}
            onChange={this.handleChange}
          />
          {/* checkbox */}
          <div id="checkboxContainer">
            <input
              id="checkbox"
              type="checkbox"
              checked={this.state.isCompleted}
              onChange={this.handleCheckbox}
            />
            Is task done ?
          </div>
          {/* submit */}
          <input type="submit" id="Btn" value="Update" />
        </form>
      </div>
    );
  }
}
