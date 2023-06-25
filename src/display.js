import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PostForm from "./post";
import PutForm from "./update";
export default class Display extends React.Component {
  // here I built a state with relevent feature for todo list.
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: [],
      selectedItem: null,
    };
  }

  //fetching data from server and storing in item array
  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then(
        (data) => {
          this.setState({
            isLoaded: true,
            items: data,
          });
        },

        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  handleUpdateItems = (updatedItems) => {
    this.setState({
      items: updatedItems,
    });
  };

  //deleting a task in server with delete api call
  handleDeleteClick = (id) => {
    console.log(id);
    fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((json) => console.log("deleted data", json));
    //after delete , rerendering the data in our state
    this.setState((prevState) => ({
      items: prevState.items.filter((item) => item.id !== id),
    }));
  };

  //for getting the list id on hoover through list item
  handleClick = (id, userId, title) => {
    console.log("clicked item id " + id);
    const selectedItem = this.state.items.find((item) => item.id === id);
    this.setState({ selectedItem });
    //saved that id in local storage for
    localStorage.setItem("clicked", id);
    localStorage.setItem("title", selectedItem.title);
    localStorage.setItem("userId", userId);
  };

  render() {
    const { error, isLoaded, items, selectedItem } = this.state;
    //saving all list item in local storage
    items.map((item) => {
      localStorage.setItem(item.id, JSON.stringify(item));
    });
    if (error) {
      return <h1>Error: {error.message}</h1>;
    } else if (!isLoaded) {
      return <h1> Loading ...</h1>;
    } else {
      return (
        <>
          {/* listing out the data from url  */}
          <ul>
            {items.map((item) => (
              <li
                id="todo"
                key={item.id}
                onClick={() =>
                  this.handleClick(item.id, item.userId, item.title)
                }
              >
                <h3>{item.title}</h3>
                <p>
                  Task completed: <b>{item.completed ? "Yes" : "No"}</b>
                </p>
                <FontAwesomeIcon
                  id="deleteIcon"
                  icon={faTrash}
                  value={item.id}
                  onClick={() => this.handleDeleteClick(item.id)}
                />
              </li>
            ))}
          </ul>

          <div className="forms">
            <div className="postBox">
              <PostForm items={items} onUpdateItems={this.handleUpdateItems} />
            </div>
            <div className="updateBox">
              {selectedItem && (
                <PutForm
                  items={items}
                  onUpdateItems={this.handleUpdateItems}
                  selectedItem={selectedItem}
                />
              )}
            </div>
          </div>
        </>
      );
    }
  }
}
