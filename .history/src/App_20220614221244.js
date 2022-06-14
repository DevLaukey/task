import React, { Component , useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import data from "./data";
import Footer from "./Components/footer/Footer";
import Header from "./Components/header/Header";
import Content from "./Components/content/Content";
import Bookmark from "./Components/content/Bookmark";
import NewStory from "./Components/posts/NewStory";
import SinglePost from "./Components/posts/SinglePost";
import Login from "./Components/login/Login";
import { create_context  as CreateContext } from "./context/index";



export default class App extends Component {
  constructor(props) {
    super(props);
    //  const token = {
    //    logged: false,
    //  };
    // localStorage.setItem("token", JSON.stringify('token',token));
    this.state = {
      posts: data,
      token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : undefined,
      auth:false,
    };

    this.handleBookmark = this.handleBookmark.bind(this);
    this.handleRemoveBookmark = this.handleRemoveBookmark.bind(this);
    this.handleSubmission = this.handleSubmission.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
  }

  handleBookmark(data) {
    let posts = this.state.posts;
    posts = posts.map((post) =>
      post === data
        ? {
            id: post.id,
            title: post.title,
            body: post.body,
            path: post.path,
            isVideo: post.isVideo,
            bookmark: true,
          }
        : post
    );
    this.setState({ posts });
  }


  handleRemoveBookmark(data) {
    let posts = this.state.posts;
    posts = posts.map((post) =>
      post === data
        ? { id: post.id, title: post.title, body: post.body, bookmark: false }
        : post
    );
    this.setState({ posts });
  }

  handleSubmission(data) {
    let posts = this.state.posts;
    posts = [data, ...posts];
    this.setState({ posts });
  }

  handleRemove(post, history) {
    let posts = this.state.posts;
    posts = posts.filter((onepost) => onepost !== post);
    this.setState({ posts });
    history.push("/");
    this.handleWindow();
  }

  handleWindow() {
    window.scrollTo(0, 0);
  }


  toggleState(type) {


    

    if(type === "login"){
      this.setState({ auth: true });
      // console.log(type)
    } else if (type === "signout") {
      this.setstate({ auth: false });
    }
  }


  componentDidMount() {
    console.log("sTsjhdjshdj")
    const getState = async () => {
      console.log("sTsjhdjshdj sdsd")
      const token = localStorage.getItem('auth');
      if (!token) {
        console.log("data ")
        this.setState({ auth: false });
        return;
      }

      await fetch(`http://127.0.0.1:5400/auth/checkMe`, { 
        method: 'GET',
        headers: new Headers({ 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }),
        body:undefined,
      })
        .then(data => data.json()) 
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.log(error);
      })
    }
    getState();
  }

  render() {

    console.log("object");
    if (!this.state.auth) return <Login toggleState={this.toggleState} />;


    // if (this.state.token.logged === false) return <Login  />;

    return (
      <CreateContext.Provider
        value={{
          loginFunc: (token) => {
            this.setState({ auth: true });
            localStorage.setItem("auth", (token));
          },
          logoutFunc: () => { this.setState({ auth: false }); localStorage.removeItem("auth"); },
        }}
      >
        <Router>
          <div className="App">
            <Route path="*" render={(props) => <Header {...props} />} />
            <Route
              exact
              path="/"
              render={() => (
                <Content
                  posts={this.state.posts}
                  bookmarks={this.state.posts.filter((post) => post.bookmark)}
                  handleBookmark={this.handleBookmark}
                  handleRemoveBookmark={this.handleRemoveBookmark}
                />
              )}
            />
            <Route
              exact
              path="/new"
              render={() => (
                <NewStory handleSubmission={this.handleSubmission} />
              )}
            />
            <Route
              exact
              path="/bookmark"
              render={() => (
                <Bookmark
                  bookmarks={this.state.posts.filter((post) => post.bookmark)}
                />
              )}
            />
            <Route
              exact
              path="/post/:id"
              render={(props) => (
                <SinglePost
                  {...props}
                  posts={this.state.posts}
                  handleBookmark={this.handleBookmark}
                  handleRemoveBookmark={this.handleRemoveBookmark}
                  handleRemove={this.handleRemove}
                  handleWindow={this.handleWindow()}
                />
              )}
            />

            <Footer />
          </div>
        </Router>
      </CreateContext.Provider>
    );
  }
}
